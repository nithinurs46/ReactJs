import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import UserList from '../Components/UsersList';
const Users = () => {
    const { users } = useLoaderData();
    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={users}>
                {(loadedUsers) => <UserList users={loadedUsers} />}
            </Await>
        </Suspense>
    )
}

export default Users;

async function loadUsers() {
    const response = await fetch('http://localhost:5000/users');
    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch users.' };
        // throw new Response(JSON.stringify({ message: 'Could not fetch users.' }), {
        //   status: 500,
        // });
        throw json(
            { message: 'Could not fetch users.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        return resData;
    }
}

export function loader() {
    return defer({
        users: loadUsers(),
    });
}