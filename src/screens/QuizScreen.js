import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { aminoAcids, structureImageUrl } from '../data/aminoAcids';
import { shuffle } from '../utils/shuffle';
import { formatTime } from '../utils/formatTime';
import { colors } from '../theme';
import BigButton from '../components/BigButton';

const OPTIONS_PER_CARD = 4;

// Builds the list of flashcards for one round.
// Each card has the correct amino acid ("answer") plus 4 name choices
// in random order: the right one and 3 wrong ones.
//
// pool:  the amino acids the player selected in the settings
// count: how many cards to make
function buildCards(pool, count) {
  // The structures shown come only from the selected amino acids...
  const picked = shuffle(pool).slice(0, count);

  // ...but the wrong choices can be any of the 20, so the quiz stays a
  // real test even when only a few amino acids are selected.
  return picked.map((answer) => {
    const wrongChoices = shuffle(aminoAcids.filter((aa) => aa.name !== answer.name))
      .slice(0, OPTIONS_PER_CARD - 1);
    return {
      answer,
      options: shuffle([answer, ...wrongChoices]),
    };
  });
}

export default function QuizScreen({ pool, cardCount, onFinish, onQuit }) {
  // "State" is data that can change while the screen is showing.
  // When state changes, React redraws the screen automatically.
  //
  // useState(() => ...) runs buildCards only once, when the quiz starts.
  const [cards] = useState(() => buildCards(pool, cardCount));
  const [index, setIndex] = useState(0);         // which card we're on
  const [selected, setSelected] = useState(null); // the name the player tapped (null = not answered yet)
  const [score, setScore] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);      // how long the quiz has been running

  // The timer: once the quiz starts, add 1 to "seconds" every 1000 ms (1 second).
  useEffect(() => {
    const timer = setInterval(() => {
      // Passing a function gets the latest value, so we never miss a second.
      setSeconds((s) => s + 1);
    }, 1000);
    // The function we return runs when the screen closes, and stops the timer.
    return () => clearInterval(timer);
  }, []);

  const card = cards[index];
  const answered = selected !== null;
  const isLastCard = index === cards.length - 1;

  function handleChoice(name) {
    if (answered) return; // ignore taps after answering
    setSelected(name);
    if (name === card.answer.name) {
      setScore(score + 1);
    }
  }

  function handleNext() {
    if (isLastCard) {
      onFinish(score, cards.length, seconds);
    } else {
      setIndex(index + 1);
      setSelected(null);
      setImageLoading(true);
    }
  }

  // Decides the colour of each answer button after the player has answered.
  function optionStyle(name) {
    if (!answered) return null;
    if (name === card.answer.name) return styles.optionCorrect;
    if (name === selected) return styles.optionWrong;
    return styles.optionFaded;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top bar: quit button, progress with timer, and score */}
      <View style={styles.header}>
        <Pressable onPress={onQuit} hitSlop={12}>
          <Text style={styles.quit}>✕ Quit</Text>
        </Pressable>
        <View style={styles.headerMiddle}>
          <Text style={styles.progress}>
            Card {index + 1} of {cards.length}
          </Text>
          <Text style={styles.timer}>⏱ {formatTime(seconds)}</Text>
        </View>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      {/* The flashcard with the chemical structure */}
      <View style={styles.card}>
        <Text style={styles.question}>Which amino acid is this?</Text>
        <View style={styles.imageBox}>
          {imageLoading && <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />}
          <Image
            // "key" makes React treat each card's picture as a new image.
            key={card.answer.cid}
            source={{ uri: structureImageUrl(card.answer) }}
            style={styles.image}
            resizeMode="contain"
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>

        {/* After answering, show facts about the amino acid */}
        {answered && (
          <View style={styles.facts}>
            <Text style={styles.factsName}>{card.answer.name}</Text>
            <Text style={styles.factsDetail}>
              {card.answer.threeLetter} · {card.answer.oneLetter} · {card.answer.group}
            </Text>
          </View>
        )}
      </View>

      {/* The answer choices, shown as a 2x2 grid. .map() turns each option into a button. */}
      <View style={styles.options}>
        {card.options.map((option) => (
          <Pressable
            key={option.name}
            onPress={() => handleChoice(option.name)}
            style={({ pressed }) => [
              styles.option,
              pressed && !answered && styles.optionPressed,
              optionStyle(option.name),
            ]}
          >
            <Text style={styles.optionText} numberOfLines={2}>{option.name}</Text>
          </Pressable>
        ))}
      </View>

      {answered && (
        <View style={styles.next}>
          <BigButton label={isLastCard ? 'See results' : 'Next card →'} onPress={handleNext} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quit: {
    color: colors.mutedText,
    fontSize: 15,
  },
  headerMiddle: {
    alignItems: 'center',
  },
  progress: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  timer: {
    color: colors.mutedText,
    fontSize: 14,
    marginTop: 2,
    // Every digit takes the same width, so the timer doesn't wiggle as it counts.
    fontVariant: ['tabular-nums'],
  },
  score: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    // Shadow (iOS) and elevation (Android) make the card look raised.
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  imageBox: {
    width: '100%',
    height: 240,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  spinner: {
    position: 'absolute',
  },
  facts: {
    marginTop: 12,
    alignItems: 'center',
  },
  factsName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  factsDetail: {
    fontSize: 15,
    color: colors.mutedText,
    marginTop: 4,
  },
  options: {
    marginTop: 16,
    // "row" + "wrap" places the buttons side by side and starts a new
    // row when there's no room left, which gives us a 2x2 grid.
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    // Each button takes up just under half the width, so two fit per row.
    flexBasis: '45%',
    flexGrow: 1,
    minHeight: 60,
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  optionPressed: {
    borderColor: colors.primary,
  },
  optionCorrect: {
    backgroundColor: colors.correctLight,
    borderColor: colors.correct,
  },
  optionWrong: {
    backgroundColor: colors.wrongLight,
    borderColor: colors.wrong,
  },
  optionFaded: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  next: {
    marginTop: 16,
  },
});
