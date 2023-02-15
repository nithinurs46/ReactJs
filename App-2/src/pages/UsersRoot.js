import { Outlet } from "react-router-dom";
import UsersNavigation from "../Components/UsersNavigation";

const UsersRootLayout=()=>{
    return(
        <>
        <UsersNavigation />
        <Outlet />
        </>
    )
}
export default UsersRootLayout;