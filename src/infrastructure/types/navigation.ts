import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MainParamList = {
    Cats: undefined;
    CatDetail: {
        id: string;
    };
};

export type CatsScreenProps = NativeStackScreenProps<MainParamList, "Cats">;

export type CatDetailScreenProps = NativeStackScreenProps<
    MainParamList,
    "CatDetail"
>;
