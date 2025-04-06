import React, { FC, useRef, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Animated
} from "react-native"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { spacing } from "../theme"
import { useAppTheme } from "../utils/useAppTheme"
import { registerUser } from "../services/registerUser"

// Font styles using Inter font with specified weights
const fontStyles = {
  regular: {
    fontFamily: "interRegular",
  },
  medium: {
    fontFamily: "interMedium",
    fontWeight: "500",
  },
  semiBold: {
    fontFamily: "interSemiBold",
    fontWeight: "600",
  },
  bold: {
    fontFamily: "interBold",
    fontWeight: "700",
  },
}

// Font sizes following hierarchy
const fontSize = {
  title: 32,     // Increased logo size
  subtitle: 20,  // Increased subtitle size
  button: 18,    // Increased button text size for better readability
  input: 16,     // Input text size
  label: 16,     // Label text size
  link: 16,      // Increased link text size for better visibility
  small: 14,     // Small text size
  tagline: 18,   // Increased tagline text size
}

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const { navigation } = _props
  const emailInput = useRef<TextInput>(null)
  const phoneInput = useRef<TextInput>(null)
  const birthdateInput = useRef<TextInput>(null)  
  const documentInput = useRef<TextInput>(null)
  const passwordInput = useRef<TextInput>(null)
  const confirmPasswordInput = useRef<TextInput>(null)
  const zipInput = useRef<TextInput>(null)
  const districtInput = useRef<TextInput>(null)
  const streetInput = useRef<TextInput>(null)
  const numberInput = useRef<TextInput>(null)
  const complementInput = useRef<TextInput>(null)
  
  // Form state
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useAppTheme()
  const fadeAnim = useRef(new Animated.Value(0)).current

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [birthdate, setBirthdate] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [document, setDocument] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)
  const [zipCode, setZipCode] = useState("")
  const [district, setDistrict] = useState("")
  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")
  const [complement, setComplement] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Input focus states
  const [nameFocused, setNameFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false)
  const [buttonPressed, setButtonPressed] = useState(false)

  // Fade in animation on mount
  useEffect(() => {
    // Usando setTimeout para garantir que a animação ocorra após a renderização inicial
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }, 100)
  }, [])

  function handleRegister() {
    setIsSubmitted(true)

    setIsLoading(true)
    
    if (true) {
      setIsLoading(true)
      
      registerUser.register({
        name, email, document, phone, birthdate: "31/07/2000", address: { zip_code: zipCode, district, street, number, complement }, password 
    })
      .then(error => {
        setIsLoading(false)
        navigation.navigate("Home")
      })
      .catch(error => {
        setIsLoading(false)
        
        const errorMessage = error.errors?.[0]?.message || 'Erro ao fazer cadastrar usuário'
        Alert.alert('Erro de registro', errorMessage)
      })
    }
  }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      statusBarStyle="light"
    >
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={{paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxxs, alignItems: 'center'}}>
            {/* Logo and App Name */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons 
                name="stethoscope" 
                size={64} 
                color={theme.colors.palette.primary500} 
                style={{ marginRight: spacing.sm }}
              />
              <View>
                <Text style={[fontStyles.bold, { fontSize: fontSize.title, color: theme.colors.palette.neutral900, textAlign: 'left' }]}>
                  MediCare
                </Text>
                <Text style={[fontStyles.medium, { fontSize: fontSize.tagline, color: theme.colors.palette.neutral700, textAlign: 'left' }]}>
                  Cuidando da sua saúde
                </Text>
              </View>
            </View>

            {/* Form Title */}
            <Text style={[fontStyles.semiBold, { fontSize: fontSize.title, color: 'white', marginTop: spacing.xl, marginBottom: spacing.xl }]}>
              Criar uma conta
            </Text>
          </View>

          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              paddingHorizontal: spacing.lg,
              paddingBottom: spacing.xxl,
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Name Input */}
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <View 
                style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: nameFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm, // Increased padding for better touch comfort
                  height: 60, // Slightly increased height
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons 
                  name="account-outline" 
                  size={24} 
                  color={theme.colors.palette.primary300}
                  style={{ marginRight: spacing.sm }} 
                />

                <TextInput
                  style={{ 
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs, // Added vertical padding
                  }}
                  placeholder="Nome completo"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  returnKeyType="next"
                  onSubmitEditing={() => emailInput.current?.focus()}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <View 
                style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: emailFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm, // Increased padding for better touch comfort
                  height: 60, // Slightly increased height
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons 
                  name="email-outline" 
                  size={24} 
                  color={theme.colors.palette.primary300} 
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  style={{ 
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs, // Added vertical padding
                  }}
                  placeholder="E-mail"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInput.current?.focus()}
                  accessibilityLabel="Campo de email"
                />
              </View>
            </View>

            {/* Phone */}
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  height: 60,
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons
                  name="phone"
                  size={24}
                  color={theme.colors.palette.primary300}
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  ref={phoneInput}
                  style={{
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs,
                  }}
                  placeholder="Telefone"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  value={phone}
                  onChangeText={setPhone}
                  returnKeyType="next"
                  onSubmitEditing={() => birthdateInput.current?.focus()}
                />
              </View>
            </View>

            {/* Birthdate
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  height: 60,
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  size={24}
                  color={theme.colors.palette.primary300}
                  style={{ marginRight: spacing.sm }}
                />
                
                <TextInput
                  style={{
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: "interRegular",
                  }}
                  placeholder="Data de nascimento"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  keyboardType="default"
                  value={birthdate ? format(birthdate, "yyyy-MM-dd") : ""}
                  onChangeText={(text) => {
                    const date = new Date(text)
                    if (!isNaN(date.getTime())) {
                      setBirthdate(date)
                    }
                  }}
                  accessibilityLabel="Campo de data de nascimento"
                  type="date" // Web browsers understand this
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={birthdate || new Date(2000, 0, 1)}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false)
                    if (selectedDate) setBirthdate(selectedDate)
                  }}
                  maximumDate={new Date()}
                />
              )}
            </View> */}

            {/* Document */}
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  height: 60,
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={24}
                  color={theme.colors.palette.primary300}
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  ref={documentInput}
                  style={{
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs,
                  }}
                  placeholder="Documento (CPF)"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  value={document}
                  onChangeText={setDocument}
                  returnKeyType="next"
                  onSubmitEditing={() => phoneInput.current?.focus()}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <View 
                style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: passwordFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm, // Increased padding for better touch comfort
                  height: 60, // Slightly increased height
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons 
                  name="lock-outline" 
                  size={24} 
                  color={theme.colors.palette.primary300} 
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  ref={passwordInput}
                  style={{ 
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs, // Added vertical padding
                  }}
                  placeholder="Senha"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  secureTextEntry={isPasswordHidden}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  returnKeyType="done"
                  accessibilityLabel="Campo de senha"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                  style={{ padding: spacing.sm }} // Increased touch area
                  accessibilityLabel={isPasswordHidden ? "Mostrar senha" : "Esconder senha"}
                >
                  <MaterialCommunityIcons 
                    name={isPasswordHidden ? "eye-outline" : "eye-off-outline"} 
                    size={24} 
                    color={theme.colors.palette.primary300} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <View 
                style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: confirmPasswordFocused ? theme.colors.palette.primary300 : theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm, // Increased padding for better touch comfort
                  height: 60, // Slightly increased height
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons 
                  name="lock-outline" 
                  size={24} 
                  color={theme.colors.palette.primary300} 
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  ref={confirmPasswordInput}
                  style={{ 
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs, // Added vertical padding
                  }}
                  placeholder="Confirme a senha"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  secureTextEntry={isConfirmPasswordHidden}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                  returnKeyType="done"
                  accessibilityLabel="Campo de confirmação de senha"
                />
                <TouchableOpacity
                  onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
                  style={{ padding: spacing.sm }} // Increased touch area
                  accessibilityLabel={isConfirmPasswordHidden ? "Mostrar senha" : "Esconder senha"}
                >
                  <MaterialCommunityIcons 
                    name={isConfirmPasswordHidden ? "eye-outline" : "eye-off-outline"} 
                    size={24} 
                    color={theme.colors.palette.primary300} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* ZIP Code */}
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  height: 60,
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color={theme.colors.palette.primary300}
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  ref={zipInput}
                  style={{
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs,
                  }}
                  placeholder="CEP"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  value={zipCode}
                  onChangeText={setZipCode}
                  returnKeyType="next"
                  onSubmitEditing={() => districtInput.current?.focus()}
                />
              </View>
            </View>

            {/* District */}
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  height: 60,
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons
                  name="city"
                  size={24}
                  color={theme.colors.palette.primary300}
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  ref={districtInput}
                  style={{
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs,
                  }}
                  placeholder="Bairro"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  value={district}
                  onChangeText={setDistrict}
                  returnKeyType="next"
                  onSubmitEditing={() => streetInput.current?.focus()}
                />
              </View>
            </View>

            {/* Street */}
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  height: 60,
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons
                  name="road"
                  size={24}
                  color={theme.colors.palette.primary300}
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  ref={streetInput}
                  style={{
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs,
                  }}
                  placeholder="Rua"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  value={street}
                  onChangeText={setStreet}
                  returnKeyType="next"
                  onSubmitEditing={() => numberInput.current?.focus()}
                />
              </View>
            </View>

            {/* Number */}
            <View style={{ marginBottom: spacing.md, width: '100%', maxWidth: 350 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  height: 60,
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons
                  name="numeric"
                  size={24}
                  color={theme.colors.palette.primary300}
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  ref={numberInput}
                  style={{
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs,
                  }}
                  placeholder="Número"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  value={number}
                  onChangeText={setNumber}
                  returnKeyType="next"
                  onSubmitEditing={() => complementInput.current?.focus()}
                />
              </View>
            </View>

            {/* Complement */}
            <View style={{ marginBottom: spacing.lg, width: '100%', maxWidth: 350 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(80, 90, 110, 0.95)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.colors.palette.primary500,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  height: 60,
                  ...theme.shadows.input,
                }}
              >
                <MaterialCommunityIcons
                  name="note-outline"
                  size={24}
                  color={theme.colors.palette.primary300}
                  style={{ marginRight: spacing.sm }}
                />
                <TextInput
                  ref={complementInput}
                  style={{
                    flex: 1,
                    color: theme.colors.palette.neutral900,
                    fontSize: fontSize.input,
                    fontFamily: 'interRegular',
                    paddingVertical: spacing.xs,
                  }}
                  placeholder="Complemento (opcional)"
                  placeholderTextColor={theme.colors.palette.neutral600}
                  value={complement}
                  onChangeText={setComplement}
                  returnKeyType="done"
                />
              </View>
            </View>
          </ScrollView>

          <View style={{paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl, alignItems: 'center'}}>
            {/* Register Button */}
            <TouchableOpacity 
              style={{ 
                backgroundColor: isLoading ? theme.colors.palette.primary400 : theme.colors.palette.primary500,
                borderRadius: 50,
                paddingVertical: spacing.md,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.xl,
                transform: [{ scale: buttonPressed ? 0.98 : 1 }],
                ...theme.shadows.button,
                opacity: 1,
                width: '100%',
                maxWidth: 350
              }}
              onPress={handleRegister}
              disabled={isLoading}
              onPressIn={() => setButtonPressed(true)}
              onPressOut={() => setButtonPressed(false)}
              activeOpacity={0.8}
              accessibilityLabel="Registrar"
              accessibilityRole="button"
            >
              {isLoading ? (
                <ActivityIndicator color={theme.colors.palette.neutral900} size="small" />
              ) : (
                <Text style={[fontStyles.bold, { fontSize: fontSize.button, color: theme.colors.palette.neutral900 }]}>
                  Registrar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      
      {/* Login Link - Posicionado no final da tela */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingBottom: spacing.xl,
        paddingTop: spacing.md,
        backgroundColor: theme.colors.background,
      }}>
        <Text style={[fontStyles.medium, { fontSize: fontSize.small, color: theme.colors.palette.neutral600, alignSelf: 'center' }]}>
          Já tem uma conta?{" "}
        </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Login")}
          accessibilityLabel="Entrar"
          accessibilityRole="link"
        >
          <Text style={[fontStyles.medium, { 
            fontSize: fontSize.link, 
            color: theme.colors.palette.primary500,
            textDecorationLine: 'underline',
          }]}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
