import { ReactElement, useEffect, useState } from "react"
import { SelectUserRoleForm } from "@/screens/Authentication/UserRegisterScreen/SelectUserRoleForm"
import { BasicInformationForm } from "@/screens/Authentication/UserRegisterScreen/BasicInformationForm"
import { PatientDetailsForm } from "@/screens/Authentication/UserRegisterScreen/PatientDetailsForm"
import { PatientAddressForm } from "@/screens/Authentication/UserRegisterScreen/PatientAddressForm"
import { ProfessionalDetailsForm } from "@/screens/Authentication/UserRegisterScreen/ProfessionalDetailsForm"
import { ReviewScreen } from "@/screens/Authentication/UserRegisterScreen/ReviewScreen"
import { useStores } from "@/models"
import { createProfessionalApi } from "@/services/professional/professional.api"
import { api } from "@/services/api"

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
  const { loadingStore } = useStores()
  const [professionalData, setProfessionalData] = useState<{ crm?: string; specialty?: string }>({})

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
      crm: professionalData.crm || undefined,
      specialty: professionalData.specialty || undefined,
      address: user.address
        ? {
            zipCode: user.address.zipCode,
            street: user.address.street,
            number: user.address.number?.toString() || "",
            district: user.address.district,
            city: user.address.city,
            state: user.address.state,
          }
        : undefined,
    }
  }

  const [currentStep, setCurrentStep] = useState<StepId>(isEditMode ? "basicInfo" : "selectRole")
  const [formData, setFormData] = useState<RegisterPayload>(getInitialFormData())

  useEffect(() => {
    const fetchProfessionalData = async () => {
      if (isEditMode && user?.role === "professional") {
        try {
          loadingStore.setLoading(true)
          const response = await createProfessionalApi(api).findAll()

          if (response.kind === "ok") {
            const currentProfessional = response.professionals.find(
              (prof: any) => prof.id === user.id,
            )

            if (currentProfessional) {
              const professionalInfo = {
                crm: currentProfessional.crm,
                specialty: currentProfessional.specialty,
              }
              setProfessionalData(professionalInfo)

              setFormData((prev) => ({
                ...prev,
                crm: professionalInfo.crm,
                specialty: professionalInfo.specialty,
              }))
            }
          }
        } catch (error) {
          console.error("Error fetching professional data:", error)
        } finally {
          loadingStore.setLoading(false)
        }
      }
    }

    fetchProfessionalData()
  }, [isEditMode, user, loadingStore])

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

  const handleBack = () => {
    if (currentStep === "selectRole") {
      onBack?.()
    } else if (currentStep === "basicInfo") {
      if (isEditMode) {
        onBack?.()
      } else {
        setCurrentStep("selectRole")
      }
    } else if (currentStep === "patientDetails") {
      setCurrentStep("basicInfo")
    } else if (currentStep === "patientAddress") {
      setCurrentStep("patientDetails")
    } else if (currentStep === "professionalDetails") {
      setCurrentStep("basicInfo")
    } else if (currentStep === "review") {
      if (formData.role === "administrator") {
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
      if (isEditMode) {
        return (
          <BasicInformationForm
            initialValues={formData}
            onNext={handleBasicInfoSubmit}
            onBack={handleBack}
            isEditMode={isEditMode}
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
          isEditMode={isEditMode}
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
          isEditMode={isEditMode}
        />
      )
    case "patientAddress":
      return (
        <PatientAddressForm
          initialValues={formData.address}
          onNext={(values) => {
            setFormData((prev) => ({ ...prev, address: values }))
            setCurrentStep("review")
          }}
          onBack={handleBack}
          isEditMode={isEditMode}
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
          isEditMode={isEditMode}
        />
      )
    case "review":
      return (
        <ReviewScreen
          formData={formData}
          onSubmit={onSubmit}
          onBack={handleBack}
          isEditMode={isEditMode}
        />
      )
    default:
      return <></>
  }
}
