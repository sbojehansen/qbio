import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/theme';
import { aminoAcids } from './src/data/aminoAcids';
import { loadSelection, saveSelection } from './src/storage/selection';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const ALL_NAMES = aminoAcids.map((aa) => aa.name);

// App is the "root" of the app: everything on screen starts here.
// It remembers which screen to show ('home', 'settings', 'quiz' or 'results')
// and swaps between them.
export default function App() {
  const [screen, setScreen] = useState('home');
  const [cardCount, setCardCount] = useState(10);
  const [result, setResult] = useState({ score: 0, total: 0, seconds: 0 });
  // Changing this number gives QuizScreen a new "key", which makes
  // React start it fresh (new shuffled cards, score back to 0).
  const [round, setRound] = useState(0);
  // The names of the amino acids ticked in the settings. All of them to begin with.
  const [selectedNames, setSelectedNames] = useState(ALL_NAMES);

  // useEffect runs code after the screen is drawn. The empty [] at the end
  // means "only once, when the app starts": we load the saved selection.
  useEffect(() => {
    loadSelection().then((saved) => {
      if (saved) {
        // Keep only names we still know, in case the list ever changes.
        setSelectedNames(saved.filter((name) => ALL_NAMES.includes(name)));
      }
    });
  }, []);

  // Called by the settings screen: update the selection and save it.
  function changeSelection(names) {
    setSelectedNames(names);
    saveSelection(names);
  }

  // The full amino acid objects for the selected names, in the usual order.
  const selectedPool = aminoAcids.filter((aa) => selectedNames.includes(aa.name));

  function startQuiz(count) {
    setCardCount(count);
    setRound(round + 1);
    setScreen('quiz');
  }

  function finishQuiz(score, total, seconds) {
    setResult({ score, total, seconds });
    setScreen('results');
  }

  return (
    // SafeAreaView keeps content away from the iPhone notch and home bar.
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {screen === 'home' && (
          <HomeScreen
            selectedCount={selectedPool.length}
            onStart={startQuiz}
            onOpenSettings={() => setScreen('settings')}
          />
        )}

        {screen === 'settings' && (
          <SettingsScreen
            selectedNames={selectedNames}
            onChange={changeSelection}
            onDone={() => setScreen('home')}
          />
        )}

        {screen === 'quiz' && (
          <QuizScreen
            key={round}
            pool={selectedPool}
            cardCount={cardCount}
            onFinish={finishQuiz}
            onQuit={() => setScreen('home')}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            score={result.score}
            total={result.total}
            seconds={result.seconds}
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
