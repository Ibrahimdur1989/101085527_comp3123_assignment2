import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL;


function EmployeeView() {

    const {id} = useParams;
    const {token} = useContext(AuthContext);

    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployee = async () => {
            try{
                const res = await axios.get(`${API}/emp/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setEmployee(res.data)
            } catch(err) {
                console.error("Error fetching employee:", err);
                setError("Failed to load employee details.");
            }
        };

        fetchEmployee();
    }, [id, token]);

    if (error){
        return <p style={{color: "red", textAlign: "center"}}>{error}</p>;
    }

    if (!employee){
        return <p style={{textAlign: "center", marginTop: "30px"}}>Loading...</p>;
    }

    return(
        <div style={{maxWidth: "500px", margin: "30px auto"}}>
            <h2>Employee Details</h2>

            <p><strong>Employee ID:</strong> {employee.employee_id}</p>
            <p><strong>Full Name:</strong> {employee.first_name} {employee.last_name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>

            {employee.profileImage && (
                <div style={{marginTop: "10px"}}>
                    <strong>Profile Picture</strong>
                    <br />
                    <img 
                        src={employee.profileImage} 
                        alt="Profile"
                        style={{ width: "120px", height: "120px", objectFit: "cover", marginTop: "5px"}} 
                    />
                </div>
            )}

        </div>
    );
}

export default EmployeeView;