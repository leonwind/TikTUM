import lectureVid from "../static/dl_math_intro.mp4"
import './LecturePage.scss'
import { Button, TextField } from '@mui/material';
import { LegacyRef, useEffect, useRef, useState } from "react";

const LecturePage = () => {
    const videoRef = useRef<any>();
    const [videoTime, setVideoTime] = useState(0);
    const [query, setQuery] = useState('')
    const [outline, setOutline] = useState<any[]>([])
    const [resutl, setResult] = useState<any[]>([])

    const handleChange = (event: any) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event: any) => {
        // fetch(`http://127.0.0.1:5000/lecture/id/search/${query}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setOutline(data['outline'])
        //     }
    }

    const fetchOutline = () => {
        fetch('http://127.0.0.1:5000/lecture/id/outline')
            .then(response => response.json())
            .then(data => setOutline(data))
            .catch(error => console.log(error))
    }

    const handleProgress = (event: any) => {
        if (isNaN(event.target.duration)) 
            setVideoTime(0);
        setVideoTime(event.target.currentTime);
    }

    const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

    const secondsToHMinSec = (seconds: number) => {
        let hours = zeroPad(Math.floor(seconds / 3600), 1)
        let minutes = zeroPad(Math.floor((seconds % 3600) / 60), 2)
        let secondss = zeroPad(Math.floor(seconds % 60), 2)
        return `${hours}:${minutes}:${secondss}`
    }

    useEffect(() => {
        fetchOutline()
    }, [])

    return (
        <div className="LecturePage">
            <div className="LecturePage__video">
               <video 
                src={lectureVid} 
                ref={videoRef}
                onProgress={handleProgress}
                controls
                />
            </div>

            <div className="LecturePage__content">
                <div className="LecturePage__outline">
                    {outline.map((item, index) => (
                        <div className="LecturePage__outline__item" key={index}>
                            <div className="time">{secondsToHMinSec(item['timestamp'])}</div>
                            <div className="title">{item['title']}</div>
                        </div>
                    ))}
                </div>
                <div className="LecturePage__result">
                    {videoTime}
                </div>
                <div className="LecturePage__search">
                    <TextField 
                        fullWidth 
                        value={query} 
                        onChange={handleChange} 
                        placeholder="query lecture transcript..." 
                        size='small'
                        className='LecturePage__search__field'
                    />
                    <Button 
                        variant="contained"
                        className='LecturePage__search__button'
                        onClick={handleSubmit}
                    >send</Button>
                </div>
            </div>
        </div>
    )
}

export default LecturePage
