import { create } from "zustand";

interface IUseBurgerStore {
  isOpened: boolean;
  isBurgerPressed: any;
}

const useBurgerStore = create<IUseBurgerStore>((set) => ({
  isOpened: false,
  isBurgerPressed: () => {
    set((state) => ({ isOpened: !state.isOpened }));
  },
}));

export default useBurgerStore;
