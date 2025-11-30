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

    
    const getEmployeeId = (emp) => {
        return emp._id || emp._id || emp._id || emp.employee_id
    };

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
            await axios.delete(`${API}/emp/employees/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            setEmployees((prev) => prev.filter((emp) => getEmployeeId(emp) !== id));
            alert("Employee deleted successfully.")
        } catch(err) {
            console.error("Error deleting employee:", err.response?.data || err.message);
            alert("Failed to delete employee.");
        }
    };



    return(
        <div style={{padding: "20px"}}>
            <h2 className="form-title">Employee List</h2>

            <div className="top-bar">            

                <button 
                className="btn btn-success" 
                onClick={() => navigate("/employees/add")}>
                    Add Employee
                </button>

                <div style={{ display: "flex", gap: "10px"}}>
                    <input
                        type="text"
                        placeholder="Search by Department"
                        value={searchDept}
                        onChange={(e) => setSearchDept(e.target.value)}
                        className="input-box search-input"
                    />

                    <input
                        type="text"
                        placeholder="Search by Position"                    
                        value={searchPosition}
                        onChange={(e) => setSearchPosition(e.target.value)}
                        className="input-box search-input"
                    />

                    <button 
                        className="btn btn-primary" 
                        style={{marginTop: "10px", marginLeft: "8px"}} 
                        onClick={handleSearch}>
                        Search
                    </button>

                </div>
            </div>

            <table className="employee-table">
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
                    {employees.map((emp) => {
                        const id = getEmployeeId(emp);

                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{emp.first_name} {emp.last_name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.department}</td>
                                <td>{emp.position}</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm" 
                                            style={{marginRight:"5px"}} 
                                            onClick={() => handleView(id)}>                                    
                                        View
                                    </button>

                                    <button className="btn btn-warning btn-sm" 
                                            style={{marginRight:"5px"}} 
                                            onClick={() => handleEdit(id)}>                                    
                                        Edit
                                    </button>

                                    <button className="btn btn-danger btn-sm" 
                                            onClick={() => handleDelete(id)}>                                    
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        );
                    })}                   
                    
                        
                    
                </tbody>
            </table>
        </div>
    );
}


export default EmployeeList;