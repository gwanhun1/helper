import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";

import { colors, fontSize, fontWeight } from "@/theme";

import MapScreen from "./app/(tabs)/index";
import InboxScreen from "./app/(tabs)/inbox";
import MeScreen from "./app/(tabs)/me";
import WorryDetailModal from "./app/worry/[id]";
import ComposeModal from "./app/compose";
import RewardScreen from "./app/reward";
import OnboardingScreen from "./app/onboarding";
import AuthScreen from "./app/auth";
import MyRepliesScreen from "./app/my-replies";
import MyWorriesScreen from "./app/my-worries";
import InsightsScreen from "./app/insights";

// === 라우트 파라미터 타입 ===
export type RootStackParamList = {
  Tabs: undefined;
  Worry: { id: string };
  Compose: undefined;
  Reward: { type?: "reply" | "post"; count?: string } | undefined;
  Onboarding: undefined;
  Auth: undefined;
  MyReplies: undefined;
  MyWorries: undefined;
  Insights: undefined;
};

export type TabParamList = {
  Map: undefined;
  Inbox: undefined;
  Me: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

// === Bottom Tabs ===
function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.mintDeep,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 84,
          paddingTop: 8,
          paddingBottom: 28,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: fontWeight.semibold,
          letterSpacing: 0.2,
        },
      }}
    >
      <Tabs.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "지도",
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          title: "받은답장",
          tabBarIcon: ({ color, size }) => (
            <Feather name="mail" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Me"
        component={MeScreen}
        options={{
          title: "마이",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

// === Root Stack ===
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.bg },
            }}
          >
            <RootStack.Screen name="Tabs" component={TabsNavigator} />
            <RootStack.Screen
              name="Worry"
              component={WorryDetailModal}
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
            <RootStack.Screen
              name="Compose"
              component={ComposeModal}
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
            <RootStack.Screen
              name="Reward"
              component={RewardScreen}
              options={{
                presentation: "modal",
                animation: "fade",
                gestureEnabled: false,
              }}
            />
            <RootStack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{
                animation: "fade",
                gestureEnabled: false,
              }}
            />
            <RootStack.Screen
              name="Auth"
              component={AuthScreen}
              options={{
                animation: "fade",
                gestureEnabled: false,
              }}
            />
            <RootStack.Screen
              name="MyReplies"
              component={MyRepliesScreen}
              options={{ animation: "slide_from_right" }}
            />
            <RootStack.Screen
              name="MyWorries"
              component={MyWorriesScreen}
              options={{ animation: "slide_from_right" }}
            />
            <RootStack.Screen
              name="Insights"
              component={InsightsScreen}
              options={{ animation: "slide_from_right" }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
        <StatusBar barStyle="dark-content" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
