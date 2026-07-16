"use client"
import React from 'react'
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import {useRouter} from "next/navigation";

function BlogIdPage() {

    const router = useRouter();


    return (
        <div className="animate-in fade-in duration-500 w-full h-full bg-chart-5">
            <div className="w-full shadow-md flex p-4">
                <FaRegArrowAltCircleLeft className="size-9 cursor-pointer" onClick={router.back}/>
            </div>
        </div>
    )
}

export default BlogIdPage
