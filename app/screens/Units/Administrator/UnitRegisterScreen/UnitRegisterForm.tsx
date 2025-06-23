import React, { FC, ReactElement, useCallback, useState } from "react"
import { BasicInformationForm } from "./BasicInformationForm"
import { AddressForm } from "./AddressForm"
import { ProfessionalsForm } from "./ProfessionalsForm"
import { ScheduleForm } from "./ScheduleForm"
import { ReviewScreen } from "./ReviewScreen"

interface FormProfessionalSchedule {
  professionalId: number
  dayOfWeek: string
  start: string
  end: string
}

interface ExtendedCreateUnitData {
  name?: string
  phone?: string
  address?: {
    zipCode?: string
    state?: string
    city?: string
    district?: string
    street?: string
    number?: number
  }
  professionals?: {
    id: number
    name: string
    specialty: string
    schedules: FormProfessionalSchedule[]
  }[]
  schedules?: {
    dayOfWeek: string
    opening: string
    closing: string
    closed: boolean
  }[]
}

interface UnitRegisterFormProps {
  onSubmit: (data: ExtendedCreateUnitData) => void
  onBack: () => void
  unit?: any
}

export const UnitRegisterForm: FC<UnitRegisterFormProps> = ({
  onSubmit,
  onBack,
  unit,
}: UnitRegisterFormProps): ReactElement => {
  const [currentStep, setCurrentStep] = useState(1)
  
  const getInitialFormData = (): ExtendedCreateUnitData => {
    if (!unit) return {}
    
    const dayNames = [
      "Domingo",
      "Segunda-feira", 
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ]
    
    return {
      name: unit.name,
      phone: unit.phone,
      address: {
        zipCode: unit.address?.zipCode,
        state: unit.address?.state,
        city: unit.address?.city,
        district: unit.address?.district,
        street: unit.address?.street,
        number: unit.address?.number,
      },
      schedules: dayNames.map((dayName, index) => {
        const schedule = unit.schedules?.find((s: any) => s.dayOfWeek === index)
        return {
          dayOfWeek: dayName,
          opening: schedule?.opening || "08:00",
          closing: schedule?.closing || "18:00",
          closed: !schedule,
        }
      }),
      professionals: [],
    }
  }
  
  const [formData, setFormData] = useState<ExtendedCreateUnitData>(getInitialFormData())

  const handleNext = useCallback((data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep((prev) => prev + 1)
  }, [])

  const handleBack = () => {
    if (currentStep === 1) {
      onBack()
    } else {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (formData as ExtendedCreateUnitData) {
      await onSubmit(formData as ExtendedCreateUnitData)
    }
  }

  switch (currentStep) {
    case 1:
      return (
        <BasicInformationForm
          initialValues={formData as any}
          onNext={handleNext}
          onBack={handleBack}
        />
      )
    case 2:
      return <AddressForm initialValues={formData as any} onNext={handleNext} onBack={handleBack} />
    case 3:
      return (
        <ScheduleForm initialValues={formData as any} onNext={handleNext} onBack={handleBack} />
      )
    case 4:
      return (
        <ProfessionalsForm
          initialValues={formData as any}
          onNext={handleNext}
          onBack={handleBack}
        />
      )
    case 5:
      return <ReviewScreen formData={formData as any} onSubmit={handleSubmit} onBack={handleBack} />
    default:
      return <></>
  }
}
