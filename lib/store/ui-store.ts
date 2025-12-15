import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type AlertType = "info" | "success" | "warning" | "danger"

export interface UiAlert {
  id: string
  type: AlertType
  message: string
}

interface UiStoreState {
  hasDismissedFirstTimeBanner: boolean
  dismissFirstTimeBanner: () => void
  alerts: UiAlert[]
  setAlerts: (alerts: UiAlert[]) => void
  connectionIssue: boolean
  setConnectionIssue: (active: boolean) => void
}

export const useUiStore = create<UiStoreState>()(
  persist(
    (set) => ({
      hasDismissedFirstTimeBanner: false,
      dismissFirstTimeBanner: () => set({ hasDismissedFirstTimeBanner: true }),
      alerts: [],
      setAlerts: (alerts) => set({ alerts }),
      connectionIssue: false,
      setConnectionIssue: (active) => set({ connectionIssue: active }),
    }),
    {
      name: "ui-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)


