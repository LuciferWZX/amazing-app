import { Ionicons } from "@expo/vector-icons";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function MessageScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");

  return (
    <ThemedView style={styles.container}>
      <StatusBar backgroundColor={backgroundColor} />
      {/* Header */}
      <Header style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedView>
            <Ionicons name="search" size={24} color={iconColor} />
          </ThemedView>

          <ThemedText type="title" style={styles.headerTitle}>
            消息(758)
          </ThemedText>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons
                name="ellipsis-horizontal"
                size={24}
                color={iconColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Header>

      {/* Content */}
      <ThemedView style={styles.content}>
        <View style={styles.emptyState}>
          <Ionicons name="chatbubbles-outline" size={64} color={iconColor} />
          <ThemedText type="subtitle" style={styles.emptyTitle}>
            暂无消息
          </ThemedText>
          <ThemedText style={styles.emptyDescription}>
            开始与朋友聊天，或探索新的对话
          </ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 4,
    paddingHorizontal: 16,
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyState: {
    alignItems: "center",
    gap: 16,
  },
  emptyTitle: {
    marginTop: 8,
    textAlign: "center",
  },
  emptyDescription: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
});
