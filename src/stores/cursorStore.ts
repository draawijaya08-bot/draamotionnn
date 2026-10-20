import { create } from 'zustand';
import { CursorState } from '@/types/portfolio';

interface CursorStore {
  cursorState: CursorState;
  cursorLabel: string;
  isTouchDevice: boolean;
  setCursorState: (state: CursorState, label?: string) => void;
  setIsTouchDevice: (isTouch: boolean) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  cursorState: 'DEFAULT',
  cursorLabel: '',
  isTouchDevice: false,
  setCursorState: (cursorState, cursorLabel = '') => set({ cursorState, cursorLabel }),
  setIsTouchDevice: (isTouchDevice) => set({ isTouchDevice }),
}));
