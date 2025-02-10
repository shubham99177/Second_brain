import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Particles } from "@/components/magicui/particles";
import { Link } from "react-router-dom";
export function Login() {
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    return (
        <>

            <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">

                <div className="z-50">
                    <div className="flex w-full max-w-sm flex-col gap-6">
                        <Link to={"/"} className="flex items-center gap-2 self-center font-medium">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            Brainly
                        </Link>
                        <LoginForm />
                    </div>
                </div>
            </div>

            <Particles
                className="absolute inset-0 z-0"
                quantity={100}
                ease={80}
                color={color}
                refresh
            />
        </>
    )
}