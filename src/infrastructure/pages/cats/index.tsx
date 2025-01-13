import { useInfiniteQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "../../components/atoms/ThemedText";
import Card from "../../components/molecules/Card";
import InlineLabel from "../../components/molecules/InlineLabel";
import ThemedStatusBar from "../../components/molecules/ThemedStatusBar";
import { useAppTheme } from "../../hooks/useAppTheme";
import { catServiceInstance } from "../../services/cat.service";
import { CatsScreenProps } from "../../types/navigation";

export function CatsPage({ navigation }: Readonly<CatsScreenProps>) {
  const [searchText, setSearchText] = useState("");
  const deferredSearchText = useDeferredValue(searchText);
  const { t } = useTranslation();
  const appTheme = useAppTheme();

  const catsQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["cats", deferredSearchText] as const,
    queryFn: async ({ pageParam = 1 }) => {
      if (deferredSearchText) {
        return catServiceInstance.catsSearch(deferredSearchText);
      }

      return catServiceInstance
        .cats({
          queryParams: {
            page: pageParam.toString(),
            limit: "50",
          },
        })
        .then(response => response.filter(cat => cat.image?.url));
    },
    getNextPageParam: (lastPage, allPages) => {
      if (deferredSearchText) {
        return undefined;
      }
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  function goToDetail(id: string) {
    navigation.navigate("CatDetail", { id });
  }

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: appTheme.background,
        },
        styles.page,
      ]}>
      <ThemedStatusBar />
      <TextInput
        style={[styles.searchBar, { color: appTheme.text }]}
        placeholder={t("general:search")}
        placeholderTextColor={appTheme.text}
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={catsQuery.data?.pages.flat()}
        refreshControl={
          <RefreshControl
            refreshing={catsQuery.isRefetching}
            onRefresh={catsQuery.refetch}
          />
        }
        renderItem={({ item }) => (
          <Card>
            <View style={styles.row}>
              <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
              <ThemedText
                type="bodyMedium"
                onPress={() => goToDetail(item.id)}
                style={styles.link}>
                {t("general:viewMore")}
              </ThemedText>
            </View>
            {item.image?.url && <Card.Cover uri={item.image.url} />}
            <View style={styles.row}>
              <InlineLabel.Value>{item.origin}</InlineLabel.Value>
              <InlineLabel.Value>
                {t("catDetail:intelligence")}
                <InlineLabel.Value>{item.intelligence}</InlineLabel.Value>
              </InlineLabel.Value>
            </View>
          </Card>
        )}
        keyExtractor={(item, i) => `${item.id}-${i}`}
        ListEmptyComponent={() => (
          <ThemedText type="bodyMedium" style={styles.noResults}>
            {t(`general:${deferredSearchText ? "noResults" : "emptyList"}`)}
          </ThemedText>
        )}
        onEndReached={() => catsQuery.fetchNextPage()}
        contentContainerStyle={[
          {
            backgroundColor: appTheme.background,
          },
          styles.flatList,
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  flatList: {
    paddingHorizontal: 15,
    paddingTop: 10,
    flexGrow: 1,
  },
  cardTitle: {
    flexShrink: 1,
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  noResults: {
    flexGrow: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
