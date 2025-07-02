"use client";
import {RootState} from "@/lib/store/PublicStore";
import {motion} from "framer-motion";
import {useSelector} from "react-redux";

interface CarouselItemProps {
    index: number;
    children: React.ReactNode;
}

function CarouselItem({index, children}: Readonly<CarouselItemProps>) {
    const {current} = useSelector((state: RootState) => state.carousel);

    return (
        <motion.div
            className={`absolute top-0 left-0 w-full h-full`}
            transition={{duration: 0.5}}
            animate={{
                x: `${(index - current) * 100}vw`,
                scale: current === index ? 1 : 0.9,
            }}
        >
            {children}
        </motion.div>
    );
}

export default CarouselItem;
