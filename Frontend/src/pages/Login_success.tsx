import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
function Login_success() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    useEffect(() => {
        // Retrieve query parameters
        const param1 = searchParams.get('token');
        console.log('param1:', param1);
        if (param1) {
            localStorage.setItem("token", param1)
            navigate("/dashboard")

        } else {
            navigate("/signin")
        }

    }, [searchParams]);
    return (
        <div>

        </div>
    )
}

export default Login_success
