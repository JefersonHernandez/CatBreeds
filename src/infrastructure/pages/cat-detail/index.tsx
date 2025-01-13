import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Cat } from "../../../domain/models/Cat";
import { Picture } from "../../../domain/models/Picture";
import Cover from "../../components/atoms/Cover";
import ExternalLink from "../../components/atoms/ExternalLink";
import { ThemedText } from "../../components/atoms/ThemedText";
import InlineLabel from "../../components/molecules/InlineLabel";
import PageSpiner from "../../components/molecules/PageSpiner";
import ThemedStatusBar from "../../components/molecules/ThemedStatusBar";
import { useAppTheme } from "../../hooks/useAppTheme";
import { catServiceInstance } from "../../services/cat.service";
import { CatDetailScreenProps } from "../../types/navigation";

export function CatDetailPage({
  navigation,
  route,
}: Readonly<CatDetailScreenProps>) {
  const { t } = useTranslation();
  const appTheme = useAppTheme();

  const { isPending, data, ...catDetailQuery } = useQuery({
    queryKey: ["cat-detail", route.params.id] as const,
    queryFn: () => catServiceInstance.cat(route.params.id),
    initialData: {} as Cat,
  });

  const pictureQuery = useQuery({
    queryKey: ["cat-picture", data.image?.id] as const,
    queryFn: () => catServiceInstance.catPicture(data.reference_image_id),
    initialData: {} as Picture,
    enabled: !!data?.reference_image_id,
  });

  useEffect(() => {
    const catName = data.name ?? "";

    navigation.setOptions({
      title: catName,
    });
  }, [route, navigation, data.name]);

  if (isPending || catDetailQuery.isFetching) {
    return <PageSpiner />;
  }

  function onRefresh() {
    catDetailQuery.refetch();
    pictureQuery.refetch();
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
      {pictureQuery.data?.url && (
        <Cover uri={pictureQuery.data.url} style={styles.cover} />
      )}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={
              catDetailQuery.isRefetching || pictureQuery.isRefetching
            }
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={[
          { backgroundColor: appTheme.background },
          styles.flatList,
        ]}>
        <ThemedText type="bodyMedium">{data.description}</ThemedText>
        <ExternalLink url={data.wikipedia_url} style={{ color: appTheme.link }}>
          {t("catDetail:wikipediaUrl")}
        </ExternalLink>
        <InlineLabel label={t("catDetail:origin")}>{data.origin}</InlineLabel>
        <Trans
          i18nKey="catDetail:lifeSpan"
          defaults="<Typography>Esperanza de vida: <Value>{{-name}} años</Value></Typography>"
          values={{ name: data.life_span }}
          components={{
            Typography: <InlineLabel.Label />,
            Value: <InlineLabel.Value />,
          }}
        />
        <InlineLabel label={t("catDetail:intelligence")}>
          {data.intelligence}
        </InlineLabel>
        <InlineLabel label={t("catDetail:indoor")}>
          {t(`general:${!!data.indoor ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:adaptability")}>
          {data.adaptability}
        </InlineLabel>
        <InlineLabel label={t("catDetail:affectionLevel")}>
          {data.affection_level}
        </InlineLabel>
        <InlineLabel label={t("catDetail:childFriendly")}>
          {t(`general:${!!data.child_friendly ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:catFriendly")}>
          {t(`general:${!!data.cat_friendly ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:dogFriendly")}>
          {t(`general:${!!data.dog_friendly ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:energyLevel")}>
          {data.energy_level}
        </InlineLabel>
        <InlineLabel label={t("catDetail:grooming")}>
          {data.grooming}
        </InlineLabel>
        <InlineLabel label={t("catDetail:healthIssues")}>
          {data.health_issues}
        </InlineLabel>
        <InlineLabel label={t("catDetail:sheddingLevel")}>
          {data.shedding_level}
        </InlineLabel>
        <InlineLabel label={t("catDetail:socialNeeds")}>
          {data.social_needs}
        </InlineLabel>
        <InlineLabel label={t("catDetail:strangerFriendly")}>
          {t(`general:${!!data.stranger_friendly ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:vocalisation")}>
          {data.vocalisation}
        </InlineLabel>
        <InlineLabel label={t("catDetail:bidability")}>
          {data.bidability}
        </InlineLabel>
        <InlineLabel label={t("catDetail:experimental")}>
          {t(`general:${!!data.experimental ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:hairless")}>
          {t(`general:${!!data.hairless ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:natural")}>
          {t(`general:${!!data.natural ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:rare")}>
          {t(`general:${!!data.rare ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:rex")}>
          {t(`general:${!!data.rex ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:suppressedTail")}>
          {t(`general:${!!data.suppressed_tail ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:shortLegs")}>
          {t(`general:${!!data.short_legs ? "yes" : "not"}`)}
        </InlineLabel>
        <InlineLabel label={t("catDetail:hypoallergenic")}>
          {t(`general:${!!data.hypoallergenic ? "yes" : "not"}`)}
        </InlineLabel>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  flatList: {
    padding: 16,
    paddingTop: 10,
    gap: 10,
    flexGrow: 1,
  },
  cover: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    margin: 16,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicatorImage: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
  },
});
