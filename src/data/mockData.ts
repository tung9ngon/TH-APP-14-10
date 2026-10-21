// Dữ liệu mẫu — không kết nối máy chủ/cơ sở dữ liệu.
import type { Account, Conversation, Notification, User } from '../types';

export const ACCOUNTS: Account[] = [
  {
    username: 'tung',
    password: '123456',
    name: 'Phạm Xuân Tùng',
    email: 'tung.pham@example.com',
    phone: '0901 234 567',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
];

export const USERS: User[] = [
  { id: 'u1', name: 'Trần Thị Bình', avatar: 'https://i.pravatar.cc/150?img=47', online: true },
  { id: 'u2', name: 'Lê Văn Cường', avatar: 'https://i.pravatar.cc/150?img=33', online: false },
  { id: 'u3', name: 'Phạm Thu Hà', avatar: 'https://i.pravatar.cc/150?img=45', online: true },
  { id: 'u4', name: 'Hoàng Minh Đức', avatar: 'https://i.pravatar.cc/150?img=15', online: false },
  { id: 'u5', name: 'Vũ Ngọc Lan', avatar: 'https://i.pravatar.cc/150?img=44', online: true },
  { id: 'u6', name: 'Đặng Quốc Huy', avatar: 'https://i.pravatar.cc/150?img=59', online: false },
  { id: 'u7', name: 'Bùi Khánh Linh', avatar: 'https://i.pravatar.cc/150?img=49', online: true },
  { id: 'u8', name: 'Ngô Thanh Tùng', avatar: 'https://i.pravatar.cc/150?img=68', online: false },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    userId: 'u1',
    unread: 2,
    messages: [
      { id: 'm1', fromMe: true, text: 'Chào Bình, bài tập React Native làm tới đâu rồi?', time: '09:10' },
      { id: 'm2', fromMe: false, text: 'Mình xong màn hình đăng nhập rồi.', time: '09:15' },
      { id: 'm3', fromMe: false, text: 'Chiều nay họp nhóm nhé!', time: '09:16' },
    ],
  },
  {
    id: 'c2',
    userId: 'u2',
    unread: 0,
    messages: [
      { id: 'm1', fromMe: false, text: 'Gửi mình file slide với.', time: '08:02' },
      { id: 'm2', fromMe: true, text: 'Ok, mình gửi qua email rồi.', time: '08:05' },
    ],
  },
  {
    id: 'c3',
    userId: 'u3',
    unread: 5,
    messages: [
      { id: 'm1', fromMe: false, text: 'Cậu có dùng React Navigation không?', time: 'Hôm qua' },
      { id: 'm2', fromMe: false, text: 'Mình bị lỗi khi chuyển tab.', time: 'Hôm qua' },
    ],
  },
  {
    id: 'c4',
    userId: 'u4',
    unread: 0,
    messages: [{ id: 'm1', fromMe: true, text: 'Cảm ơn Đức nhé 👍', time: 'Thứ 2' }],
  },
  {
    id: 'c5',
    userId: 'u5',
    unread: 1,
    messages: [{ id: 'm1', fromMe: false, text: 'Tối nay đi ăn không?', time: '12/10' }],
  },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', content: 'Trần Thị Bình đã gửi cho bạn 2 tin nhắn mới.', time: '09:16', read: false },
  { id: 'n2', content: 'Phạm Thu Hà đã nhắc đến bạn trong một cuộc trò chuyện.', time: 'Hôm qua', read: false },
  { id: 'n3', content: 'Vũ Ngọc Lan đã chấp nhận lời mời kết bạn.', time: '12/10', read: true },
  { id: 'n4', content: 'Mật khẩu của bạn đã được thay đổi thành công.', time: '10/10', read: true },
  { id: 'n5', content: 'Chào mừng bạn đến với TH Chat!', time: '01/10', read: true },
];
