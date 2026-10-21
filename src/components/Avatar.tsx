import { Image, StyleSheet, View } from 'react-native';
import { colors, gradient } from '../theme';

type Props = {
  uri: string;
  size?: number;
  online?: boolean;
};

// online: true/false hiển thị chấm trạng thái (true thêm viền gradient); undefined thì không hiển thị.
export default function Avatar({ uri, size = 52, online }: Props) {
  return (
    <View style={[styles.ring, online && styles.ringOnline, { borderRadius: size }]}>
      <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
      {online !== undefined && (
        <View style={[styles.dot, { backgroundColor: online ? colors.online : colors.offline }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: { padding: 2 },
  ringOnline: { backgroundImage: gradient },
  image: { backgroundColor: colors.border, borderWidth: 2, borderColor: colors.card },
  dot: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.card,
  },
});
