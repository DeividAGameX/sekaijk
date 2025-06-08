"use client";
import {Skeleton} from "antd";

function Loading() {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="py-2 px-3 flex item-center border-b-neutral-700 border-b-[1px]">
                <div className="flex gap-3 items-center w-full">
                    <Skeleton.Node
                        style={{
                            width: "110px",
                            height: "22px",
                        }}
                    />
                    <Skeleton.Button
                        style={{
                            minWidth: "22px",
                            width: "22px",
                            height: "22px",
                        }}
                    />
                </div>
                <Skeleton.Input
                    className="max-w-72 w-full"
                    style={{height: "32px"}}
                />
            </div>
            <div className="flex-1 flex py-4 overflow-hidden">
                <Skeleton.Node
                    active
                    className="flex-1 flex"
                    style={{flex: "1", width: "100%", height: "100%"}}
                />
            </div>
        </div>
    );
}

export default Loading;
