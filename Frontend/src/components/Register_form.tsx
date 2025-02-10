import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";


export default function Register_form({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup(e) {
        e.preventDefault()
        const username = usernameRef.current?.value;
        console.log(usernameRef.current)
        const password = passwordRef.current?.value;
        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/users/signup", {
                username,
                password
            })
            navigate("/Login")
            toast.success("You have signed up!")
        } catch (error: any) {
            toast.error(error.response.data.message)
        }

    }

    const handleLogin = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };



    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Register to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to Register to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input ref={usernameRef} id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>

                    </div>
                    <Input ref={passwordRef} id="password" type="password" required />
                </div>
                <Button onClick={signup} type="submit" className="w-full">
                    Register
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
                <div onClick={handleLogin} >
                    <div variant="outline" className="w-full flex border gap-2 p-[9px] rounded-md cursor-pointer hover:bg-gray-100 border-gray-200 items-center justify-center">
                        <FcGoogle size={22} />
                        <div className="flex text-black text-sm font-medium items-center ">
                            Login with Google

                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={"/Login"} className="underline underline-offset-4">
                    Sign in
                </Link>
            </div>
        </form>
    )
}
