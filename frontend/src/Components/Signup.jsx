import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import { URL } from "../URL";
const Signup = () => {

    const [name, setName] = useState("");
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

    const handleSignup = async (event) => {
        event.preventDefault();
        // console.log(name,email,password);
        if (!name || !email || !password) {
            setError(true);
            return false;
        }

        else if (name.length < 3) {
            toast.warn("Please enter greater than 2 character in name box.");
            return false;
        }
        else if (password.length < 5) {
            toast.warn("Please enter greater than 4 character/digits in password box.");
            return false;
        }
        
        else if (name.trim() && email.trim() && password.trim()) {
            try {
                let result = await fetch(`${URL}/signup`, {
                    method: "post",
                    body: JSON.stringify({ name, email, password }),
                    headers: { "Content-Type": "application/json" }
                });
                let data1 = await result.json();
                // console.log("upper: ",data1);
                // console.log(data1.data.email);
                if (data1.message) {
                    toast.warn("email already exist");
                }

                if (data1.data.email) {
                    localStorage.setItem("user", JSON.stringify(data1.data));
                    navigate("/");
                }
            }
            catch (err) {
                console.log("something went wrong try again...");
            }
        }
        else {
            toast.warn("white sapce not allowed...");
        }
    }


    return (
        <>
            <div className="main-signup">
                <ToastContainer />
                <div className="signup">
                    <h1>Signup here</h1>
                    <form onSubmit={handleSignup}>
                        <input type="text" className="input-Box" placeholder="Enter Name" value={name} onChange={(event) => setName(event.target.value)} />
                        {error && !name ? <p className="text">Enter Name</p> : ""}
                        <input type="email" className="input-Box" placeholder="Enter Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        {error && !email ? <p className="text">Enter Email</p> : ""}
                        <input type="password" className="input-Box" placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        {error && !password ? <p className="text">Enter Password</p> : ""}
                        <button type="submit" className="btn">SignUp</button>
                    </form>
                </div>

            </div>
            <Footer />
        </>
    );
};
export default Signup;
