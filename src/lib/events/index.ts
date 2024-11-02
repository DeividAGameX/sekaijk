const subscribe = (eventName: string, listener: (e: any) => void) => {
    window.document.addEventListener(eventName, listener);
};

const unsubscribe = (eventName: string, listener: (e: any) => void) => {
    window.document.removeEventListener(eventName, listener);
};

const sendEvent = (eventName: string, data: any) => {
    window.document.dispatchEvent(new CustomEvent(eventName, data));
};

const sendEventSimple = (eventName: string) => {
    window.document.dispatchEvent(new Event(eventName));
};

export {subscribe, unsubscribe, sendEvent, sendEventSimple};
