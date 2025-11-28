import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function EmployeeList() {

    const {token} = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/api/v1/employees", {
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

    return(
        <div style={{padding: "20px"}}>
            <h2>Employee List</h2>

            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>Emp ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Position</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default EmployeeList;