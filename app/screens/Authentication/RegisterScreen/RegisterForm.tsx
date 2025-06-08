import { ReactElement, useState } from "react"
import { SelectUserRoleForm } from "@/screens/Authentication/RegisterScreen/SelectUserRoleForm"
import { BasicInformationForm } from "@/screens/Authentication/RegisterScreen/BasicInformationForm"
import { PatientDetailsForm } from "@/screens/Authentication/RegisterScreen/PatientDetailsForm"
import { PatientAddressForm } from "@/screens/Authentication/RegisterScreen/PatientAddressForm"
import { ProfessionalDetailsForm } from "@/screens/Authentication/RegisterScreen/ProfessionalDetailsForm"
import { ReviewRegistrationScreen } from "@/screens/Authentication/RegisterScreen/ReviewRegistrationScreen"

type StepId =
  | "selectRole"
  | "basicInfo"
  | "patientDetails"
  | "patientAddress"
  | "professionalDetails"
  | "review"

export interface RegisterPayload {
  role?: "administrator" | "patient" | "professional"
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  document?: string
  phone?: string
  birthdate?: string
  cns?: string
  address?: any
  crm?: string
  specialty?: string
}

interface RegisterFormProps {
  onSubmit: (data: RegisterPayload) => void
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps): ReactElement => {
  const [currentStep, setCurrentStep] = useState<StepId>("selectRole")
  const [formData, setFormData] = useState<RegisterPayload>({})

  const handleRoleSelection = (role: RegisterPayload["role"]) => {
    setFormData((prev) => ({ ...prev, role }))
    setCurrentStep("basicInfo")
  }

  const handleBasicInfoSubmit = (values: Partial<RegisterPayload>) => {
    setFormData((prev) => ({ ...prev, ...values }))

    if (formData.role === "administrator") {
      setCurrentStep("review")
    } else if (formData.role === "patient") {
      setCurrentStep("patientDetails")
    } else if (formData.role === "professional") {
      setCurrentStep("professionalDetails")
    }
  }

  switch (currentStep) {
    case "selectRole":
      return <SelectUserRoleForm onNext={handleRoleSelection} />
    case "basicInfo":
      return (
        <BasicInformationForm
          initialValues={formData}
          onNext={handleBasicInfoSubmit}
          onBack={() => setCurrentStep("selectRole")}
        />
      )
    case "patientDetails":
      return (
        <PatientDetailsForm
          initialValues={formData}
          onNext={(values) => {
            setFormData((prev) => ({ ...prev, ...values }))
            setCurrentStep("patientAddress")
          }}
          onBack={() => setCurrentStep("basicInfo")}
        />
      )
    case "patientAddress":
      return (
        <PatientAddressForm
          initialValues={formData}
          onNext={(values) => {
            setFormData((prev) => ({ ...prev, address: values }))
            setCurrentStep("review")
          }}
          onBack={() => setCurrentStep("patientDetails")}
        />
      )
    case "professionalDetails":
      return (
        <ProfessionalDetailsForm
          initialValues={formData}
          onNext={(values) => {
            setFormData((prev) => ({ ...prev, ...values }))
            setCurrentStep("review")
          }}
          onBack={() => setCurrentStep("basicInfo")}
        />
      )
    case "review":
      return (
        <ReviewRegistrationScreen
          formData={formData}
          onSubmit={onSubmit}
          onBack={() => {
            if (formData.role === "administrator") setCurrentStep("basicInfo")
            else if (formData.role === "patient") setCurrentStep("patientAddress")
            else if (formData.role === "professional") setCurrentStep("professionalDetails")
          }}
        />
      )
    default:
      return null
  }
}
