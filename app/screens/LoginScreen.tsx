import { observer } from "mobx-react-lite"
import { FC, useRef, useState } from "react"
import { TextInput, View, TouchableOpacity, Switch, Alert } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { useStores } from "../models"
import { spacing } from "../theme"
import { useAppTheme } from "../utils/useAppTheme"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { autenticateUser } from "../services/autenticateUser"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

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

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const passwordInput = useRef<TextInput>(null)
  const [isLogin, setIsLogin] = useState(true)
  
  // No animation for simplicity
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useAppTheme()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Input focus states
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [buttonPressed, setButtonPressed] = useState(false)
  
  function handleLogin() {
    setIsSubmitted(true)

    if (email && password) {
      setIsLoading(true)
      
      autenticateUser.login({ email, password })
        .then(() => {
          setIsLoading(false)
          navigation.navigate("Home")
        })
        .catch(error => {
          setIsLoading(false)
          
          const errorMessage = error.errors?.[0]?.message || 'Erro ao fazer login'
          Alert.alert('Erro de autenticação', errorMessage)
        })
    }
  }

  // function handleBiometricLogin() {
  //   setIsLoading(true)
    
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     navigation.navigate("Home")
  //   }, 1500)
  // }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      statusBarStyle="light"
    >
      <View style={{ 
        flex: 1, 
        padding: spacing.xl,
        justifyContent: 'center',
      }}>
        {/* Logo and App Name */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xxl }}>
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
        
        {/* Login Form */}
        <View style={{ marginBottom: spacing.lg }}>
          {/* Email Input */}
          <View style={{ marginBottom: spacing.md }}>
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
          
          {/* Password Input */}
          <View>
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
                onSubmitEditing={handleLogin}
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
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg }}>
          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => setRememberMe(!rememberMe)}
            accessibilityLabel={rememberMe ? "Desativar lembrar-me" : "Ativar lembrar-me"}
            accessibilityRole="switch"
            accessibilityState={{ checked: rememberMe }}
          >
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: theme.colors.palette.neutral400, true: theme.colors.palette.primary400 }}
              thumbColor={rememberMe ? theme.colors.palette.primary500 : theme.colors.palette.neutral500}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], marginRight: spacing.xs }}
            />
            <Text style={{ color: theme.colors.text, fontSize: fontSize.small, fontFamily: 'interMedium', alignSelf: 'center' }}>
              Lembrar-me
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            accessibilityLabel="Esqueceu a senha"
            accessibilityRole="link"
          >
            <Text style={{ 
              color: theme.colors.palette.primary300, 
              fontSize: fontSize.link,
              fontFamily: 'interMedium',
              textDecorationLine: 'underline'
            }}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={{ 
            backgroundColor: isLoading ? theme.colors.palette.primary400 : theme.colors.palette.primary500,
            transform: [{ scale: buttonPressed ? 0.98 : 1 }],
            borderRadius: 50,
            paddingVertical: spacing.md,
            alignItems: 'center',
            ...theme.shadows.button,
            marginBottom: spacing.md,
            width: '100%'
          }}
          onPress={handleLogin}
          onPressIn={() => setButtonPressed(true)}
          onPressOut={() => setButtonPressed(false)}
          disabled={isLoading}
          activeOpacity={0.8}
          accessibilityLabel="Entrar"
          accessibilityRole="button"
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.palette.neutral900} size="small" />
          ) : (
            <Text style={[fontStyles.bold, { fontSize: fontSize.button, color: theme.colors.palette.neutral900 }]}>
              Entrar
            </Text>
          )}
        </TouchableOpacity>

        {/* Biometric Login */}
        {/* <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
          <Text style={{ color: theme.colors.palette.neutral800, fontSize: fontSize.link, marginBottom: spacing.md, fontFamily: 'interMedium' }}>
            Ou entre com
          </Text>
          <TouchableOpacity 
            onPress={handleBiometricLogin}
            style={{
              width: 72, // Increased size
              height: 72, // Increased size
              borderRadius: 36,
              backgroundColor: 'rgba(255,255,255,0.05)',
              justifyContent: 'center',
              alignItems: 'center',
              ...theme.shadows.default,

            }}
            accessibilityLabel="Entrar com impressão digital"
            accessibilityRole="button"
          >
            <View>
              <MaterialCommunityIcons 
                name="fingerprint" 
                size={48} // Increased size
                color={theme.colors.palette.primary500} 
              />
            </View>
          </TouchableOpacity>
        </View> */}

        {/* Create Account / Login Toggle */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: spacing.xl, left: 0, right: 0 }}>
          <Text style={[fontStyles.medium, { fontSize: fontSize.small, color: theme.colors.palette.neutral800, alignSelf: 'center' }]}>
            {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
          </Text>
          <TouchableOpacity 
            onPress={() => isLogin ? navigation.navigate("Register") : setIsLogin(true)}
            accessibilityLabel={isLogin ? "Registre-se" : "Entrar"}
            accessibilityRole="link"
          >
            <Text style={[fontStyles.medium, { 
              fontSize: fontSize.link, 
              color: theme.colors.palette.primary300,
              textDecorationLine: 'underline'
            }]}>
              {isLogin ? "Registre-se" : "Entrar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
})
