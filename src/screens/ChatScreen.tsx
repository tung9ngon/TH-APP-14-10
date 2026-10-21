import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors, gradient, shadow } from '../theme';
import type { Message, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function ChatScreen({ route, navigation }: Props) {
  const { conversationId } = route.params;
  const { conversations, getUser, markConversationRead, sendMessage } = useApp();
  const [text, setText] = useState('');
  const listRef = useRef<FlatList<Message>>(null);
  const headerHeight = useHeaderHeight();

  const conversation = conversations.find((c) => c.id === conversationId);
  const user = conversation && getUser(conversation.userId);

  useLayoutEffect(() => {
    if (user) {
      navigation.setOptions({ title: user.name, headerBackTitle: 'Quay lại' });
    }
  }, [navigation, user]);

  // Mở cuộc trò chuyện thì coi như đã đọc hết tin nhắn.
  useEffect(() => {
    markConversationRead(conversationId);
  }, [conversationId]);

  if (!conversation || !user) return null;

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(conversationId, text.trim());
    setText('');
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.bubble, item.fromMe ? styles.mine : styles.theirs]}>
      <Text style={[styles.text, item.fromMe && styles.textMine]}>{item.text}</Text>
      <Text style={[styles.time, item.fromMe && styles.timeMine]}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          ref={listRef}
          data={conversation.messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={<Text style={styles.empty}>Hãy gửi lời chào tới {user.name} 👋</Text>}
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor={colors.subtext}
            selectionColor={colors.primary}
            multiline
          />
          <Pressable
            style={({ pressed }) => [styles.send, !text.trim() && styles.sendDisabled, pressed && styles.sendPressed]}
            onPress={handleSend}
            disabled={!text.trim()}
            accessibilityRole="button"
          >
            <Text style={styles.sendText}>Gửi</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, flexGrow: 1 },
  bubble: { maxWidth: '78%', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, marginBottom: 8 },
  mine: { alignSelf: 'flex-end', backgroundImage: gradient, borderBottomRightRadius: 6 },
  theirs: { alignSelf: 'flex-start', backgroundColor: colors.card, borderBottomLeftRadius: 6, boxShadow: shadow },
  text: { fontSize: 15, color: colors.text },
  textMine: { color: '#fff' },
  time: { fontSize: 11, color: colors.subtext, marginTop: 4, alignSelf: 'flex-end' },
  timeMine: { color: '#fff' },
  empty: { textAlign: 'center', color: colors.subtext, marginTop: 40 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: colors.card,
    boxShadow: shadow,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: colors.background,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 15,
    color: colors.text,
  },
  send: { backgroundImage: gradient, borderRadius: 22, paddingHorizontal: 20, paddingVertical: 12, marginLeft: 8 },
  sendDisabled: { opacity: 0.4 },
  sendPressed: { opacity: 0.8 },
  sendText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
