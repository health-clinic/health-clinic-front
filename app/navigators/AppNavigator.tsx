import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme"
import { ComponentProps } from "react"
import { Unit } from "@/models/Unit"
import { Specialty } from "@/models/Specialty"
import { Professional } from "@/models/Professional"
import { Appointment } from "@/models/Appointment"
import { Diagnosis } from "@/models/Diagosis"
import { Prescription } from "@/models/Prescription"

export type AppStackParamList = {
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
  CodeConfirmation: { email: string }
  ResetPassword: { email: string }
  Home: undefined
  SelectUnit: undefined
  SelectSpecialty: { unit: Unit }
  SelectProfessional: { specialty: Specialty; unit: Unit }
  SelectDateTime: { professional: Professional }
  ConfirmSchedule: { professional: Professional; date: string; time: string }
  Appointment: { appointment: Appointment }
  ConfirmAppointment: {
    appointment: Appointment
    complaints: string[]
    diagnoses: Diagnosis[]
    prescriptions: Prescription[]
  }
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Screens.Login.Screen} />
      <Stack.Screen name="Register" component={Screens.Register.Screen} />
      <Stack.Screen name="ForgotPassword" component={Screens.ForgotPasswordScreen} />
      <Stack.Screen name="CodeConfirmation" component={Screens.CodeConfirmationScreen} />
      <Stack.Screen name="ResetPassword" component={Screens.ResetPasswordScreen} />

      <Stack.Screen name="Home" component={Screens.HomeScreen} />

      <Stack.Screen name="SelectUnit" component={Screens.SelectUnitScreen} />
      <Stack.Screen name="SelectSpecialty" component={Screens.SelectSpecialtyScreen} />
      <Stack.Screen name="SelectProfessional" component={Screens.SelectProfessionalScreen} />
      <Stack.Screen name="SelectDateTime" component={Screens.SelectDateTimeScreen} />
      <Stack.Screen name="ConfirmSchedule" component={Screens.ConfirmScheduleScreen} />

      <Stack.Screen name="Appointment" component={Screens.AppointmentScreen} />
      <Stack.Screen name="ConfirmAppointment" component={Screens.ConfirmAppointmentScreen} />
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  )
})
