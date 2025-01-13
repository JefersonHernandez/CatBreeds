import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

export function Label({ children }: Readonly<{ children: ReactNode }>) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

export default Label;
