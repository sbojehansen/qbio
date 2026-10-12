import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import BigButton from '../components/BigButton';

const QUICK_QUIZ_SIZE = 10;

// The first screen the player sees.
// "props" are values handed to a component by its parent (here: App.js).
//
// selectedCount:  how many amino acids are ticked in the settings
// onStart:        called with the number of cards when a quiz is started
// onOpenSettings: called when the player wants to change the selection
export default function HomeScreen({ selectedCount, onStart, onOpenSettings }) {
  // The quick quiz can't have more cards than there are selected amino acids.
  const quickSize = Math.min(QUICK_QUIZ_SIZE, selectedCount);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>qbio</Text>
      <Text style={styles.subtitle}>Amino acid training</Text>

      {/* Shows the current selection, with a shortcut to the settings */}
      <Pressable
        onPress={onOpenSettings}
        style={({ pressed }) => [styles.selection, pressed && styles.selectionPressed]}
      >
        <View>
          <Text style={styles.selectionLabel}>Training on</Text>
          <Text style={styles.selectionValue}>
            {selectedCount} of 20 amino acids
          </Text>
        </View>
        <Text style={styles.selectionChange}>Change ›</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Name quiz</Text>
      <Text style={styles.description}>
        See the chemical structure of an amino acid and pick its name.
      </Text>

      {/* "condition ? A : B" shows A when the condition is true, otherwise B */}
      {selectedCount === 0 ? (
        <Text style={styles.warning}>Select at least one amino acid to start a quiz.</Text>
      ) : (
        <View style={styles.buttons}>
          <BigButton label={`Quick quiz (${quickSize} cards)`} onPress={() => onStart(quickSize)} />
          {selectedCount > QUICK_QUIZ_SIZE && (
            <BigButton
              label={`All selected (${selectedCount} cards)`}
              onPress={() => onStart(selectedCount)}
              variant="outline"
            />
          )}
        </View>
      )}
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
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: 4,
  },
  selection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectionPressed: {
    opacity: 0.7,
  },
  selectionLabel: {
    fontSize: 13,
    color: colors.mutedText,
  },
  selectionValue: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  selectionChange: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 32,
  },
  description: {
    fontSize: 15,
    color: colors.mutedText,
    marginTop: 4,
    lineHeight: 21,
  },
  warning: {
    fontSize: 15,
    color: colors.wrong,
    marginTop: 16,
  },
  buttons: {
    marginTop: 16,
    gap: 12,
  },
});
