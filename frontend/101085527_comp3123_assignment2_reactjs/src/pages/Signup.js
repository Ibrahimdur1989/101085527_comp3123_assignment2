import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function SignUp(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try{
            await axios.post(`${API}/user/signup`, formData);
            setMessage("Signup successful!");
            setTimeout(() => navigate("/login"), 1500);
        } catch(err){
            setError(err.response?.data?.error || "Signup failed.");
        }
    };


    return(
        <div className="signup-container">
            <h1>Create Account</h1>

            {error && <p style={{color:"red"}}>{error}</p>}
            {message && <p style={{color:"green"}}>{message}</p>}

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Full Name" 
                    onChange={handleChange} 
                    required 
                />

                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Address" 
                    onChange={handleChange} 
                    required 
                />

                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    required 
                />

                <button type="submit">Sign Up</button>

            </form>
        </div>
    );
}

export default SignUp;