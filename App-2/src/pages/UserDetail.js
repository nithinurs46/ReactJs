import { useLoaderData, useRouteLoaderData, json, redirect } from 'react-router-dom';
import UserItem from '../Components/UserItem';

const UserDetailPage = ()=>{
    //const user = useLoaderData();
    const data = useRouteLoaderData('user-detail');
    return <UserItem user={data} />;
}

export default UserDetailPage;
export async function loader({request, params}) {
  const userId = params.userId;
  //https://jsonplaceholder.typicode.com/users/1
  const response = await fetch('http://localhost:5000/users/'+userId);
  if (!response.ok) {
      throw json(
          { message: 'Could not fetch users.' },
          {
              status: 500,
          }
      );
  } else {
      return response;
  }
}

export async function action({ params, request }) {
    const userId = params.userId;
    const response = await fetch('http://localhost:5000/users/' + userId, {
      method: request.method,
    });
  
    if (!response.ok) {
      throw json(
        { message: 'Could not delete user.' },
        {
          status: 500,
        }
      );
    }
    return redirect('/users');
  }
