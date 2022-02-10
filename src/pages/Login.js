import React from "react";

import { Button, Link, TextField } from "@mui/material";
import { UserService } from "../service/Service";

const Login = () => {
    const [employeeID, setEmployeeID] = React.useState("");

    const submit = (event) => {
        event.preventDefault();
        UserService.getByField("EmployeeID", employeeID).then(data => console.log(data));
    }

    return (
        <form onSubmit={submit}>
            <TextField id="employeeID" value={employeeID} variant="outlined" label="Employee ID" required onChange={(event) => setEmployeeID(event.target.value)} />
            <Button id="submit" variant="contained" color="primary" type="submit">Login</Button>
            <Link href="signup" >Sign Up</Link>
        </form>
    )
}

export default Login;