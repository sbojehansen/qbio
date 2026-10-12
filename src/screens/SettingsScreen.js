import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { aminoAcids } from '../data/aminoAcids';
import { colors } from '../theme';

// The side chain groups, in the order we want to show them.
const GROUPS = ['Nonpolar', 'Aromatic', 'Polar', 'Negatively charged', 'Positively charged'];

// Lets the player choose which amino acids to train on.
//
// selectedNames: the names that are currently ticked
// onChange:      called with the new list whenever something is ticked or unticked
// onDone:        called when the player taps "Done"
export default function SettingsScreen({ selectedNames, onChange, onDone }) {
  const allNames = aminoAcids.map((aa) => aa.name);

  function isSelected(name) {
    return selectedNames.includes(name);
  }

  // Ticks or unticks one amino acid.
  function toggle(name) {
    if (isSelected(name)) {
      onChange(selectedNames.filter((n) => n !== name));
    } else {
      onChange([...selectedNames, name]);
    }
  }

  // Ticks a whole group, or unticks it if every member is already ticked.
  function toggleGroup(group) {
    const groupNames = aminoAcids.filter((aa) => aa.group === group).map((aa) => aa.name);
    const allTicked = groupNames.every(isSelected);
    if (allTicked) {
      onChange(selectedNames.filter((n) => !groupNames.includes(n)));
    } else {
      // A "Set" is a list without duplicates, so names aren't added twice.
      onChange([...new Set([...selectedNames, ...groupNames])]);
    }
  }

  return (
    <View style={styles.screen}>
      {/* Top bar */}
      <View style={styles.header}>
        <Text style={styles.title}>Choose amino acids</Text>
        <Pressable onPress={onDone} hitSlop={12}>
          <Text style={styles.done}>Done</Text>
        </Pressable>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summary}>
          {selectedNames.length} of {allNames.length} selected
        </Text>
        <View style={styles.quickButtons}>
          <Pressable onPress={() => onChange(allNames)} hitSlop={8}>
            <Text style={styles.quickButton}>All</Text>
          </Pressable>
          <Pressable onPress={() => onChange([])} hitSlop={8}>
            <Text style={styles.quickButton}>None</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {GROUPS.map((group) => (
          <View key={group} style={styles.group}>
            {/* Tapping the group name ticks or unticks the whole group */}
            <Pressable onPress={() => toggleGroup(group)} style={styles.groupHeader}>
              <Text style={styles.groupTitle}>{group}</Text>
              <Text style={styles.groupToggle}>Toggle group</Text>
            </Pressable>

            {aminoAcids
              .filter((aa) => aa.group === group)
              .map((aa) => {
                const ticked = isSelected(aa.name);
                return (
                  <Pressable
                    key={aa.name}
                    onPress={() => toggle(aa.name)}
                    style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                  >
                    <View style={[styles.checkbox, ticked && styles.checkboxTicked]}>
                      {ticked && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.rowName}>{aa.name}</Text>
                    <Text style={styles.rowCode}>
                      {aa.threeLetter} · {aa.oneLetter}
                    </Text>
                  </Pressable>
                );
              })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  done: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  summary: {
    fontSize: 15,
    color: colors.mutedText,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  quickButton: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  group: {
    marginBottom: 16,
    backgroundColor: colors.card,
    borderRadius: 14,
    overflow: 'hidden',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.border,
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  groupToggle: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  rowPressed: {
    backgroundColor: colors.background,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxTicked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  rowName: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  rowCode: {
    fontSize: 14,
    color: colors.mutedText,
  },
});
