// DrawerObserver.js
interface EventDrawer {
    open: boolean;
}

type Listener = (state: EventDrawer) => void;

const listeners: Set<Listener> = new Set<Listener>();

let state: EventDrawer = {
    open: false,
};

export const DrawerObserver = {
    subscribe: (listener: Listener): (() => void) => {
        listeners.add(listener);
        listener(state);
        return () => listeners.delete(listener);
    },
    toggle: () => {
        state = {open: !state.open};
        listeners.forEach((listener: Listener) => listener(state)); // ✅ ya no es unknown
    },
    open: (): boolean => state.open,
};
