import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const routes = [
    {
        path: "/",
        component: Login,
    },
    {
        path: "/signup",
        component: SignUp,
    },
    {
        path: "/home",
        component: Home,
    }
];

export default routes;