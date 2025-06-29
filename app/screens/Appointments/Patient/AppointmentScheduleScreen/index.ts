import { AppointmentScheduleForm } from "@/screens/Appointments/Patient/AppointmentScheduleScreen/AppointmentScheduleForm"
import { UnitForm } from "@/screens/Appointments/Patient/AppointmentScheduleScreen/UnitForm"
import { SpecialtyForm } from "@/screens/Appointments/Patient/AppointmentScheduleScreen/SpecialtyForm"
import { ProfessionalForm } from "@/screens/Appointments/Patient/AppointmentScheduleScreen/ProfessionalForm"
import { DateTimeForm } from "@/screens/Appointments/Patient/AppointmentScheduleScreen/DateTimeForm"
import { ReviewScreen } from "@/screens/Appointments/Patient/AppointmentScheduleScreen/ReviewScreen"
import { AppointmentScheduleScreen } from "@/screens/Appointments/Patient/AppointmentScheduleScreen/AppointmentScheduleScreen"

export const AppointmentSchedule = {
  Screen: AppointmentScheduleScreen,
  Form: {
    Root: AppointmentScheduleForm,
    Unit: UnitForm,
    Specialty: SpecialtyForm,
    Professional: ProfessionalForm,
    DateTime: DateTimeForm,
  },
  ReviewScreen: ReviewScreen,
}
