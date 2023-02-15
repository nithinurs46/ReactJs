import { useRouteLoaderData } from 'react-router-dom';
import UserForm from '../Components/UserForm';

const EditUserPage=()=>{
    const data = useRouteLoaderData('user-detail');
    return(
        <UserForm user={data} method="PATCH" />
    )
}

export default EditUserPage;