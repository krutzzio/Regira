import { useEffect, useState } from "react"
import { Comment, CommentContainer } from "../../types"
import UserTag from "../User/UserTag"

export default function Comments(props: CommentContainer) {

    const { issueId } = props
    const API_COMMENT = `/api/comments/issue/${issueId}`

    const [comment, setComment] = useState<string>("")
    const [comments, setComments] = useState<Comment[]>([])

    const handleComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }

    const createComment = () => {
        if (!comment) return
        fetch(API_COMMENT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ desc: comment }),
            credentials: "include"
        })
            .then(resp => resp.json())
            .then(data => {
                if (data) {
                    fetch(API_COMMENT, {
                        credentials: "include"
                    })
                        .then(resp => resp.json())
                        .then(data => {
                            setComments(data)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
        setComment("")
    }

    useEffect(() => {
        fetch(API_COMMENT, {
            credentials: "include"
        })
            .then(resp => resp.json())
            .then(data => {
                setComments(data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <section>
            <h1 className='text-xl font-medium italic'>Comments</h1>
            <article>
                <textarea className='w-full p-2 resize-none rounded' onChange={handleComment} value={comment} placeholder="Write a comment..." rows={4} maxLength={1000} name="comment" id="commentId" />
                {
                    comment &&
                    <button onClick={createComment} className="bg-[#887b6e] hover:bg-[#72655c] text-white transition-colors p-1 rounded">Create comment</button>
                }
            </article>
            <article>
                {
                    comments.map(comment => <div key={comment.id}>
                        <UserTag id={comment.UserId} />
                        {comment.desc}
                    </div>)
                }
            </article>

        </section>
    )
}