import React from "react";

import { Button, Link, TextField } from "@mui/material";
import { UserService } from "../service/Service";

const SignUp = () => {
    const [employeeID, setEmployeeID] = React.useState("");
    const [name, setName] = React.useState("");

    const submit = (event) => {
        event.preventDefault();
        UserService.getByField("EmployeeID", employeeID).then(data => console.log(data));
    }

    return (
        <form onSubmit={submit}>
            <TextField id="employeeID" value={employeeID} variant="outlined" label="Employee ID" required onChange={(event) => setEmployeeID(event.target.value)} />
            <TextField id="name" value={name} variant="outlined" label="Employee ID" required onChange={(event) => setName(event.target.value)} />
            <Button id="submit" variant="contained" color="primary" type="submit">Sign Up</Button>
            <Link href="/home">Go Back</Link>
        </form>
    )
}

export default SignUp;