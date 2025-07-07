import { ReactElement, useState } from "react"
import { SelectUserRoleForm } from "@/screens/Authentication/UserRegisterScreen/SelectUserRoleForm"
import { BasicInformationForm } from "@/screens/Authentication/UserRegisterScreen/BasicInformationForm"
import { PatientDetailsForm } from "@/screens/Authentication/UserRegisterScreen/PatientDetailsForm"
import { PatientAddressForm } from "@/screens/Authentication/UserRegisterScreen/PatientAddressForm"
import { ProfessionalDetailsForm } from "@/screens/Authentication/UserRegisterScreen/ProfessionalDetailsForm"
import { ReviewScreen } from "@/screens/Authentication/UserRegisterScreen/ReviewScreen"

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
  onBack?: () => void
  user?: any
}

export const RegisterForm = ({ onSubmit, onBack, user }: RegisterFormProps): ReactElement => {
  const isEditMode = !!user

  const getInitialFormData = (): RegisterPayload => {
    if (!user) return {}

    return {
      role: user.role as "administrator" | "patient" | "professional",
      name: user.name,
      email: user.email,
      document: user.document || undefined,
      phone: user.phone || undefined,
      birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split("T")[0] : "",
      cns: user.cns || undefined,
      crm: user.crm || undefined,
      specialty: user.specialty || undefined,
    }
  }

  const [currentStep, setCurrentStep] = useState<StepId>(isEditMode ? "basicInfo" : "selectRole")
  const [formData, setFormData] = useState<RegisterPayload>(getInitialFormData())

  const handleRoleSelection = (role: RegisterPayload["role"]) => {
    setFormData((prev) => ({ ...prev, role }))
    setCurrentStep("basicInfo")
  }

  const handleBasicInfoSubmit = (values: Partial<RegisterPayload>) => {
    setFormData((prev) => ({ ...prev, ...values }))

    if (formData.role === "administrator" || isEditMode) {
      setCurrentStep("review")
    } else if (formData.role === "patient") {
      setCurrentStep("patientDetails")
    } else if (formData.role === "professional") {
      setCurrentStep("professionalDetails")
    }
  }

  const handleBack = () => {
    if (currentStep === "selectRole" || (isEditMode && currentStep === "basicInfo")) {
      onBack?.()
    } else if (currentStep === "basicInfo") {
      setCurrentStep("selectRole")
    } else if (currentStep === "patientDetails") {
      setCurrentStep("basicInfo")
    } else if (currentStep === "patientAddress") {
      setCurrentStep("patientDetails")
    } else if (currentStep === "professionalDetails") {
      setCurrentStep("basicInfo")
    } else if (currentStep === "review") {
      if (formData.role === "administrator" || isEditMode) {
        setCurrentStep("basicInfo")
      } else if (formData.role === "patient") {
        setCurrentStep("patientAddress")
      } else if (formData.role === "professional") {
        setCurrentStep("professionalDetails")
      }
    }
  }

  switch (currentStep) {
    case "selectRole":
      // Skip role selection in edit mode
      if (isEditMode) {
        return (
          <BasicInformationForm
            initialValues={formData}
            onNext={handleBasicInfoSubmit}
            onBack={handleBack}
          />
        )
      }
      return <SelectUserRoleForm onNext={handleRoleSelection} onBack={handleBack} />
    case "basicInfo":
      return (
        <BasicInformationForm
          initialValues={formData}
          onNext={handleBasicInfoSubmit}
          onBack={handleBack}
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
          onBack={handleBack}
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
          onBack={handleBack}
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
          onBack={handleBack}
        />
      )
    case "review":
      return <ReviewScreen formData={formData} onSubmit={onSubmit} onBack={handleBack} />
    default:
      return <></>
  }
}
