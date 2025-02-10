import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { toast } from "sonner"
import { FcGoogle } from "react-icons/fc";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin(e: any) {
        e.preventDefault()
        const username = usernameRef.current?.value;
        console.log(usernameRef.current)
        const password = passwordRef.current?.value;
        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/users/signin", {
                username,
                password
            })
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard")
        } catch (error: any) {
            toast.error(error.response.data.message)
        }

    }


    const handleLogin = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    {/* <CardDescription>
                        Login with your Apple or Google account
                    </CardDescription> */}
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                {/* <Button variant="outline" className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Apple
                                </Button> */}
                                <div onClick={handleLogin} >
                                    <div variant="outline" className="w-full flex border gap-2 p-[9px] rounded-md cursor-pointer hover:bg-gray-100 border-gray-200 items-center justify-center">
                                        <FcGoogle size={22} />
                                        <div className="flex text-black text-sm font-medium items-center ">
                                            Login with Google

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        ref={usernameRef}
                                        type="email"
                                        placeholder="m@example.com"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input ref={passwordRef} id="password" type="password" />
                                </div>
                                <Button onClick={signin} className="flex items-center gap-2 bg-black text-white px-4 py-2 ">
                                    Login
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link to="/Register" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
