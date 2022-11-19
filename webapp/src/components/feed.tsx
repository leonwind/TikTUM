import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { MediaCard } from './content';
import SelectInput from '@mui/material/Select/SelectInput';
import matvecVid from '../static/matvec.mp4';
import matmatVid from '../static/matmat.mp4';
import hadamardVid from '../static/hadamard.mp4';
import planetEarth from '../static/dl-matrix-vector-attenborough.mp4';


export default function Feed() {

  const conts = [matmatVid, matvecVid, hadamardVid, planetEarth];
  // const contRefs = React.useMemo(
  //   () => conts.map(() => React.createRef()), 
  //   [conts]
  // );

  return (
    <Stack
      onScroll={(e) => console.log("scroll")}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
    >
      {conts.map((video, idx) =>
        <Box
          // ref={contRefs[i]}
          key={idx}
          sx={{
            border: '3px solid black'
          }}
          margin="0"
          padding="0"
          alignItems="center"
          display="flex"
          justifyContent="center"
          height="100vh"
          width="100vw"
          maxWidth="600px"
        >
          <MediaCard video={video}/>
        </Box>
      )}
    </Stack>
  );
}