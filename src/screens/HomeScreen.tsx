import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import { useApp } from '../context/AppContext';
import { colors, gradient, shadow } from '../theme';
import type { Conversation, MainTabParamList, RootStackParamList } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const { conversations, getUser } = useApp();
  const [query, setQuery] = useState('');

  const keyword = query.trim().toLowerCase();
  const data = conversations.filter((c) => getUser(c.userId).name.toLowerCase().includes(keyword));

  const renderItem = ({ item }: { item: Conversation }) => {
    const user = getUser(item.userId);
    const last = item.messages[item.messages.length - 1];
    const hasUnread = item.unread > 0;
    return (
      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
        onPress={() => navigation.navigate('Chat', { conversationId: item.id })}
      >
        <Avatar uri={user.avatar} online={user.online} />
        <View style={styles.info}>
          <View style={styles.line}>
            <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
            <Text style={[styles.time, hasUnread && styles.timeUnread]}>{last ? last.time : ''}</Text>
          </View>
          <View style={styles.line}>
            <Text style={[styles.message, hasUnread && styles.messageUnread]} numberOfLines={1}>
              {last ? `${last.fromMe ? 'Bạn: ' : ''}${last.text}` : 'Chưa có tin nhắn'}
            </Text>
            {hasUnread && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Tìm kiếm cuộc trò chuyện" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Không tìm thấy cuộc trò chuyện nào.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    boxShadow: shadow,
  },
  pressed: { backgroundColor: colors.unreadBg },
  info: { flex: 1, marginLeft: 12 },
  line: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.text, marginRight: 8 },
  time: { fontSize: 12, color: colors.subtext },
  timeUnread: { color: colors.accent, fontWeight: '700' },
  message: { flex: 1, fontSize: 14, color: colors.subtext, marginTop: 4, marginRight: 8 },
  messageUnread: { color: colors.text, fontWeight: '600' },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundImage: gradient,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginTop: 4,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  empty: { textAlign: 'center', color: colors.subtext, marginTop: 40 },
});
