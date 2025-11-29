import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function EmployeeList() {

    const {token} = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);

    const [searchDept, setSearchDept] = useState("");
    const [searchPosition, setSearchPosition] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API}/emp/employees`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
            setEmployees(res.data);
        })
        .catch((err) => {
            console.log("Error fetching employees:", err);
        });
    }, [token]);


    const handleSearch = () => {
        axios.get(`${API}/emp/employees/search`, {
            params: {
                department: searchDept,
                position: searchPosition
            },
            headers: {
                    "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
            setEmployees(res.data);
        })
        .catch((err) =>{
            console.log("Search error:", err)
        })
    };


    const handleView = (id) => {
        navigate(`/employees/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/employees/${id}/edit`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if(!confirmDelete) return;

        try{
            await axios.delete(`${API}/emp/employees`, {
                params: {eid:id},
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        } catch(err) {
            console.log("Error deleting employee:", err);
            alert("Failed to delete employee.");
        }
    };



    return(
        <div style={{padding: "20px"}}>
            <h2>Employee List</h2>

            <button 
            className="btn btn-success" 
            style={{marginBottom:"10px"}} 
            onClick={() => navigate("/employees/add")}>
                Add Employee
            </button>

            <div style={{marginBottom: "20px"}}>
                <input
                    type="text"
                    placeholder="Search by Department"
                    value={searchDept}
                    onChange={(e) => setSearchDept(e.target.value)}
                    style={{marginRight: "10px"}}
                    className="form-control"
                />

                <input
                    type="text"
                    placeholder="Search by Position"
                    value={searchPosition}
                    onChange={(e) => setSearchPosition(e.target.value)}
                    style={{marginRight: "10px", marginTop: "10px"}}
                    className="form-control"
                />

                <button className="btn btn-primary" style={{marginTop: "10px"}} onClick={handleSearch}>
                    Search
                </button>

            </div>

            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp.employee_id}</td>
                            <td>{emp.first_name} {emp.last_name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.department}</td>
                            <td>{emp.position}</td>
                            <td>
                                <button className="btn btn-sm btn-info" 
                                        style={{marginRight:"5px"}} 
                                        onClick={() => handleView(emp._id)}>                                    
                                    View
                                </button>

                                <button className="btn btn-sm btn-warning" 
                                        style={{marginRight:"5px"}} 
                                        onClick={() => handleEdit(emp._id)}>                                    
                                    Edit
                                </button>

                                <button className="btn btn-sm btn-danger" 
                                        onClick={() => handleDelete(emp._id)}>                                    
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default EmployeeList;