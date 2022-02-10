import React, { useEffect } from "react";
import { HackathonService } from "../service/Service";

const Home = () => {
    const [hackathon, setHackathon] = React.useState([]);

    useEffect(() => {
        HackathonService.getAll().then(data => setHackathon(data));
    }, []);

    return(
        <div>
            {hackathon.map(hack => JSON.stringify(hack))}
        </div>
    )
}

export default Home;