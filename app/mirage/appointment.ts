import { faker } from "@faker-js/faker"
import { Server } from "miragejs"

enum Status {
  Pending = "pending",
  Confirmed = "confirmed",
  Completed = "completed",
  Canceled = "canceled",
}

export function appointmentRouter(this: Server): void {
  this.post("/appointments", () => {
    return {
      id: faker.number.bigInt(),
      professional_id: faker.number.bigInt(),
      patient_id: faker.number.bigInt(),
      unit_id: faker.number.bigInt(),
      status: faker.helpers.enumValue(Status),
      date: faker.date.anytime().toDateString(),
      time: faker.date.anytime().toTimeString(),
      createdAt: faker.date.anytime().toDateString(),
      updatedAt: faker.date.anytime().toDateString(),
    }
  })
}
