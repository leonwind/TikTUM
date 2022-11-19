import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import { MediaCard } from './content';
import matvecVid from '../static/matvec.mp4';
import matmatVid from '../static/matmat.mp4';
import hadamardVid from '../static/hadamard.mp4';
import planetEarth from '../static/dl-matrix-vector-attenborough.mp4';
import styles from '../styles/feed.module.css';
import {Footer} from "./footer";
import CommentSection from './CommentSection';

export default function Feed() {

  const conts = [matmatVid, matvecVid, hadamardVid, planetEarth];
  const [showComments, setShowComments] = useState(false);

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  }

  return (
    <div>
      <Stack
          className={styles.container}
          dir="ltr"
      >
        {conts.map((video, idx) =>
            <MediaCard key={idx} video={video} onToggleComments={handleCommentToggle}/>
        )}
      </Stack>
      {showComments && <CommentSection onClose={() => {setShowComments(false)}}/>}
      <Footer/>
    </div>
  );
}