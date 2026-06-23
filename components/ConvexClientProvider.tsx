"use client";

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexReactClient } from "convex/react";
import { authClient } from "@/lib/auth-client";
import React from "react";
import {options} from "@/convex/betterAuth/auth";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL! ,{expectAuth:true});

export function ConvexClientProvider({
                                         children,
                                         initialToken,
                                     }: {
    children: React.ReactNode;
    initialToken?: string | null;
}) {
    return (
        <ConvexBetterAuthProvider
            client={convex}
            authClient={authClient}
            initialToken={initialToken}
        >
            {children}
        </ConvexBetterAuthProvider>
    );
}