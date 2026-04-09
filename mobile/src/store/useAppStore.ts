import { create } from 'zustand';

// MMKV veya Async Storage adaptörü eklenecek, MVP Mock yapısı:
export interface AppState {
  hasCompletedOnboarding: boolean;
  activeTripId: string | null;
  pendingCompletions: string[]; // Senkronize edilmemiş Route/Stage ID'ler
  completeOnboarding: () => void;
  queueCompletion: (entityId: string) => void;
  clearQueue: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  hasCompletedOnboarding: false,
  activeTripId: null,
  pendingCompletions: [],

  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  
  queueCompletion: (entityId: string) => set((state) => ({ 
    pendingCompletions: [...state.pendingCompletions, entityId] 
  })),

  clearQueue: () => set({ pendingCompletions: [] })
}));
