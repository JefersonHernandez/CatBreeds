import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { ThemedText } from "../atoms/ThemedText";

export function InlineLabel({
  label,
  children,
}: Readonly<{ label: string; children: ReactNode }>) {
  const appTheme = useAppTheme();

  return (
    <ThemedText
      type="bodyMedium"
      style={[{ color: appTheme.text }, styles.typography]}>
      {label}
      <ThemedText
        type="bodyMedium"
        style={[{ color: appTheme.text }, styles.value]}>
        {children}
      </ThemedText>
    </ThemedText>
  );
}

export function Label({ children }: Readonly<{ children?: ReactNode }>) {
  const appTheme = useAppTheme();

  return (
    <ThemedText
      type="bodyMedium"
      style={[{ color: appTheme.text }, styles.typography]}>
      {children}
    </ThemedText>
  );
}

export function Value({ children }: Readonly<{ children?: ReactNode }>) {
  const appTheme = useAppTheme();

  return (
    <ThemedText
      type="bodyMedium"
      style={[{ color: appTheme.text }, styles.value]}>
      {children}
    </ThemedText>
  );
}

InlineLabel.Label = Label;
InlineLabel.Value = Value;

const styles = StyleSheet.create({
  typography: {
    fontWeight: "bold",
  },
  value: {
    fontWeight: "normal",
  },
});

export default InlineLabel;
