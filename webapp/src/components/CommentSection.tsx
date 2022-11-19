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
        fetch('http://localhost:3000/comments')
            .then(response => response.json())
            .then(data => {
                setUserComments(data['comments'])
            })
            .catch(error => console.log(error))
    }

    const postComment = (user: string, comment: string) => {
        fetch('http://localhost:3000/comments', {
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

    return (
        <div className="CommentSection">
            <main>
                <div className="CommentSection__header" onClick={handleCommentToggle}>
                    <h3>Comments</h3>
                    <UnfoldMoreIcon />
                </div>

                {collapsed !== true && (<>
                    <div className="CommentSection__comments">
                        <div className="CommentSection__comment">
                            <div className="CommentSection__comment__username">
                                ein user
                            </div>
                            <div className="CommentSection__comment__text">
                                wtf
                            </div>
                        </div>

                        <div className="CommentSection__comment">
                            <div className="CommentSection__comment__username">
                                anderer user
                            </div>
                            <div className="CommentSection__comment__text">
                                omg. soo geil xD
                            </div>
                        </div>
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
                </>)}
            </main>
        </div>
    )
}

export default CommentSection
