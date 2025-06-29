import { FC, ReactElement, useEffect, useState } from "react"
import { UnitForm } from "./UnitForm"
import { SpecialtyForm } from "./SpecialtyForm"
import { ProfessionalForm } from "./ProfessionalForm"
import { DateTimeForm } from "./DateTimeForm"
import { ReviewScreen } from "./ReviewScreen"
import { Unit } from "@/models/Unit"
import { Specialty } from "@/models/Specialty"
import { Professional } from "@/models/Professional"
import { Appointment } from "@/models/Appointment"

type StepId =
  | "selectUnit"
  | "selectSpecialty"
  | "selectProfessional"
  | "selectDateTime"
  | "confirmSchedule"

interface AppointmentSchedulePayload {
  unitId?: number
  specialtyId?: number
  professionalId?: number
  scheduledFor?: string
}

interface AppointmentScheduleFormProps {
  onSubmit: (data: AppointmentSchedulePayload) => void
  onBack: () => void
  appointment?: Appointment
}

export const AppointmentScheduleForm: FC<AppointmentScheduleFormProps> = ({
  onSubmit,
  onBack,
  appointment,
}: AppointmentScheduleFormProps): ReactElement => {
  const [currentStep, setCurrentStep] = useState<StepId>("selectUnit")
  const [formData, setFormData] = useState<AppointmentSchedulePayload>({})

  const [selectedUnit, setSelectedUnit] = useState<Unit | undefined>()
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | undefined>()
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | undefined>()

  useEffect(() => {
    if (appointment) {
      setSelectedUnit(appointment.unit)
      setSelectedProfessional(appointment.professional)
      setSelectedSpecialty(appointment.professional.specialty)
      setFormData({
        unitId: appointment.unit.id,
        professionalId: appointment.professional.id,
      })

      setCurrentStep("selectDateTime")
    }
  }, [appointment])

  const handleUnitSelection = (unit: Unit) => {
    setSelectedUnit(unit)
    setFormData((prev) => ({ ...prev, unitId: unit.id }))
    setCurrentStep("selectSpecialty")
  }

  const handleSpecialtySelection = (specialty: Specialty) => {
    setSelectedSpecialty(specialty.name)
    setFormData((prev) => ({ ...prev, specialtyId: specialty.id }))
    setCurrentStep("selectProfessional")
  }

  const handleProfessionalSelection = (professional: Professional) => {
    setSelectedProfessional(professional)
    setFormData((prev) => ({ ...prev, professionalId: professional.id }))
    setCurrentStep("selectDateTime")
  }

  const handleDateTimeSelection = (scheduledFor: string) => {
    setFormData((prev) => ({ ...prev, scheduledFor }))
    setCurrentStep("confirmSchedule")
  }

  const handleBack = () => {
    if (currentStep === "selectUnit") {
      onBack()
    } else if (currentStep === "selectSpecialty") {
      setCurrentStep("selectUnit")
      setSelectedUnit(undefined)
      setFormData((prev) => ({ ...prev, unitId: undefined }))
    } else if (currentStep === "selectProfessional") {
      setCurrentStep("selectSpecialty")
      setSelectedSpecialty(undefined)
      setFormData((prev) => ({ ...prev, specialtyId: undefined }))
    } else if (currentStep === "selectDateTime") {
      if (appointment) {
        onBack()
      } else {
        setCurrentStep("selectProfessional")
        setSelectedProfessional(undefined)
        setFormData((prev) => ({ ...prev, professionalId: undefined }))
      }
    } else if (currentStep === "confirmSchedule") {
      setCurrentStep("selectDateTime")
      setFormData((prev) => ({ ...prev, scheduledFor: undefined }))
    }
  }

  switch (currentStep) {
    case "selectUnit":
      return <UnitForm onNext={handleUnitSelection} onBack={handleBack} />
    case "selectSpecialty":
      return (
        <SpecialtyForm unit={selectedUnit!} onNext={handleSpecialtySelection} onBack={handleBack} />
      )
    case "selectProfessional":
      return (
        <ProfessionalForm
          unit={selectedUnit!}
          specialty={
            {
              id: formData.specialtyId || 0,
              name: selectedSpecialty!,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as Specialty
          }
          onNext={handleProfessionalSelection}
          onBack={handleBack}
        />
      )
    case "selectDateTime":
      return (
        <DateTimeForm
          professional={selectedProfessional!}
          onNext={handleDateTimeSelection}
          onBack={handleBack}
        />
      )
    case "confirmSchedule":
      return (
        <ReviewScreen
          appointment={{
            unit: selectedUnit!,
            specialty: {
              id: formData.specialtyId || 0,
              name: selectedSpecialty!,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as Specialty,
            professional: selectedProfessional!,
            scheduledFor: formData.scheduledFor!,
          }}
          onConfirm={() => onSubmit(formData)}
          onBack={handleBack}
        />
      )
    default:
      return <></>
  }
}
