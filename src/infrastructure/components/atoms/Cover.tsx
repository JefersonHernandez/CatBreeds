import { Image, ImageStyle, StyleSheet } from "react-native";

export function Cover({
  uri,
  style,
}: Readonly<{ uri: string; style?: ImageStyle }>) {
  return <Image source={{ uri }} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    overflow: "hidden",
    resizeMode: "contain",
  },
});

export default Cover;
