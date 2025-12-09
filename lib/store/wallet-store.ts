import { create } from "zustand"

interface WalletStore {
  balance: number
  setBalance: (balance: number) => void
  addToBalance: (amount: number) => void
  subtractFromBalance: (amount: number) => void
}

export const useWalletStore = create<WalletStore>((set) => ({
  balance: 0,
  setBalance: (balance) => set({ balance }),
  addToBalance: (amount) =>
    set((state) => ({ balance: state.balance + amount })),
  subtractFromBalance: (amount) =>
    set((state) => ({ balance: Math.max(0, state.balance - amount) })),
}))

