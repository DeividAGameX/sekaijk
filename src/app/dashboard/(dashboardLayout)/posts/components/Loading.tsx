import {Skeleton} from "antd";
import {motion} from "framer-motion";

const ItemComponents = () => (
    <motion.div
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
        }}
        exit={{
            opacity: 0,
        }}
        transition={{
            duration: 0.5,
        }}
        className="flex flex-col rounded-xl overflow-hidden shadow bg-body hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 xl:min-h-[384px] xl:h-[384px] xl:max-h-[384px] 2xl:min-h-[395px] 2xl:h-[395px] 2xl:max-h-[395px]"
    >
        <Skeleton.Image
            className="w-full h-40"
            style={{width: "100%", height: "160px"}}
        />
        <div className="p-4 h-full flex flex-col">
            <div className="flex-1">
                <Skeleton paragraph={{rows: 3}} className="mt-2" />
            </div>
            <div className="mt-4 flex justify-between">
                <Skeleton.Button />
                <Skeleton.Button />
            </div>
        </div>
    </motion.div>
);

function LoadingPosts() {
    return (
        <>
            <ItemComponents />
            <ItemComponents />
            <ItemComponents />
            <ItemComponents />
        </>
    );
}

export default LoadingPosts;
