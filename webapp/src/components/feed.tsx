import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { MediaCard } from './content';
import SelectInput from '@mui/material/Select/SelectInput';
import styles from "../styles/feed.module.css";


export default function Feed() {

  const conts = [1, 2, 3, 4, 5, 6, 7];
  // const contRefs = React.useMemo(
  //   () => conts.map(() => React.createRef()), 
  //   [conts]
  // );

  return (
    <Stack
        className={styles.container}
        dir="ltr">
      {conts.map(el =>
          <MediaCard />
      )}
    </Stack>
  );
}