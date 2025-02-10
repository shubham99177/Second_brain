import Register_form from "@/components/Register_form";
import { GalleryVerticalEnd } from "lucide-react";
import login from "../assets/Login_img.jpg"
import { Link } from "react-router-dom";
import { Meteors } from "@/components/magicui/meteors";

export function Register() {


    return <div className="h-screen w-screen">
        {/* <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} />
            </div>
        </div> */}

        <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <Meteors number={30} />
            <span className="relative z-10 w-full " >
                <div className="grid  min-h-svh lg:grid-cols-2">
                    <div className="flex flex-col gap-4 p-6 md:p-10">
                        <div className="flex justify-center gap-2 md:justify-start">
                            <Link to={"/"} className="flex items-center gap-2 font-medium">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                Brainly
                            </Link>
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="w-full max-w-xs">
                                <Register_form />
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden bg-muted lg:block">
                        <img
                            src={login}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </div>
            </span>
        </div>

    </div>
}