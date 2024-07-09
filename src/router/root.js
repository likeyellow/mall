import {Suspense, lazy} from "react";
//import { createBrowserRouter } from "react-router-dom";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import jqueryRouter from "./jqueryRouter";
import memberRouter from "./memberRouter";
import { loginGet } from "../api/memberApi";

const {createBrowserRouter} = require("react-router-dom");

const Loading = <div>Loading....</div>

const Main = lazy(() => import("../pages/MainPage"))
const About = lazy(() => import("../pages/AboutPage"))
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))
const ProductsIndex = lazy(() => import("../pages/products/IndexPage"))
const JqueryTest = lazy(() => import("../pages/jquery/JqueryPage"))

const root = createBrowserRouter([

    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About/></Suspense>
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex/></Suspense>,
        children: todoRouter()
    },
    {
        path: "products",
        element: <Suspense fallback={Loading}><ProductsIndex/></Suspense>,
        children: productsRouter()
    },
    {
        path: "jquery",
        element: <Suspense fallback={Loading}><JqueryTest/></Suspense>,
        children: jqueryRouter()
    },
    {
        path: "member",
        children: memberRouter()
    },
    {
        path: "member/login",
        element: <Suspense fallback={Loading}>{loginGet()}</Suspense>
    }

])

export default root;