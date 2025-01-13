import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export function useAppTheme() {
    const theme = useColorScheme() ?? "light";

    return theme === "light" ? Colors.light : Colors.dark;
}
