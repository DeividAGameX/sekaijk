"use client";
import {FacebookShare} from "react-share-kit";

export const Facebook = () => {
    return (
        <FacebookShare
            title="Titulo"
            className="p-2 bg-body"
            url="http://localhost:3000/reviw/new-post-algo"
        >
            Feis
        </FacebookShare>
    );
};
