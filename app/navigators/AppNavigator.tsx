import React, { ComponentProps } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme"
import { Specialty } from "@/models/Specialty/specialty.model"
import { Professional } from "@/models/Professional"
import { Appointment } from "@/models/Appointment"
import { Diagnosis } from "@/models/Diagosis"
import { Prescription } from "@/models/Prescription"
import { useStores } from "@/models"
import { Patient } from "@/models/Patient"
import { Unit } from "@/models/Unit"

export type AppStackParamList = {
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
}

export type PatientAppStackParamList = {
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
  Home: undefined
  SelectUnit: undefined
  SelectSpecialty: { unit: Unit }
  SelectProfessional: { specialty: Specialty; unit: Unit }
  SelectDateTime: { appointmentId?: number; professional: Professional }
  ConfirmSchedule: {
    appointmentId?: number
    professional: Professional
    scheduledFor: string
  }
  AppointmentList: { type: "upcoming" | "history"; appointments: Appointment[] }
  AppointmentDetails: { appointment: Appointment }
  PrescriptionList: undefined
  PrescriptionDetails: { prescription: Prescription }
  Settings: undefined
  Profile: undefined
  Notification: undefined
}

export type AdministratorAppStackParamList = {
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
  Home: undefined
  UnitList: undefined
  UnitRegister: { unit?: Unit }
  UnitDetails: { unit: Unit }
  ProfessionalList: undefined
  ProfessionalDetails: { professional: Professional }
  Patients: undefined
  PatientDetails: { patient: Patient }
  Appointments: undefined
  AppointmentList: { type: "upcoming" | "history"; appointments: Appointment[] }
  AppointmentDetails: { appointment: Appointment }
  Settings: undefined
  Profile: undefined
  Notification: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type AdministratorAppStackScreenProps<T extends keyof AdministratorAppStackParamList> =
  NativeStackScreenProps<AdministratorAppStackParamList, T>

export type PatientAppStackScreenProps<T extends keyof PatientAppStackParamList> =
  NativeStackScreenProps<PatientAppStackParamList, T>

export type ProfessionalAppStackParamList = {
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
  Home: undefined
  CompleteCalendar: undefined
  MedicalRecord: { patient: Patient }
  Appointment: { appointment: Appointment }
  ConfirmAppointment: {
    appointment: Appointment
    complaints: string[]
    diagnoses: Diagnosis[]
    prescriptions: Prescription[]
  }
  AppointmentList: { type: "upcoming" | "history"; appointments: Appointment[] }
  AppointmentDetails: { appointment: Appointment }
  PrescriptionList: undefined
  PrescriptionDetails: { prescription: Prescription }
  Settings: undefined
  Profile: undefined
  Notification: undefined
}

export type ProfessionalAppStackScreenProps<T extends keyof ProfessionalAppStackParamList> =
  NativeStackScreenProps<ProfessionalAppStackParamList, T>

const exitRoutes = Config.exitRoutes

const Stack = createNativeStackNavigator<AppStackParamList>()
const AdministratorStack = createNativeStackNavigator<AdministratorAppStackParamList>()
const PatientStack = createNativeStackNavigator<PatientAppStackParamList>()
const ProfessionalStack = createNativeStackNavigator<ProfessionalAppStackParamList>()

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
        animation: "slide_from_right",
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Screens.Authentication.Login.Screen} />
      <Stack.Screen name="Register" component={Screens.Authentication.Register.Screen} />
      <Stack.Screen
        name="ForgotPassword"
        component={Screens.Authentication.ForgotPassword.Screen}
      />
    </Stack.Navigator>
  )
})

const AdministratorAppStack = observer(function AdministratorAppStack() {
  const {
    theme: { colors },
  } = useAppTheme()

  const { authenticationStore } = useStores()

  return (
    <AdministratorStack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={authenticationStore.isAuthenticated ? "Home" : "Login"}
    >
      <AdministratorStack.Screen name="Login" component={Screens.Authentication.Login.Screen} />
      <AdministratorStack.Screen
        name="Register"
        component={Screens.Authentication.Register.Screen}
      />
      <AdministratorStack.Screen
        name="ForgotPassword"
        component={Screens.Authentication.ForgotPassword.Screen}
      />

      <AdministratorStack.Screen
        name="AppointmentList"
        component={Screens.Appointments.Patient.AppointmentListScreen}
      />

      <AdministratorStack.Screen
        name="Notification"
        component={Screens.Notification.NotificationScreen}
      />
      <AdministratorStack.Screen name="Profile" component={Screens.Common.ProfileScreen} />
      <AdministratorStack.Screen name="Settings" component={Screens.Common.SettingsScreen} />

      <AdministratorStack.Screen name="Home" component={Screens.Home.Administrator.HomeScreen} />

      <AdministratorStack.Screen name="UnitList" component={Screens.Units.UnitListScreen} />
      <AdministratorStack.Screen name="UnitRegister" component={Screens.Units.Register.Screen} />
      <AdministratorStack.Screen name="UnitDetails" component={Screens.Units.UnitDetailsScreen} />
      <AdministratorStack.Screen
        name="ProfessionalList"
        component={Screens.Professionals.ProfessionalListScreen}
      />
      <AdministratorStack.Screen
        name="ProfessionalDetails"
        component={Screens.Professionals.ProfessionalDetailsScreen}
      />
      <AdministratorStack.Screen
        name="Patients"
        component={Screens.Patients.Administrator.PatientListScreen}
      />
      <AdministratorStack.Screen
        name="PatientDetails"
        component={Screens.Patients.Administrator.PatientDetailsScreen}
      />
    </AdministratorStack.Navigator>
  )
})

const PatientAppStack = observer(function PatientAppStack() {
  const {
    theme: { colors },
  } = useAppTheme()

  const { authenticationStore } = useStores()

  return (
    <PatientStack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
        animation: "slide_from_right",
      }}
      initialRouteName={authenticationStore.isAuthenticated ? "Home" : "Login"}
    >
      <PatientStack.Screen name="Login" component={Screens.Authentication.Login.Screen} />
      <PatientStack.Screen name="Register" component={Screens.Authentication.Register.Screen} />
      <PatientStack.Screen
        name="ForgotPassword"
        component={Screens.Authentication.ForgotPassword.Screen}
      />

      <PatientStack.Screen
        name="AppointmentList"
        component={Screens.Appointments.Patient.AppointmentListScreen}
      />

      <PatientStack.Screen name="Settings" component={Screens.Common.SettingsScreen} />
      <PatientStack.Screen name="Profile" component={Screens.Common.ProfileScreen} />

      <PatientStack.Screen name="Home" component={Screens.Home.Patient.HomeScreen} />
      <PatientStack.Screen
        name="SelectUnit"
        component={Screens.Schedule.Patient.SelectUnitScreen}
      />
      <PatientStack.Screen
        name="SelectSpecialty"
        component={Screens.Schedule.Patient.SelectSpecialtyScreen}
      />
      <PatientStack.Screen
        name="SelectProfessional"
        component={Screens.Schedule.Patient.SelectProfessionalScreen}
      />
      <PatientStack.Screen
        name="SelectDateTime"
        component={Screens.Schedule.Patient.SelectDateTimeScreen}
      />
      <PatientStack.Screen
        name="ConfirmSchedule"
        component={Screens.Schedule.Patient.ConfirmScheduleScreen}
      />
      <PatientStack.Screen
        name="AppointmentDetails"
        component={Screens.Appointments.Patient.AppointmentDetailsScreen}
      />
      <PatientStack.Screen
        name="PrescriptionList"
        component={Screens.Prescriptions.Patient.PrescriptionListScreen}
      />
      <PatientStack.Screen
        name="PrescriptionDetails"
        component={Screens.Prescriptions.Patient.PrescriptionDetailsScreen}
      />
      <PatientStack.Screen
        name="Notification"
        component={Screens.Notification.NotificationScreen}
      />
    </PatientStack.Navigator>
  )
})

const ProfessionalAppStack = observer(function ProfessionalAppStack() {
  const {
    theme: { colors },
  } = useAppTheme()

  const { authenticationStore } = useStores()

  return (
    <ProfessionalStack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={authenticationStore.isAuthenticated ? "Home" : "Login"}
    >
      <ProfessionalStack.Screen name="Login" component={Screens.Authentication.Login.Screen} />
      <ProfessionalStack.Screen
        name="Register"
        component={Screens.Authentication.Register.Screen}
      />
      <ProfessionalStack.Screen
        name="ForgotPassword"
        component={Screens.Authentication.ForgotPassword.Screen}
      />

      <ProfessionalStack.Screen
        name="AppointmentList"
        component={Screens.Appointments.Patient.AppointmentListScreen}
      />

      <ProfessionalStack.Screen name="Settings" component={Screens.Common.SettingsScreen} />
      <ProfessionalStack.Screen name="Profile" component={Screens.Common.ProfileScreen} />

      <ProfessionalStack.Screen name="Home" component={Screens.Home.Professional.HomeScreen} />
      <ProfessionalStack.Screen
        name="Appointment"
        component={Screens.Appointments.Professional.AppointmentScreen}
      />
      <ProfessionalStack.Screen
        name="ConfirmAppointment"
        component={Screens.Appointments.Professional.ConfirmAppointmentScreen}
      />
      <ProfessionalStack.Screen
        name="AppointmentDetails"
        component={Screens.Appointments.Professional.AppointmentDetailsScreen}
      />
      <ProfessionalStack.Screen
        name="MedicalRecord"
        component={Screens.MedicalRecord.Professional.MedicalRecordScreen}
      />
      <ProfessionalStack.Screen
        name="CompleteCalendar"
        component={Screens.CompleteCalendar.Professional.CompleteCalendarScreen}
      />
      <ProfessionalStack.Screen
        name="PrescriptionDetails"
        component={Screens.Prescriptions.Patient.PrescriptionDetailsScreen}
      />
      <ProfessionalStack.Screen
        name="Notification"
        component={Screens.Notification.NotificationScreen}
      />
    </ProfessionalStack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()

  const { authenticationStore, userStore } = useStores()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        {!authenticationStore.isAuthenticated ? (
          <AppStack />
        ) : userStore.user?.isAdministrator() ? (
          <AdministratorAppStack />
        ) : userStore.user?.isPatient() ? (
          <PatientAppStack />
        ) : (
          <ProfessionalAppStack />
        )}
      </NavigationContainer>
    </ThemeProvider>
  )
})
