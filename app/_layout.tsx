import { useColorScheme } from "@/hooks/useColorScheme";
import { storage } from "@/lib/storage";
import { StorageKeyEnum } from "@/types/storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { defaultConfig } from "@tamagui/config/v4";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { PortalProvider, TamaguiProvider, Theme, createTamagui } from "tamagui";
const config = createTamagui(defaultConfig);
type Conf = typeof config;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const checkBeforeInit = useCallback(async () => {
    // 如果当前路径是 auth 路径下的页面，则不进行 token 校验
    if (pathname.startsWith("/auth/")) {
      console.warn("当前在认证页面，跳过 token 校验");
      setIsLoading(false);
      return;
    }

    const token = await storage.getItem(StorageKeyEnum.TOKEN);
    if (!token) {
      console.warn("token not found, redirect to login");
      router.replace("/auth/login");
    }
    setIsLoading(false);
  }, [router, pathname]);

  useEffect(() => {
    console.warn("checkBeforeInit");
    checkBeforeInit();
  }, [checkBeforeInit]);
  if (!loaded || isLoading) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PortalProvider>
        <TamaguiProvider config={config}>
          <Theme name={colorScheme === "dark" ? "dark" : "light"}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="auth/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </Theme>
          <StatusBar style="auto" />
        </TamaguiProvider>
      </PortalProvider>

      <Toast />
    </ThemeProvider>
  );
}
