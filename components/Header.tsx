import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ComponentProps } from "react";
import { ThemedView } from "./ThemedView";

interface HeaderProps extends ComponentProps<typeof ThemedView> {}

export default function Header(props: HeaderProps) {
  const { style, children, ...restProps } = props;
  const insets = useSafeAreaInsets();
  const headerBg = useThemeColor({}, "headerBg");
  return (
    <ThemedView
      style={[style, { paddingTop: insets.top, backgroundColor: headerBg }]}
      {...restProps}
    >
      {children}
    </ThemedView>
  );
}
