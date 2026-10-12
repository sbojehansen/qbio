import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

// A reusable button. Writing it once means every button in the app
// looks the same, and we only need to change the style in one place.
//
// variant: 'filled' (green background) or 'outline' (green border).
export default function BigButton({ label, onPress, variant = 'filled' }) {
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      // "pressed" is true while the finger is on the button, so it dims slightly.
      style={({ pressed }) => [
        styles.button,
        isOutline && styles.outline,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, isOutline && styles.outlineLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  outlineLabel: {
    color: colors.primary,
  },
});
