import React, {useState, useContext} from "react";
import axios from "axios";
import { AuthContext} from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login(){


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8080/login", {
                email,
                password
            });

            login(response.data.token);

            navigate("/employees");
        } catch(err) {
            setError("Invalid credentials. Please try again.");
        }
    };


    return (
        <div style={{maxWidth:"400px", margin: "50px auto"}}>
            <h2>Login</h2>

            {error && <p style={{color:"red"}}>{error}</p>}

            <form onSubmit={handleSubmit}>

                <div style={{marginBottom: "10px"}}>
                    <label>Email</label>
                    <input 
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required
                    />
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Login
                </button>

                <div style={{marginTop: "10px"}}>
                    <Link to="/signup">Create an account</Link>
                </div>
                

            </form>
        </div>
    );
}

export default Login;