import MainNavigation from "../Components/MainNavigation";
import { useRouteError } from 'react-router-dom';
import PageContent from '../Components/PageContent';

function ErrorPage() {
    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong!, status code: '+error.status;

    if (error.status === 500) {
        message = error.data.message+' , status code: '+error.status;
    }

    if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page, status code: '+error.status;
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}

export default ErrorPage;