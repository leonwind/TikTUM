import lectureVid from "../static/lecture_small.mp4"
import './LecturePage.scss'
import { Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const LecturePage = () => {
    const videoRef = useRef<any>();
    const [videoTime, setVideoTime] = useState(0);
    const [query, setQuery] = useState('')
    const [outline, setOutline] = useState<any[]>([])
    const [result, setResult] = useState<any>([])
    const resultsRef = useRef<any>()

    const handleChange = (event: any) => {
        setQuery(event.target.value);
    }

    const handleProgress = (event: any) => {
        if (isNaN(event.target.duration)) {
            setVideoTime(0)
            return
        }
        setVideoTime(event.target.currentTime)
    }

    const makeSeekFunction = (time: number) => {
        return () => {
            videoRef.current.currentTime = time
            setVideoTime(time)
        }
    }

    const highlightText = (data: any, query: string) => {
        for (let i = 0; i < data.length; i++) {
            let text = data[i].text
            let index = text.toLowerCase().indexOf(query.toLowerCase())
            if (index !== -1) {
                data[i].text = text.slice(0, index) + "<mark>" + text.slice(index, index + query.length) + "</mark>" + text.slice(index + query.length)
            }
        }
        return data
    }


    const handleSubmit = (event: any) => {
        fetch(`http://127.0.0.1:5000/lecture/id/search/${query}`)
            .then(response => response.json())
            .then(data => {
                setResult(highlightText(data, query))
                setQuery('')
                setTimeout(() => {
                    resultsRef.current.scrollIntoView({behavior: "smooth"})
                    console.log(resultsRef.current)
                }, 50)
            }
    )}

    const fetchOutline = () => {
        fetch('http://127.0.0.1:5000/lecture/id/outline')
            .then(response => response.json())
            .then(data => setOutline(data))
            .catch(error => console.log(error))
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
                <video controls ref={videoRef} onProgress={handleProgress}>
                    <source src={lectureVid} type="video/mp4" />
                    <track
                        label="English"
                        kind="captions"
                        src="/result_full.vtt"
                        srcLang="en"
                        default 
                    />
                </video>
            </div>

            <div className="LecturePage__content">
                <div className="LecturePage__outline">
                    <h3>Outline</h3>
                    {outline.map((item, index) => (
                        <div 
                            className="LecturePage__outline__item" 
                            key={index} 
                            onClick={makeSeekFunction(item['timestamp'])
                        }>
                            <div className={`time ${item['timestamp'] <= videoTime ? 'active' : ''}`}>{secondsToHMinSec(item['timestamp'])}</div>
                            <div className="title">{item['title']}</div>
                        </div>
                    ))}
                </div>

                <div className="LecturePage__result" ref={resultsRef}>
                <h3>Search results</h3>
                {result.map((item: any, index: any) => (
                    <Link to='/feed' key={index}>
                        <div className="LecturePage__result__item">
                            <div className="time">
                                <div className="badge">
                                    {secondsToHMinSec(item['timestamp'])}
                                </div>
                            </div>
                            <div
                                className="text"
                                dangerouslySetInnerHTML={{__html: item['text']}}
                            />
                        </div>
                    </Link>
                ))}
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
