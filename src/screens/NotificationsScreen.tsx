import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors, gradient, shadow } from '../theme';
import type { Notification } from '../types';

export default function NotificationsScreen() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderItem = ({ item }: { item: Notification }) => (
    <Pressable
      style={({ pressed }) => [styles.row, !item.read && styles.rowUnread, pressed && styles.pressed]}
      onPress={() => markNotificationRead(item.id)}
      disabled={item.read}
    >
      <View style={[styles.dot, !item.read && styles.dotUnread]} />
      <View style={styles.info}>
        <Text style={[styles.content, !item.read && styles.contentUnread]}>{item.content}</Text>
        <View style={styles.meta}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={[styles.state, { color: item.read ? colors.subtext : colors.primary }]}>
            {item.read ? 'Đã đọc' : 'Chưa đọc · Nhấn để đánh dấu đã đọc'}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.summary}>{unreadCount} thông báo chưa đọc</Text>
        <Pressable
          style={({ pressed }) => [styles.markAllButton, pressed && styles.markAllPressed]}
          onPress={markAllNotificationsRead}
          disabled={unreadCount === 0}
          accessibilityRole="button"
        >
          <Text style={[styles.markAll, unreadCount === 0 && styles.markAllDisabled]}>Đánh dấu tất cả đã đọc</Text>
        </Pressable>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có thông báo nào.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  summary: { fontSize: 14, color: colors.subtext },
  markAllButton: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  markAllPressed: { opacity: 0.7 },
  markAll: { fontSize: 13, color: colors.primary, fontWeight: '700' },
  markAllDisabled: { color: colors.subtext },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
  row: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    boxShadow: shadow,
  },
  rowUnread: { backgroundColor: colors.unreadBg },
  pressed: { opacity: 0.8 },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 6, marginRight: 12 },
  dotUnread: { backgroundImage: gradient },
  info: { flex: 1 },
  content: { fontSize: 15, color: colors.subtext },
  contentUnread: { color: colors.text, fontWeight: '600' },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  time: { fontSize: 12, color: colors.subtext },
  state: { fontSize: 12 },
  empty: { textAlign: 'center', color: colors.subtext, marginTop: 40 },
});
