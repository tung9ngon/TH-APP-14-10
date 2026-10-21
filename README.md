# TH Chat — Bài thực hành React Native 14/10/2026

Ứng dụng chat dùng React Native CLI + TypeScript + React Navigation, dữ liệu mẫu, không cần máy chủ.

## Chạy ứng dụng

Yêu cầu: Node ≥ 22.11, Xcode + CocoaPods (iOS), Android Studio + JDK 17 (Android).

```bash
npm install
cd ios && pod install && cd ..   # chỉ cần cho iOS

npm start                        # cửa sổ 1: Metro
npm run ios                      # cửa sổ 2: build và mở máy ảo iOS
npm run android                  # hoặc: máy ảo/thiết bị Android
```

**Tài khoản mẫu:** `tung` / `123456`

## Màn hình

| Màn hình | File | Chức năng |
|---|---|---|
| Đăng nhập | `src/screens/LoginScreen.tsx` | Tên app, nhập tài khoản/mật khẩu, kiểm tra không để trống, đăng nhập → Home |
| Home | `src/screens/HomeScreen.tsx` | Danh sách trò chuyện (ảnh, tên, tin gần nhất, thời gian, số tin chưa đọc), tìm kiếm, nhấn để mở chat |
| Danh bạ | `src/screens/ContactsScreen.tsx` | Danh sách người dùng (ảnh, tên, trạng thái trực tuyến), tìm kiếm, nhấn để mở chat |
| Thông báo | `src/screens/NotificationsScreen.tsx` | Nội dung, thời gian, đã đọc/chưa đọc; nhấn để đánh dấu đã đọc, hoặc đánh dấu tất cả |
| Cài đặt | `src/screens/SettingsScreen.tsx` | Thông tin tài khoản, công tắc nhận thông báo (Switch), Đăng xuất → Đăng nhập |
| Chat | `src/screens/ChatScreen.tsx` | Xem nội dung và gửi tin nhắn |

## Cấu trúc

```
index.js                # Đăng ký app với AppRegistry
App.tsx                 # Điều hướng: Stack (Login / Main / Chat) + Bottom Tabs
ios/, android/          # Project native của React Native CLI
src/context/AppContext.tsx  # Trạng thái chung: đăng nhập, cuộc trò chuyện, thông báo
src/data/mockData.ts    # Dữ liệu mẫu
src/components/         # Avatar, SearchBar dùng chung
src/theme.ts            # Bảng màu
src/types.ts            # Kiểu dữ liệu và kiểu tham số điều hướng
```
