import { types } from "mobx-state-tree"

export const LoadingStore = types
  .model("LoadingStore")
  .props({ isLoading: types.boolean })
  .actions((self) => ({
    setLoading(value: boolean) {
      self.isLoading = value
    },
  }))
