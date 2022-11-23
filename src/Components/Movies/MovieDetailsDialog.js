import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,

  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0.2,
};

export default function MovieDetailsDialog({ selected, closeDetail, modalState }) {
  const genre = selected.Genre.split(', ');
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalState}
        onClose={closeDetail}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState}>
          <Box sx={style}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  <CloseIcon onClick={closeDetail} />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                  {selected.Title}
                </Typography>
              </Toolbar>
            </AppBar>
            <ul>
              <li>
                <blockquote className="blockquote mb-0">
                  <p className="text-left" style={{ fontSize: 15 }}>
                    Title : {selected.Title} &nbsp;
                    <Rating name="read-only" defaultValue={0} value={selected.imdbRating} readOnly max={10} />
                    &nbsp; {selected.imdbVotes} votes
                  </p>
                </blockquote>
              </li>
              <hr />
              <li>
                <blockquote className="blockquote mb-0">
                  <p className="text-left" style={{ fontSize: 15 }}>
                    Plot : {selected.Plot}
                  </p>
                </blockquote>
              </li>
              <hr />
              <li>
                <blockquote className="blockquote mb-0">
                  <p className="text-left" style={{ fontSize: 15 }}>
                    Actors : {selected.Actors}
                  </p>
                </blockquote>
              </li>
              <hr />
              <li>
                <blockquote className="blockquote mb-0">
                  <p className="text-left" style={{ fontSize: 15 }}>
                    Release Date : {selected.Released}
                  </p>
                </blockquote>
              </li>
              <hr />
              <li>
                <blockquote className="blockquote mb-0">
                  <p className="text-left" style={{ fontSize: 15 }}>
                    Director : {selected.Director}
                  </p>
                </blockquote>
              </li>
              <hr />
              <li>
                <Stack spacing={1} alignItems="left">
                  <Stack direction="row" spacing={1}>
                    {genre.map((result) => (
                      <Chip label={result} color="primary" />
                    ))}
                  </Stack>
                </Stack>
              </li>
            </ul>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
