import {Input} from "@/shared/ui/input";
import React from "react";

export const Search = () => {
    return (
    <div className="flex w-[30rem] mx-4">
        <Input className="bg-white rounded-r-none" placeholder="search..."/>
        <button className="rounded-r-md text-white w-[5rem] bg-gray-700">
            find
        </button>
    </div>
    )
}