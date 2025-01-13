/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import SplashScreen from "react-native-splash-screen";
import i18n from "./src/infrastructure/i18n";
import { queryClient } from "./src/infrastructure/instances/queryClient";
import MainStack from "./src/infrastructure/navigators/main";

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1_000);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <MainStack />
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
