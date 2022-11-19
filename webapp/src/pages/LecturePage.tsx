import lectureVid from "../static/dl_math_intro.mp4"
import './LecturePage.scss'
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from "react";

const LecturePage = () => {
    const [query, setQuery] = useState('')
    const [outline, setOutline] = useState<any[]>([])

    const handleChange = (event: any) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log(query)
    }

    const fetchOutline = () => {
        setOutline([
            {'timestamp': 0, 'title': 'Introduction'},
            {'timestamp': 64, 'title': 'Linear Algebra'},
            {'timestamp': 280, 'title': 'Calculus'},
            {'timestamp': 589, 'title': 'Probability'},
            {'timestamp': 1000, 'title': 'Optimization'},
            {'timestamp': 1200, 'title': 'Convex Optimization'},
            {'timestamp': 1400, 'title': 'Linear Optimization'},
            {'timestamp': 1600, 'title': 'Duality'},
            {'timestamp': 1800, 'title': 'Convex Sets'},
            {'timestamp': 2000, 'title': 'Convex Functions'},
        ])
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
               <video src={lectureVid} controls/>
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
                    iosihiohdo
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
