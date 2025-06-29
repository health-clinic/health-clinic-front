import { RegisterForm } from "@/screens/Authentication/UserRegisterScreen/RegisterForm"
import { RegisterScreen } from "@/screens/Authentication/UserRegisterScreen/RegisterScreen"
import { SelectUserRoleForm } from "@/screens/Authentication/UserRegisterScreen/SelectUserRoleForm"
import { BasicInformationForm } from "@/screens/Authentication/UserRegisterScreen/BasicInformationForm"
import { PatientDetailsForm } from "@/screens/Authentication/UserRegisterScreen/PatientDetailsForm"
import { PatientAddressForm } from "@/screens/Authentication/UserRegisterScreen/PatientAddressForm"
import { ProfessionalDetailsForm } from "@/screens/Authentication/UserRegisterScreen/ProfessionalDetailsForm"
import { ReviewScreen } from "@/screens/Authentication/UserRegisterScreen/ReviewScreen"

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
  ReviewScreen: ReviewScreen,
}
