import { createContext, useContext, useEffect, useState } from "react"
import { RootStore, RootStoreModel } from "../RootStore"
import { setupRootStore } from "./setupRootStore"

const _rootStore = RootStoreModel.create({})

const RootStoreContext = createContext<RootStore>(_rootStore)

export const RootStoreProvider = RootStoreContext.Provider

export const useStores = () => useContext(RootStoreContext)

export const useInitialRootStore = (callback?: () => void | Promise<void>) => {
  const rootStore = useStores()
  const [rehydrated, setRehydrated] = useState(false)

  useEffect(() => {
    let _unsubscribe: () => void | undefined
    ;(async () => {
      const { unsubscribe } = await setupRootStore(rootStore)
      _unsubscribe = unsubscribe

      if (__DEV__) {
        // @ts-ignore
        console.tron.trackMstNode(rootStore)
      }

      setRehydrated(true)

      if (callback) callback()
    })()

    return () => {
      if (_unsubscribe !== undefined) _unsubscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { rootStore, rehydrated }
}
