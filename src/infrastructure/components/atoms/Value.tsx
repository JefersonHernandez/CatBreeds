import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

export function Value({ children }: Readonly<{ children: ReactNode }>) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#707070",
    marginBottom: 10,
  },
});

export default Value;
