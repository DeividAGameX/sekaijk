// usePublicDrawer.ts
import {DrawerObserver} from "@/lib/EventDrawer";
import {useEffect, useState} from "react";

export default function usePublicDrawer() {
    const [state, setState] = useState(DrawerObserver.open());

    useEffect(() => {
        const unsubscribe = DrawerObserver.subscribe((s) => setState(s.open));
        return () => unsubscribe();
    }, []);

    return {
        state,
        toggle: DrawerObserver.toggle,
    };
}
