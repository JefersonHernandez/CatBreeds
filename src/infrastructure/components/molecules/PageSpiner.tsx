import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";

export function PageSpiner() {
    const appTheme = useAppTheme();

    return (
        <SafeAreaView
            style={[
                {
                    backgroundColor: appTheme.background,
                },
                styles.page,
            ]}>
            <ActivityIndicator
                size="small"
                style={[{}, styles.activityIndicator]}
                color={appTheme.tint}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default PageSpiner;
