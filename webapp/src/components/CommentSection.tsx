import React, {useState, useEffect, useRef} from 'react'
import './CommentSection.scss'
import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type CommentSectionProps = {
    onClose: () => void
}

const CommentSection = ({onClose}: CommentSectionProps) => {
    const [collapsed, setCollapsed] = useState(true)
    const [userComments, setUserComments] = useState([])
    const [comment, setComment] = useState('')
    const commentSectionRef = useRef<any>()

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
                setTimeout(() => {
                    commentSectionRef.current.scrollTop += 100000000
                }, 50)
            })
            .catch(error => console.log(error))
    }

    const postComment = (user: string, comment: string) => {
        setComment('')
        setUserComments([...userComments, {"username": user, "comment": comment} as never])
        fetch('http://127.0.0.1:5000/video/id/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${user}&comment=${comment}`
        }).then(
            _ => {
                fetchComments()
            }
        ).catch(error => console.log(error))
    }

    
    const handleSubmit = (event: any) => {
        event.preventDefault()
        if (comment !== '') {
            postComment('student', comment)
        }
        setTimeout(() => {
            commentSectionRef.current.scrollTop += 100000000
        }, 50)
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div className="CommentSection" ref={commentSectionRef}>
            <main>
                <div className='CommentSection__header'>
                    <h3>Comments</h3>
                    <CloseIcon onClick={onClose} />
                </div>
                <div className="CommentSection__comments">
                    {userComments.map((comment: any, index: number) => (
                        <div className={`CommentSection__comment ${comment['username'] === 'TutorBot' ? 'highlight' : ''}`} key={index}>
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
            </main>
        </div>    
    )
}

export default CommentSection
