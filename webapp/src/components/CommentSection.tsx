import React, {useState, useEffect} from 'react'
import './CommentSection.scss'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Button, TextField } from '@mui/material';


const CommentSection = () => {
    const [collapsed, setCollapsed] = useState(true)
    const [userComments, setUserComments] = useState([])
    const [comment, setComment] = useState('')

    const handleCommentToggle = (event: any) => {
        setCollapsed(!collapsed)
    }

    const handleChange = (event: any) => {
        setComment(event.target.value);
    }

    const fetchComments = () => {
        fetch('http://127.0.0.1:5000/video/id/comments')
            .then(response => response.json())
            .then(data => {
                setUserComments(data['comments'])
            })
            .catch(error => console.log(error))
    }

    const postComment = (user: string, comment: string) => {
        fetch('http://127.0.0.1:5000/video/id/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${user}&comment=${comment}`
        }).then(
            _ => {
                setComment('')
                fetchComments()
            }
        ).catch(error => console.log(error))
    }

    
    const handleSubmit = (event: any) => {
        event.preventDefault()
        postComment('student', comment)
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div className="CommentSection">

                    <div className="CommentSection__comments">
                        {userComments.map((comment: any) => (
                            <div className="CommentSection__comment">
                                <div className="CommentSection__comment__username">
                                    {comment['username']}
                                </div>
                                <div className="CommentSection__comment__text">
                                    {comment['comment']}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="CommentSection__input">
                        <TextField 
                            fullWidth 
                            value={comment} 
                            onChange={handleChange} 
                            placeholder="comment..." 
                            size='small'
                            className='CommentSection__input__field'
                        />
                        <Button 
                            variant="contained"
                            className='CommentSection__input__button'
                            onClick={handleSubmit}
                        >send</Button>
                    </div>
        </div>
    )
}

export default CommentSection
