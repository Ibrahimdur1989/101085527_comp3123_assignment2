import React, {useState, useContext} from "react";
import axios from "axios";
import { AuthContext} from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Login(){


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${API}/user/login`, {
                email,
                password
            });

            login(response.data.jwt_token);

            navigate("/employees");
        } catch(err) {
            setError("Invalid credentials. Please try again.");
        }
    };


    return (
        <div className="page-center">
            <div className="form-card">
                <h1 className="form-title">Login</h1>

                {error && <div className="alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email"
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password"
                            className="input-box"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required
                        />
                    </div>

                    <button className="btn btn-primary btn-center" type="submit">
                        Login
                    </button>

                    <p className="auth-footer-text">
                        Don't have an account?{" "}
                        <Link to="/signup" className="link">Create an account</Link>
                    </p>  

                </form>
            </div>
        </div>
        
    );
}

export default Login;