"use client";

import { create } from "zustand";

interface UIState {
  introComplete: boolean;
  setIntroComplete: (value: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  mousePosition: { x: number; y: number };
  setMousePosition: (pos: { x: number; y: number }) => void;
  selectedProject: string | null;
  setSelectedProject: (id: string | null) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  introComplete: false,
  setIntroComplete: (value) => set({ introComplete: value }),
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (pos) => set({ mousePosition: pos }),
  selectedProject: null,
  setSelectedProject: (id) => set({ selectedProject: id }),
  isMenuOpen: false,
  setIsMenuOpen: (value) => set({ isMenuOpen: value }),
}));
