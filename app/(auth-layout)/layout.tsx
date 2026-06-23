import AuthHeader from "@/components/myComponents/authHeader";
import { ReactNode } from "react";


export default function AuthLayout ({children} :{children : ReactNode}){

    return (
        <div className="w-full flex items-center justify-center flex-col h-full">
        <AuthHeader/>
        {children}
        </div>
    )

}