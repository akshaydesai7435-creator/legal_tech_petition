import { create } from 'zustand';

interface AppState {
  aiWidgetOpen: boolean;
  toggleAiWidget: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>((set) => ({
  aiWidgetOpen: false,
  toggleAiWidget: () => set((state) => ({ aiWidgetOpen: !state.aiWidgetOpen })),
  selectedCategory: "All",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
