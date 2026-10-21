import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { useApp } from '../context/AppContext';
import { colors, gradient, shadow, shadowStrong } from '../theme';

export default function LoginScreen() {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
      return;
    }
    // Đăng nhập thành công: AppContext cập nhật user, navigator tự chuyển sang Home.
    if (!login(username.trim(), password)) {
      setError('Tài khoản hoặc mật khẩu không đúng.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.logoWrap}>
          <Ionicons name="chatbubbles" size={48} color="#fff" />
        </View>
        <Text style={styles.appName}>TH Chat</Text>
        <Text style={styles.subtitle}>Kết nối mọi người, mọi lúc ✨</Text>

        <TextInput
          style={styles.input}
          placeholder="Tài khoản"
          placeholderTextColor={colors.subtext}
          selectionColor={colors.primary}
          value={username}
          onChangeText={(t) => {
            setUsername(t);
            setError('');
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor={colors.subtext}
          selectionColor={colors.primary}
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            setError('');
          }}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={handleLogin}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </Pressable>

        <Text style={styles.hint}>Tài khoản mẫu: tung / 123456</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  logoWrap: {
    alignSelf: 'center',
    width: 96,
    height: 96,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: gradient,
    boxShadow: shadowStrong,
  },
  appName: { fontSize: 36, fontWeight: '800', color: colors.primary, textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 15, color: colors.subtext, textAlign: 'center', marginTop: 4, marginBottom: 36 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    boxShadow: shadow,
  },
  error: { color: colors.danger, marginBottom: 12, marginLeft: 4 },
  button: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    backgroundImage: gradient,
    boxShadow: shadowStrong,
  },
  pressed: { opacity: 0.85 },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  hint: { color: colors.subtext, textAlign: 'center', marginTop: 24, fontSize: 13 },
});
