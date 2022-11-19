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
import styles from '../styles/feed.module.css';


export default function Feed() {

  const conts = [matmatVid, matvecVid, hadamardVid, planetEarth];
  // const contRefs = React.useMemo(
  //   () => conts.map(() => React.createRef()), 
  //   [conts]
  // );

  return (
    <Stack
        className={styles.container}
        dir="ltr"
    >
      {conts.map((video, idx) =>
          <MediaCard key={idx} video={video}/>
      )}
    </Stack>
  );
}