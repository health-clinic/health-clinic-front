const palette = {
  neutral900: "#FFFFFF",
  neutral800: "#C3C7CD",
  neutral700: "#A2AAB1",
  neutral600: "#8A8A8A",
  neutral500: "#5B5F66",
  neutral400: "#3A3F45",
  neutral300: "#1A2532",
  neutral200: "#121A28",
  neutral100: "#0A1420",

  primary600: "#2AA6F0",
  primary500: "#2DB5FD",
  primary400: "#5BB6FF",
  primary300: "#A2C8F7",
  primary200: "#C5DFFF",
  primary100: "#E5F1FF",

  secondary500: "#8CDDFF",
  secondary400: "#6ACEF2",
  secondary300: "#4ABED6",
  secondary200: "#3597AD",
  secondary100: "#246A7A",

  accent500: "#FF6B8B",
  accent400: "#FF8CA6",
  accent300: "#FFADC0",
  accent200: "#FFCEDA",
  accent100: "#FFEEF2",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(7, 21, 36, 0.2)",
  overlay50: "rgba(7, 21, 36, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral900,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral300,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,

  tintPressed: palette.primary400,
  inputBackground: palette.neutral300,
} as const

export const shadows = {
  default: {
    shadowColor: "rgba(63, 169, 245, 0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    shadowColor: "rgba(63, 169, 245, 0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
}
