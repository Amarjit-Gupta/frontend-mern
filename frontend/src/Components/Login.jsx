import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import { URL } from "../URL";
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        // console.log(email,password);
        if (!email || !password) {
            setError(true);
            return false;
        }
        try {
            let result = await fetch(`${URL}/login`, {
                method: "post",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" }
            });
            let data = await result.json();
            // console.log(data);
            // console.log(data.auth);
            //  console.log(data.data);

            if (data.data) {
                localStorage.setItem("user", JSON.stringify(data.data));
                navigate("/");
            }
            if (data.result) {
                toast.error("Please enter valid user.");
            }
        }
        catch (err) {
            toast.error("something went wrong try again...");
        }
    }

    return (
        <>
            <div className="main-signup">
                <ToastContainer />
                <div className="signup">
                    <h1>Login here</h1>
                    <form onSubmit={handleLogin}>
                        <input type="email" className="input-Box" placeholder="Enter Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        {error && !email ? <p className="text">Enter Email</p> : ""}
                        <input type="password" className="input-Box" placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        {error && !password ? <p className="text">Enter Password</p> : ""}
                        <button type="submit" className="btn">Login</button>
                    </form>
                </div>

            </div>
            <Footer />
        </>
    );
};
export default Login;