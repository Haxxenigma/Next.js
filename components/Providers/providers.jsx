'use client';
import Store from '@/store/store';
import { StoreContext } from '@/hooks/useStore';

export default function Providers({ children }) {
    return (
        <StoreContext.Provider value={new Store()}>
            {children}
        </StoreContext.Provider>
    );
}