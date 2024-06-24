import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>
const UploadList = lazy(() => import("../pages/jquery/JqueryPage"))

const jqueryRouter = () => {
    return [
        {
            path: "display",
            element: <Suspense fallback={Loading}><UploadList/></Suspense>
        },
        {
            path: "",
            element: <Navigate replace to="/jquery/display" />
        },
        // {
        //     path: "read/:tno",
        //     element: <Suspense fallback={Loading}><TodoRead/></Suspense>
        // },
        // {
        //     path: "add",
        //     element: <Suspense fallback={Loading}><TodoAdd/></Suspense>
        // },
        // {
        //     path: "modify/:tno",
        //     element: <Suspense fallback={Loading}><TodoModify/></Suspense>
        // }
    ]
}

export default jqueryRouter;