import { ReactNode } from "react";
import { Linking, StyleSheet, Text, TextStyle } from "react-native";

export function ExternalLink({
  url,
  style,
  children,
}: Readonly<{ url: string; style?: TextStyle; children: ReactNode }>) {
  function openLink() {
    Linking.openURL(url).catch(err => console.error("Could not open URL", err));
  }

  return (
    <Text onPress={openLink} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default ExternalLink;
