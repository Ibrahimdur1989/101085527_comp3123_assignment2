import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL;


function EmployeeView() {

    const {id} = useParams();
    const {token} = useContext(AuthContext);

    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployee = async () => {
            try{
                const res = await axios.get(`${API}/emp/employees/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                });
                setEmployee(res.data)
            } catch(err) {
                console.error("Error fetching employee:", err.response?.data || err.message);
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
        <div className="page-center">
            <div className="form-card-large">
                <h2 className="form-title">Employee Details</h2>

                {error && <div className="alert-error">{error}</div>}
                {!employee && !error && (<p className="details-loading">Loading...</p>)}

                {employee && (
                    <div className="details-list">
                        <div className="details-row">
                            <span className="details-label">Employee ID:</span>
                            <span>{employee.employee_id}</span>
                        </div>

                        <div className="details-row">
                            <span className="details-label">Full Name:</span>
                            <span>{employee.first_name} {employee.last_name}</span>
                        </div>

                        <div className="details-row">
                            <span className="details-label">Email:</span>
                            <span>{employee.email}</span>
                        </div>

                        <div className="details-row">
                            <span className="details-label">Department:</span>
                            <span>{employee.department}</span>
                        </div>

                        <div className="details-row">
                            <span className="details-label">Position:</span>
                            <span>{employee.position}</span>
                        </div>

                        <div className="details-row">
                            <span className="details-label">Salary:</span>
                            <span>{employee.salary}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmployeeView;