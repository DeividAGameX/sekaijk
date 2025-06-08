// observer.js
type Listener = (state: EventLink) => void;

const listeners: Set<Listener> = new Set<Listener>();

interface EventLink {
    title: string;
    description: string;
    type: "SUCCESS" | "WARNING" | "ERROR"; // o 'Warning', 'Danger'
    isPrevent: boolean;
    okText: string;
    cancelText: string;
}

let state: EventLink = {
    title: "",
    description: "",
    type: "SUCCESS", // o 'Warning', 'Danger'
    isPrevent: false,
    okText: "Ok",
    cancelText: "Cancel",
};

export const observer = {
    subscribe: (listener: Listener): (() => void) => {
        listeners.add(listener);
        listener(state);
        return () => listeners.delete(listener);
    },
    update: (newState: Partial<EventLink>) => {
        state = {...state, ...newState};
        listeners.forEach((listener: Listener) => listener(state)); // ✅ ya no es unknown
    },
    getState: (): EventLink => ({...state}),
};
