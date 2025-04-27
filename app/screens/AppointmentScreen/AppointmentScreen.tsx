import { ReactElement, useRef, useState } from "react"
import { AppStackScreenProps } from "@/navigators"
import { Appointment } from "@/models/Appointment"
import { ScrollView, Text, View } from "react-native"
import { FloatingMenu } from "./FloatingMenu"
import { Prescription } from "@/models/Prescription"
import { AppointmentHeader } from "./AppointmentHeader"
import { PatientCard } from "./PatientCard"
import { ComplaintSection } from "@/screens/AppointmentScreen/ComplaintSection"
import { DiagnosisSection } from "@/screens/AppointmentScreen/DiagnosisSection"
import { PrescriptionSection } from "@/screens/AppointmentScreen/PrescriptionSection"
import { Diagnosis } from "@/models/Diagosis"
import { Button } from "@/components/Button"

interface AppointmentScreenProps extends AppStackScreenProps<"Appointment"> {}

export const AppointmentScreen = ({ navigation, route }: AppointmentScreenProps): ReactElement => {
  const { appointment } = route.params as { appointment: Appointment }

  const [complaints, setComplaints] = useState(appointment.complaints || [])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(appointment.diagnoses || [])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(
    appointment.prescriptions || [],
  )

  const complaintSectionRef = useRef(null)
  const diagnosisSectionRef = useRef(null)
  const prescriptionSectionRef = useRef(null)

  return (
    <View className="flex-1 bg-neutral-100">
      <AppointmentHeader appointment={appointment} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex flex-col gap-6 px-4 py-6">
          <PatientCard patient={appointment.patient} />

          <ComplaintSection
            ref={complaintSectionRef}
            complaints={complaints}
            onComplaintAdded={setComplaints}
          />

          <DiagnosisSection
            ref={diagnosisSectionRef}
            diagnoses={diagnoses}
            onDiagnosisAdded={setDiagnoses}
          />

          <PrescriptionSection
            ref={prescriptionSectionRef}
            prescriptions={prescriptions}
            onPrescriptionAdded={setPrescriptions}
          />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-neutral-100 flex-row justify-around items-center px-4 py-3 gap-3">
        <FloatingMenu
          openComplaintModal={() => complaintSectionRef.current?.openModal()}
          openDiagnosisModal={() => diagnosisSectionRef.current?.openModal()}
          openPrescriptionModal={() => prescriptionSectionRef.current?.openModal()}
        />

        <Button
          onPress={() =>
            navigation.navigate("ConfirmAppointment", {
              appointment,
              complaints,
              diagnoses,
              prescriptions,
            })
          }
          className="bg-primary-500 flex-1 rounded-2xl p-4 items-center justify-center"
          style={{ flexBasis: "48%" }}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-sm text-center">Revisar e Confirmar</Text>
        </Button>
      </View>
    </View>
  )
}
