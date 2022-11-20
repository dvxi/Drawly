import create from 'zustand';

const useStore = create((set) => ({
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
}));

export default useStore;