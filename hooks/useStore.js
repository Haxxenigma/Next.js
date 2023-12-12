import { createContext, useContext } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
    const context = useContext(StoreContext);

    if (context === null) {
        throw new Error('Context is null');
    }

    return context;
};