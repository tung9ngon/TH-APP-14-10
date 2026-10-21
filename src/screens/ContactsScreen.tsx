import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import { useApp } from '../context/AppContext';
import { colors, shadow } from '../theme';
import type { MainTabParamList, RootStackParamList, User } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Contacts'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ContactsScreen({ navigation }: Props) {
  const { users, openConversationWith } = useApp();
  const [query, setQuery] = useState('');

  const keyword = query.trim().toLowerCase();
  const data = users.filter((u) => u.name.toLowerCase().includes(keyword));

  const openChat = (userId: string) => {
    navigation.navigate('Chat', { conversationId: openConversationWith(userId) });
  };

  const renderItem = ({ item }: { item: User }) => (
    <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]} onPress={() => openChat(item.id)}>
      <Avatar uri={item.avatar} online={item.online} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.status, { color: item.online ? colors.onlineText : colors.subtext }]}>
          {item.online ? 'Đang hoạt động' : 'Ngoại tuyến'}
        </Text>
      </View>
      <View style={styles.chatIcon}>
        <Ionicons name="chatbubble-ellipses" size={20} color={colors.primary} />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Tìm kiếm danh bạ" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Không tìm thấy người dùng nào.</Text>}
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
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  status: { fontSize: 13, marginTop: 4 },
  chatIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { textAlign: 'center', color: colors.subtext, marginTop: 40 },
});
