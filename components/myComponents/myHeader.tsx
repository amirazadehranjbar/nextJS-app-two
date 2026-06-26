"use client"
import Image from "next/image";
import Link from "next/link";
import {ThemeToggle} from "./themeToggle";
import DropdownMenuWithIcons from "./dropdownMenuWithIcons";
import {useConvexAuth} from "convex/react";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

function MyHeader() {


    const {isAuthenticated} = useConvexAuth();
    const router = useRouter()


    return (
        <header
            className="border-b-2 border-foreground bg-secondary w-full px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between">
            <Link href="/">
                <Image
                    alt=""
                    src="/vercel.svg"
                    color={"bg-background"}
                    height={50}
                    width={50}
                    suppressHydrationWarning
                />
            </Link>
            <div className=" hidden items-center justify-between space-x-3 md:flex">
                <Link href="/home" className="my-btn-primary">
                    home
                </Link>
                <Link href="/blog" className="my-btn-primary">
                    blog
                </Link>
                <Link href="/create" className="my-btn-primary">
                    create
                </Link>
                <Link href="/about" className="my-btn-primary">
                    about
                </Link>
            </div>

            <div className="items-center gap-3 hidden md:flex">
                {isAuthenticated
                    ?
                    (<button
                        onClick={() => authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    toast.success("successfully signed out");

                                    router.push("/auth/login");
                                }
                                , onError: (error) => {
                                    toast.error(error.error.message)
                                }
                            }
                        })}
                        className="my-btn-secondary"
                    >
                        sign out
                    </button>)
                    : (<Link
                        href="/auth/signup"
                        className="my-btn-secondary"
                    >
                        sign up
                    </Link>)
                }

                <Link
                    href="/auth/login"
                    className="my-btn-secondary"
                >
                    log in
                </Link>
                <ThemeToggle/>
            </div>

            <div className="flex md:hidden cursor-pointer">
                <DropdownMenuWithIcons/>
            </div>
        </header>
    );
}

export default MyHeader;
