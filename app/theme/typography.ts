import {
  Inter_300Light as interLight,
  Inter_400Regular as interRegular,
  Inter_500Medium as interMedium,
  Inter_600SemiBold as interSemiBold,
  Inter_700Bold as interBold,
} from "@expo-google-fonts/inter"

export const customFontsToLoad = {
  interLight,
  interRegular,
  interMedium,
  interSemiBold,
  interBold,
}

const fonts = {
  inter: {
    // Cross-platform Google font.
    light: "interLight",
    normal: "interRegular",
    medium: "interMedium",
    semiBold: "interSemiBold",
    bold: "interBold",
  },
}

export const typography = {
  fonts,
  primary: fonts.inter,
  weights: {
    light: "300",
    normal: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  },
  families: {
    interRegular: "Inter-Regular",
    interMedium: "Inter-Medium",
    interBold: "Inter-Bold",
  },
}
