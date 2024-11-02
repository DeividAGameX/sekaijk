import {MenuItemType} from "@/types/public/MenuItems";
import {motion, stagger, useAnimate} from "framer-motion";
import Link from "next/link";
import {useEffect, useState} from "react";

const staggerMenuItems = stagger(0.1, {startDelay: 0.15});

function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            "ul",
            {
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)",
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5,
            }
        );
        animate(
            ".menu-item",
            isOpen
                ? {opacity: 1, scale: 1, filter: "blur(0px)"}
                : {opacity: 0, scale: 0.3, filter: "blur(20px)"},
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0,
            }
        );
    }, [isOpen]);

    return scope;
}

function MenuNav({title, items}: {title: string; items: MenuItemType[]}) {
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);

    useEffect(() => {
        console.log(isOpen);
    }, [isOpen]);

    return (
        <div ref={scope} className="relative">
            <motion.button
                whileTap={{scale: 0.97}}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
            >
                {title}
            </motion.button>
            <ul
                className="menu-item absolute top-0 bg-body p-2 min-w-32"
                style={{
                    pointerEvents: isOpen ? "auto" : "none",
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    top: "50px",
                }}
            >
                {items.map((item) => (
                    <li className="m-2" key={item.key}>
                        {item.type === "LINK" ? (
                            <Link href={item.href || ""}>{item.name}</Link>
                        ) : (
                            <button onClick={item.onClick}>{item.name}</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenuNav;
