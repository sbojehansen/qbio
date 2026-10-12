import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';

// App is the "root" of the app: everything on screen starts here.
// It remembers which screen to show ('home', 'quiz' or 'results')
// and swaps between them.
export default function App() {
  const [screen, setScreen] = useState('home');
  const [cardCount, setCardCount] = useState(10);
  const [result, setResult] = useState({ score: 0, total: 0 });
  // Changing this number gives QuizScreen a new "key", which makes
  // React start it fresh (new shuffled cards, score back to 0).
  const [round, setRound] = useState(0);

  function startQuiz(count) {
    setCardCount(count);
    setRound(round + 1);
    setScreen('quiz');
  }

  function finishQuiz(score, total) {
    setResult({ score, total });
    setScreen('results');
  }

  return (
    // SafeAreaView keeps content away from the iPhone notch and home bar.
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {screen === 'home' && <HomeScreen onStart={startQuiz} />}

        {screen === 'quiz' && (
          <QuizScreen
            key={round}
            cardCount={cardCount}
            onFinish={finishQuiz}
            onQuit={() => setScreen('home')}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            score={result.score}
            total={result.total}
            onPlayAgain={() => startQuiz(cardCount)}
            onHome={() => setScreen('home')}
          />
        )}

        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
