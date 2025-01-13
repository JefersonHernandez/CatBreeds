import { StatusBar, useColorScheme } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";

export function ThemedStatusBar() {
    const isDarkMode = useColorScheme() === "dark";
    const appTheme = useAppTheme();

    return (
        <StatusBar
            barStyle={isDarkMode ? "light-content" : "dark-content"}
            backgroundColor={appTheme.background}
        />
    );
}

export default ThemedStatusBar;
