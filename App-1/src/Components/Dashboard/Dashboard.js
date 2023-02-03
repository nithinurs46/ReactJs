import { Typography } from '@mui/material';
import { Fragment } from 'react';
import News from '../News/News';
import DateTime from './DateTime';
import Quotes from './Quotes';
import Alert from 'react-bootstrap/Alert';
import AuthContext from '../../context/auth-context';
import { useContext } from 'react';

const Dashboard = () => {
    const authCtx = useContext(AuthContext);
    const user = authCtx.userName.split('@')[0];
    return (
        <Fragment>
            <Alert variant="secondary">
                <Alert.Heading className="text-center" style={{ fontSize: 17 }}>
                    Hey, {user} nice to see you...
                    <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                        <DateTime />
                    </div>
                </Alert.Heading>
                <hr />
                <p className="mb-0">

                    <Quotes />
                </p>
            </Alert>
            <Typography variant="h5" gutterBottom>
                Headlines
            </Typography>
            <News />
        </Fragment>
    );
}

export default Dashboard;