import {faImage} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {motion} from "framer-motion";

function PostCardSkeleton({index}: {index: number}) {
    return (
        <motion.article
            className={`h-80 flex-col overflow-hidden rounded-xl border-2 border-neutral-800 
                ${index == 0 ? "flex" : ""}
                ${index == 1 ? "hidden md:flex" : ""}
                ${index == 2 ? "hidden lg:flex" : ""}
                ${index == 3 ? "hidden xl:flex" : ""}
            `}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <div className="relative flex-1">
                <div className="w-full h-full bg-neutral-900 flex justify-center items-center text-5xl">
                    <FontAwesomeIcon icon={faImage} />
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 px-3 py-2">
                <div className="h-14">
                    <div className="bg-neutral-600 rounded-lg w-full h-5 mb-2"></div>
                    <div className="bg-neutral-600 rounded-lg w-full h-5"></div>
                </div>
                <div className="flex-1">
                    <div className="bg-neutral-600 rounded-lg w-full h-3 mb-2"></div>
                    <div className="bg-neutral-600 rounded-lg w-full h-3"></div>
                </div>
                <div className="w-full flex justify-between items-centers">
                    <div className="bg-neutral-600 rounded-lg w-20 h-3"></div>
                    <div className="bg-primary rounded-lg w-20 h-3"></div>
                </div>
            </div>
        </motion.article>
    );
}

export default PostCardSkeleton;
