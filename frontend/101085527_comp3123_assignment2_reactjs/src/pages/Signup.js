import React, {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Signup(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try{
            console.log("API URL =", API);
            const res = await axios.post(`${API}/user/signup`, formData);

            console.log("Signup success:", res.data);
            setMessage("Signup successful!");
            setTimeout(() => navigate("/login"), 1500);
        } catch(err){
            console.error("Signup error:", err.response?.data || err.message);
            const msg =
                err.response?.data?.message || 
                err.response?.data?.error || 
                "Signup failed.";
            setError(msg);
        }
    };


    return(
        <div className="page-center">
            <div className="form-card">
                <h1 className="form-title">Create Account</h1>

                {error && <div className="alert-error">{error}</div>}
                {message && <div className="alert-success">{message}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="username"
                            className="input-box" 
                            placeholder="Username"
                            value={formData.username} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="email" 
                            name="email"
                            className="input-box" 
                            placeholder="Email Address"
                            value={formData.email}  
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            name="password" 
                            className="input-box"
                            placeholder="Password"
                            value={formData.password}  
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-center">
                        Sign Up
                    </button>

                </form>

                <p className="auth-footer-text">
                    Already have an account?{" "}
                    <Link to="/login" className="link">Login</Link>
                </p>
            </div>
        </div>
        
    );
}

export default Signup;