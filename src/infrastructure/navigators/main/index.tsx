import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { CatDetailPage } from "../../pages/cat-detail";
import { CatsPage } from "../../pages/cats";
import { MainParamList } from "../../types/navigation";

const Stack = createNativeStackNavigator<MainParamList>();

export default function MainStack() {
  const { t } = useTranslation();
  const appTheme = useAppTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: appTheme.background,
          },
          headerTintColor: appTheme.text,
        }}>
        <Stack.Screen
          name="Cats"
          component={CatsPage}
          options={{ title: t("general:catBreeds") }}
        />
        <Stack.Screen name="CatDetail" component={CatDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
