// useLinkEvent.ts
import {useEffect, useState} from "react";
import {observer} from "@/lib/EventLink";

export default function useLinkEvent() {
    const [state, setState] = useState(observer.getState());

    useEffect(() => {
        const unsubscribe = observer.subscribe(setState);
        return () => unsubscribe();
    }, []);

    return {
        state,
        handler: observer.update,
    };
}
