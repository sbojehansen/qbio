import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import BigButton from '../components/BigButton';

// The first screen the player sees.
// "props" are values handed to a component by its parent (here: App.js).
// onStart is a function we call when the player picks a quiz length.
export default function HomeScreen({ onStart }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>qbio</Text>
      <Text style={styles.subtitle}>Amino acid flashcards</Text>
      <Text style={styles.description}>
        You'll see the chemical structure of an amino acid. Pick its correct name.
      </Text>

      <View style={styles.buttons}>
        <BigButton label="Quick quiz (10 cards)" onPress={() => onStart(10)} />
        <BigButton label="All 20 amino acids" onPress={() => onStart(20)} variant="outline" />
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
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    color: colors.mutedText,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
  },
  buttons: {
    marginTop: 40,
    gap: 12,
  },
});
