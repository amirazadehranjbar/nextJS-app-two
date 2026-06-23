import React from 'react'
import {IoIosArrowBack} from "react-icons/io";
import Link from "next/link";

function AuthHeader() {


    return (
        <header className='absolute top-0 w-full h-18 bg-primary/20 border-b-2 border-white/50 p-2 flex items-center shadow-2xl shadow-chart-4'>
            <Link href="/">
                <IoIosArrowBack size={40} className="cursor-pointer"/>
            </Link>
        </header>
    )
}

export default AuthHeader
