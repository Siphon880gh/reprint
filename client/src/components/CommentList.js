import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {

    return (<React.Fragment>
        <div>
            <section>
                <h2>Comments</h2>
            </section>
            <section >
                {comments &&
                    comments.map(comments => (
                        <p key={comments._id}>
                            {comments.commentBody} //{' '}
                            <Link to={`/profile/${comments.author}`} style={{ fontWeight: 700 }}>
                                {comments.author}</Link> on {comments.createdAt}

                        </p>
                    ))}
            </section>
        </div>

    </React.Fragment>);
};

export default CommentList;