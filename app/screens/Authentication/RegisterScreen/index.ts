import { RegisterForm } from "@/screens/Authentication/RegisterScreen/RegisterForm"
import { RegisterScreen } from "@/screens/Authentication/RegisterScreen/RegisterScreen"
import { SelectUserRoleForm } from "@/screens/Authentication/RegisterScreen/SelectUserRoleForm"
import { BasicInformationForm } from "@/screens/Authentication/RegisterScreen/BasicInformationForm"
import { PatientDetailsForm } from "@/screens/Authentication/RegisterScreen/PatientDetailsForm"
import { PatientAddressForm } from "@/screens/Authentication/RegisterScreen/PatientAddressForm"
import { ProfessionalDetailsForm } from "@/screens/Authentication/RegisterScreen/ProfessionalDetailsForm"
import { ReviewRegistrationScreen } from "@/screens/Authentication/RegisterScreen/ReviewRegistrationScreen"

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
