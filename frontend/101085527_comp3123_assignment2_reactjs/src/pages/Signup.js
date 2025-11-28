import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp(){

    const navigate = useNavigate();

    const [formDate, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormDate({
            ...formDate,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try{
            const response = await axios.post("http://localhost:3000/signup", formData);
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
            {message && <p style={{color:"red"}}>{message}</p>}

            <from onSubmit={handleSubmit}>
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

            </from>
        </div>
    );
}

export default SignUp;