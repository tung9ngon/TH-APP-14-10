import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Avatar from '../components/Avatar';
import { useApp } from '../context/AppContext';
import { colors, gradient, shadow, shadowStrong } from '../theme';

export default function SettingsScreen() {
  const { user, logout } = useApp();
  const [notifyEnabled, setNotifyEnabled] = useState(true);

  // Màn Cài đặt chỉ có trong navigator khi đã đăng nhập.
  if (!user) return null;

  const rows = [
    { label: 'Tài khoản', value: user.username },
    { label: 'Email', value: user.email },
    { label: 'Số điện thoại', value: user.phone },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profile}>
        <Avatar uri={user.avatar} size={88} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      <Text style={styles.section}>Thông tin tài khoản</Text>
      <View style={styles.card}>
        {rows.map((r, i) => (
          <View key={r.label} style={[styles.row, i === rows.length - 1 && styles.rowLast]}>
            <Text style={styles.label}>{r.label}</Text>
            <Text style={styles.value}>{r.value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.section}>Tùy chọn</Text>
      <View style={styles.card}>
        <View style={[styles.row, styles.rowLast]}>
          <Text style={styles.label}>Nhận thông báo</Text>
          <Switch
            value={notifyEnabled}
            onValueChange={setNotifyEnabled}
            trackColor={{ true: colors.primary, false: colors.border }}
          />
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.logout, pressed && styles.pressed]}
        onPress={logout}
        accessibilityRole="button"
      >
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16 },
  profile: {
    alignItems: 'center',
    paddingVertical: 28,
    borderRadius: 28,
    backgroundImage: gradient,
    boxShadow: shadowStrong,
  },
  name: { fontSize: 22, fontWeight: '800', color: '#fff', marginTop: 12 },
  username: { fontSize: 14, color: '#fff', marginTop: 4 },
  section: { fontSize: 13, fontWeight: '700', color: colors.subtext, marginTop: 24, marginBottom: 8, marginLeft: 4 },
  card: { backgroundColor: colors.card, borderRadius: 20, boxShadow: shadow },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLast: { borderBottomWidth: 0 },
  label: { fontSize: 15, color: colors.text },
  value: { fontSize: 15, color: colors.subtext },
  logout: {
    marginTop: 32,
    backgroundColor: colors.dangerSoft,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  pressed: { opacity: 0.7 },
  logoutText: { color: colors.danger, fontSize: 17, fontWeight: '700' },
});
