"use client";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useTransform,
    wrap,
} from "framer-motion";
import {HTMLAttributes, useRef} from "react";

interface ParallaxProps extends HTMLAttributes<HTMLDivElement> {
    children: string;
    baseVelocity: number;
}

export default function ParallaxText({
    children,
    className,
    baseVelocity = 100,
}: ParallaxProps) {
    const baseX = useMotionValue(0);

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */

        moveBy += directionFactor.current * moveBy;

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamically calculated
     * based on the size of the text and viewport. Likewise, the x motion value is
     * currently wrapped between -20 and -45% - this 25% is derived from the fact
     * we have four children (100% / 4). This would also want deriving from the
     * dynamically generated number of children.
     */
    return (
        <div
            className={`${className} w-full overflow-hidden whitespace-nowrap flex flex-nowrap m-0`}
        >
            <motion.div className="uppercase flex flex-nowrap" style={{x}}>
                <span className="mr-9">{children} </span>
                <span className="mr-9">{children} </span>
                <span className="mr-9">{children} </span>
                <span className="mr-9">{children} </span>
            </motion.div>
        </div>
    );
}
