import { BlankLayout } from "../components/layout/blankLayout/BlankLayout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

const authRouter = [
    { path: "/home", component: Home, layout: null },
]

const publicRouter = [
    { path: "/login", component: Login, layout: BlankLayout },
]

export { authRouter, publicRouter }