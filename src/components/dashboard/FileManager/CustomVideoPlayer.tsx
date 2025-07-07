import {
    faCheck,
    faExpand,
    faPause,
    faPlay,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Slider} from "antd";
import React, {useRef, useState} from "react";

interface CustomVideoPlayerProps {
    src: string;
    onSelect?: () => void;
    onDelete?: () => void;
}

function formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const padded = (num: number) => String(num).padStart(2, "0");

    return hrs > 0
        ? `${padded(hrs)}:${padded(mins)}:${padded(secs)}`
        : `${padded(mins)}:${padded(secs)}`;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
    src,
    onSelect,
    onDelete,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video) {
            setProgress((video.currentTime / video.duration) * 100);
        }
    };

    const handleProgressChange = (e: number) => {
        const video = videoRef.current;
        if (video) {
            const newTime = (e / 100) * video.duration;
            video.currentTime = newTime;
        }
    };

    // const handleFullScreen = () => {
    //     const video = videoRef.current;
    //     if (video) {
    //         if (video.requestFullscreen) video.requestFullscreen();
    //         else if ((video as any).webkitEnterFullscreen)
    //             (video as any).webkitEnterFullscreen();
    //     }
    // };

    return (
        <div
            className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg bg-black relative"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
            />
            <div
                className={`w-full h-full absolute top-0 left-0 ${
                    show ? "opacity-100" : "opacity-0"
                } transition duration-150`}
            >
                <div className="w-ful h-full relative">
                    <div className="flex bg-neutral-950 py-1 px-2 items-center w-full gap-2 absolute bottom-0 left-0">
                        <Button
                            type="text"
                            icon={
                                <FontAwesomeIcon
                                    icon={isPlaying ? faPause : faPlay}
                                />
                            }
                            onClick={togglePlay}
                        />
                        <p>{formatTime(videoRef.current?.currentTime ?? 0)}</p>
                        <Slider
                            className="w-full"
                            value={progress}
                            min={0}
                            max={100}
                            onChange={handleProgressChange}
                        />
                        <p>{formatTime(videoRef.current?.duration ?? 0)}</p>
                        <Button
                            type="text"
                            icon={<FontAwesomeIcon icon={faExpand} />}
                        />
                    </div>
                    <div className="absolute flex justify-between px-2 py-1 w-full">
                        {onSelect && (
                            <Button
                                type="text"
                                icon={<FontAwesomeIcon icon={faCheck} />}
                                onClick={onSelect}
                            />
                        )}
                        {onDelete && (
                            <Button
                                type="text"
                                icon={<FontAwesomeIcon icon={faTrash} />}
                                onClick={onDelete}
                                danger
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomVideoPlayer;
