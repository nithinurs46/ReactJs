import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from 'react';
import AuthContext from '../context/auth-context';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const RootLayout = () => {
    const location = useLocation();
    const authCtx = useContext(AuthContext);
    const excludePaths = ['/login', '/register'];
    const normalizePath = (path) => path.replace(/\/$/, '');
    const isExcludedPage = excludePaths.includes(normalizePath(location.pathname));
    const navigate = useNavigate();

    const LogoutHandler = () => {
        authCtx.logout();
        navigate('/login', { replace: true });
    }

    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const UserHandler = () => {
        setOpen(true);
        fetch('https://jsonplaceholder.typicode.com/users/4')
            .then(response => response.json())
            .then(data => setUser(JSON.stringify(data)))
    }

    return (
        <>
            {!isExcludedPage && (
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Todo
                            </Typography>
                            <p>Logged in as {authCtx.userName}</p>
                            <Button color="inherit" onClick={UserHandler}>User</Button>
                            <Button color="inherit" onClick={LogoutHandler}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                    <div>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    User information
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {user}
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                </Box>

            )}
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;