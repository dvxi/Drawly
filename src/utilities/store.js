import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
    persist(
        (set) => ({
            name: "",
            changeName: (newName) => set((state) => ({name: newName})),
            printer: "",
            changePrinter: (newPrinter) => set((state) => ({printer: newPrinter})),
            password: "",
            changePassword: (newPassword) => set((state) => ({password: newPassword})),
            lastDrawing: [],
            changeLastDrawing: (newDrawing) => set((state) => ({lastDrawing: newDrawing})),
            changesHistory: {},
            changeChangesHistory: (newHistory) => set((state) => ({changesHistory: {...newHistory}})),
        }),
        {
            name: 'drawly-storage',
            getStorage: () => AsyncStorage,
        }
    )
);

export default useStore;