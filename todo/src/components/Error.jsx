import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    let title = 'An error occurred with status code '+ error.status;
    let message = 'Error message: '+error.data;
    
    return (
        <>
            <p>{title}</p>
            <p>{message}</p>
        </>
    );
}

export default ErrorPage;