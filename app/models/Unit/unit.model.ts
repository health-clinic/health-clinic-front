import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { AddressModel } from "@/models/Address"
import { UnitScheduleModel } from "./unit-schedule.model"
import { ProfessionalScheduleModel } from "../Professional/professional-schedule.model"

export const UnitModel = types
  .model("Unit")
  .props({
    id: types.identifierNumber,
    address: types.reference(AddressModel),
    name: types.string,
    phone: types.string,
    schedules: types.optional(types.array(types.reference(UnitScheduleModel)), []),
    professionalSchedules: types.optional(types.array(types.reference(ProfessionalScheduleModel)), []),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)

export interface Unit extends Instance<typeof UnitModel> {}

export interface UnitSnapshotIn extends SnapshotIn<typeof UnitModel> {}
