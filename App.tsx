import { StatusBar, StyleSheet } from 'react-native';
import { Ionicons, type IoniconsIconName } from '@react-native-vector-icons/ionicons/static';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { colors, shadow } from './src/theme';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ChatScreen from './src/screens/ChatScreen';
import type { MainTabParamList, RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcon =
  (name: IoniconsIconName) =>
  ({ focused, color }: { focused: boolean; color: string }) =>
    <Ionicons name={focused ? name : (`${name}-outline` as IoniconsIconName)} size={24} color={color} />;

function MainTabs() {
  const { conversations, notifications } = useApp();
  const unreadChats = conversations.reduce((sum, c) => sum + c.unread, 0);
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subtext,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarBadgeStyle: styles.tabBadge,
        headerStyle: styles.header,
        headerShadowVisible: false,
        headerTitleAlign: 'left',
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Tin nhắn', tabBarIcon: tabIcon('chatbubbles'), tabBarBadge: unreadChats || undefined }}
      />
      <Tab.Screen name="Contacts" component={ContactsScreen} options={{ title: 'Danh bạ', tabBarIcon: tabIcon('people') }} />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Thông báo', tabBarIcon: tabIcon('notifications'), tabBarBadge: unreadNotifications || undefined }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt', tabBarIcon: tabIcon('settings') }} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user } = useApp();

  // Chưa đăng nhập chỉ có màn Login; đăng nhập/đăng xuất sẽ tự chuyển màn hình.
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              headerTintColor: colors.primary,
              headerShadowVisible: false,
              headerTitleStyle: { fontWeight: '700', color: colors.text },
            }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar barStyle="dark-content" />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: { backgroundColor: colors.card, borderTopWidth: 0, boxShadow: shadow },
  tabLabel: { fontSize: 11, fontWeight: '600' },
  tabBadge: { backgroundColor: colors.accent, color: '#fff', fontSize: 11, fontWeight: '700' },
  header: { backgroundColor: colors.background },
  headerTitle: { fontSize: 26, fontWeight: '800', color: colors.text },
});
