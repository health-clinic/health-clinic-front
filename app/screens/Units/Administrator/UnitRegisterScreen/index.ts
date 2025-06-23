import { UnitRegisterScreen } from "@/screens/Units/Administrator/UnitRegisterScreen/UnitRegisterScreen"
import { UnitRegisterForm } from "@/screens/Units/Administrator/UnitRegisterScreen/UnitRegisterForm"
import { BasicInformationForm } from "@/screens/Units/Administrator/UnitRegisterScreen/BasicInformationForm"
import { AddressForm } from "@/screens/Units/Administrator/UnitRegisterScreen/AddressForm"
import { ReviewScreen } from "@/screens/Units/Administrator/UnitRegisterScreen/ReviewScreen"

export const Register = {
  Screen: UnitRegisterScreen,
  Form: {
    Root: UnitRegisterForm,
    BasicInformation: BasicInformationForm,
    Address: AddressForm,
  },
  ReviewScreen: ReviewScreen,
}
