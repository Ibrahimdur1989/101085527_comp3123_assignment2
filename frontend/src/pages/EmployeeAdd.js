import React, {useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL;


function EmployeeAdd(){

    const navigate = useNavigate();
    const {token} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        employee_id: "",
        first_name: "",
        last_name: "",
        email: "",
        department: "",
        position: "",
        salary: ""
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
            const payload = {
                employee_id: formData.employee_id,
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                department: formData.department,
                position: formData.position,
                salary: formData.salary,

                date_of_joining: new Date().toISOString().split("T")[0]
            };

            await axios.post(`${API}/emp/employees`, payload, {
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            });

            setMessage("Employee added successfully!");
            setTimeout(() => navigate("/employees"), 1500);

        } catch (err){
            console.error("Error adding employee:", err.response?.data || err.message);
            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Failed to add employee."
            );
        }
    };


    return(
        <div className="page-center">
            <div className="form-card-large">

                <h2 className="form-title">Add New Employee</h2>

                {error && <div className="alert-error">{error}</div>}
                {message && <div className="alert-success">{message}</div>}

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="form-group">
                        <label>Employee ID</label>
                        <input 
                            type="text" 
                            name="employee_id" 
                            className="input-box" 
                            value={formData.employee_id} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>First Name</label>
                        <input 
                            type="text" 
                            name="first_name" 
                            className="input-box" 
                            value={formData.first_name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            name="last_name" 
                            className="input-box" 
                            value={formData.last_name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="input-box" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <input 
                            type="text" 
                            name="department" 
                            className="input-box" 
                            value={formData.department} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Position</label>
                        <input 
                            type="text" 
                            name="position" 
                            className="input-box" 
                            value={formData.position} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Salary</label>
                        <input 
                            type="number" 
                            name="salary" 
                            className="input-box" 
                            value={formData.salary} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    
                    <button className="btn btn-primary btn-center" type="submit">
                        Add Employee
                    </button>

                </form>

            </div>
        </div>
    );
}

export default EmployeeAdd;