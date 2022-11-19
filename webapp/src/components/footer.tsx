import * as React from 'react';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import { useState } from 'react';
// import logo from "../static/tiktum.png";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  height: 75,
  width: 75,
  left: 0,
  right: 0,
  bottom: 25,
  margin: '0 auto',
});

export const Footer = () => {
    const [showComments, setShowComments] = useState(false);

    return (
    <React.Fragment>
      <Link to='/'>
        <StyledFab color="primary" aria-label="add">
{/*             <img src={logo} alt="logo" width="50px" height="50px"/> */}
            <AutoStoriesIcon />
        </StyledFab>
      </Link>
    </React.Fragment>
  );
}