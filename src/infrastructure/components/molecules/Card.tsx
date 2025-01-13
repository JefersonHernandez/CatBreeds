import { ReactNode } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import Cover from "../atoms/Cover";

export function Card({ children }: Readonly<{ children: ReactNode }>) {
  const appTheme = useAppTheme();

  return (
    <View style={[{ backgroundColor: appTheme.background }, styles.card]}>
      {children}
    </View>
  );
}

export function Title({
  children,
  style,
}: Readonly<{ children: ReactNode; style?: TextStyle }>) {
  const appTheme = useAppTheme();

  return (
    <Text style={[styles.title, { color: appTheme.text }, style]}>
      {children}
    </Text>
  );
}

export function Label({ children }: Readonly<{ children: ReactNode }>) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

Card.Title = Title;
Card.Label = Label;
Card.Cover = Cover;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
});

export default Card;
