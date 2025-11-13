import React from "react";
import { FaTasks } from "react-icons/fa";
import "../styles/NoTasks.css"
function Notasks() {
    return (
        <div className="no-tasks">
            <FaTasks className="no-tasks-icon" />
            <h3>No Tasks Found</h3>
        </div>
    )
}

export default Notasks;