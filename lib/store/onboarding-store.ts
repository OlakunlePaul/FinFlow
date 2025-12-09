import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface OnboardingData {
  email: string
  password: string
  name: string
  dob: string
  address: string
  idUploaded: boolean
  currentStep: number
}

interface OnboardingStore extends OnboardingData {
  setStep1: (email: string, password: string) => void
  setStep2: (name: string, dob: string, address: string) => void
  setStep3: (idUploaded: boolean) => void
  setCurrentStep: (step: number) => void
  reset: () => void
}

const initialState: OnboardingData = {
  email: "",
  password: "",
  name: "",
  dob: "",
  address: "",
  idUploaded: false,
  currentStep: 1,
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,
      setStep1: (email, password) => set({ email, password }),
      setStep2: (name, dob, address) => set({ name, dob, address }),
      setStep3: (idUploaded) => set({ idUploaded }),
      setCurrentStep: (currentStep) => set({ currentStep }),
      reset: () => set(initialState),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

