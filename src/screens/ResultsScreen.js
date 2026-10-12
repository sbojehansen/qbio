import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { formatTime } from '../utils/formatTime';
import BigButton from '../components/BigButton';

// Picks an encouraging message based on the percentage of correct answers.
function messageFor(percent) {
  if (percent === 100) return 'Perfect! You know your amino acids. 🧬';
  if (percent >= 80) return 'Great work! Almost there.';
  if (percent >= 50) return 'Good effort, keep practising!';
  return "Keep going, you'll get there with practice.";
}

export default function ResultsScreen({ score, total, seconds, onPlayAgain, onHome }) {
  const percent = Math.round((score / total) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quiz complete</Text>
      <Text style={styles.score}>
        {score} / {total}
      </Text>
      <Text style={styles.percent}>{percent}% correct</Text>
      <Text style={styles.time}>⏱ Time: {formatTime(seconds)}</Text>
      <Text style={styles.message}>{messageFor(percent)}</Text>

      <View style={styles.buttons}>
        <BigButton label="Play again" onPress={onPlayAgain} />
        <BigButton label="Back to start" onPress={onHome} variant="outline" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  score: {
    fontSize: 64,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 12,
  },
  percent: {
    fontSize: 18,
    color: colors.mutedText,
    textAlign: 'center',
  },
  time: {
    fontSize: 16,
    color: colors.mutedText,
    textAlign: 'center',
    marginTop: 6,
  },
  message: {
    fontSize: 17,
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
  buttons: {
    marginTop: 40,
    gap: 12,
  },
});
