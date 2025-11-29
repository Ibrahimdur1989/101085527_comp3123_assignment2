import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL;


function EmployeeAdd(){

    const {id} = useParams;
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

    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try{
                const res = await axios.get(`${API}/emp/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const emp =res.data;
                setFormData({
                    employee_id: emp.employee_id || "",
                    first_name: emp.first_name || "",
                    last_name: emp.last_name || "",
                    email: emp.email || "",
                    department: emp.department || "",
                    position: emp.position || "",
                    salary: emp.salary || ""
                });

            } catch(err) {
                console.error("Error fetching employee:", err);
                setError("Failed to load employee details.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id, token]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0] || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try{
            const data = new FormData();
            data.append("employee_id", formData.employee_id);
            data.append("first_name", formData.first_name);
            data.append("last_name", formData.last_name);
            data.append("email", formData.email);
            data.append("department", formData.department);
            data.append("position", formData.position);
            data.append("salary", formData.salary);

            if (profileImage){
                data.append("profileImage", profileImage);
            }

            await axios.put(`${API}/emp/employee/${id}`, data, {
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            setMessage("Employee update successfully!");
            setTimeout(() => navigate("/employees"), 1500);

        } catch (err){
            console.error("Error updating employee:", err);
            setError(
                err.response?.data?.error ||
                "Failed to update employee."
            );
        }
    };

    if (loading) {
        return <p style={{textAlign: "center", marginTop: "30px"}}>Loading...</p>;
    }


    return(
        <div style={{maxWidth: "500px", margin: "30px auto"}}>

            <h2>Edit Employee</h2>

            {error && <p style={{color:"red"}}>{error}</p>}
            {message && <p style={{color:"green"}}>{message}</p>}

            <form onSubmit={handleSubmit}>

                <div style={{marginBottom: "10px"}}>
                    <label>Employee ID</label>
                    <input 
                        type="text" 
                        name="employee_id" 
                        className="form-control" 
                        value={formData.employee_id} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>First Name</label>
                    <input 
                        type="text" 
                        name="first_name" 
                        className="form-control" 
                        value={formData.first_name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        name="last_name" 
                        className="form-control" 
                        value={formData.last_name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>Department</label>
                    <input 
                        type="text" 
                        name="department" 
                        className="form-control" 
                        value={formData.department} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>Position</label>
                    <input 
                        type="text" 
                        name="position" 
                        className="form-control" 
                        value={formData.position} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>Salary</label>
                    <input 
                        type="number" 
                        name="salary" 
                        className="form-control" 
                        value={formData.salary} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>Profile Picture</label>
                    <input 
                        type="file" 
                        name="profileImage" 
                        className="form-control"  
                        onChange={handleFileChange} 
                        accept="image/*"
                    />
                </div>

                
                <button className="btn btn-primary" type="submit">
                    Update Employee
                </button>

            </form>

        </div>
    );
}

export default EmployeeAdd;