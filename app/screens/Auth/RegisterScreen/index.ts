import { RegisterForm } from "@/screens/Auth/RegisterScreen/RegisterForm"
import { RegisterScreen } from "@/screens/Auth/RegisterScreen/RegisterScreen"
import { SelectUserRoleForm } from "@/screens/Auth/RegisterScreen/SelectUserRoleForm"
import { BasicInformationForm } from "@/screens/Auth/RegisterScreen/BasicInformationForm"
import { PatientDetailsForm } from "@/screens/Auth/RegisterScreen/PatientDetailsForm"
import { PatientAddressForm } from "@/screens/Auth/RegisterScreen/PatientAddressForm"
import { ProfessionalDetailsForm } from "@/screens/Auth/RegisterScreen/ProfessionalDetailsForm"
import { ReviewRegistrationScreen } from "@/screens/Auth/RegisterScreen/ReviewRegistrationScreen"

export const Register = {
  Screen: RegisterScreen,
  Form: {
    Root: RegisterForm,
    SelectUserRole: SelectUserRoleForm,
    BasicInformation: BasicInformationForm,
    PatientDetails: PatientDetailsForm,
    PatientAddress: PatientAddressForm,
    ProfessionalDetails: ProfessionalDetailsForm,
  },
  ReviewScreen: ReviewRegistrationScreen,
}
