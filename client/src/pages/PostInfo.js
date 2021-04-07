import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';

// PostInfo same level components
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import LikeIcon from '../assets/likeArrowBoxIcon.png';

// PostInfo Component dependencies
import Auth from '../utils/auth';
import { GET_SINGLE_CARD } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

// Subcomponents
import Likes from '../components/Like';
import FavoriteButton from '../components/FavoriteButton';

// Get favorite Ids to compare against post to see if favorite (placed here instead of inside FavoriteButton to workaround Reacth render limit error)
import { GET_ME, MY_FAVORITES } from "../utils/queries";

// Create a const for postForm that'll return JSX
export function PostInfo() {
    // Get post info
    let { noftId } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_CARD, {
        variables: { noftId: noftId }
    });
    const singleReprint = data?.reprintById || {};

    // User's favorite Ids. Return empty array if not logged in
    let {data:favoritesData} = useQuery(MY_FAVORITES);
    let favoritesList = favoritesData?.myFavorites?.favorites || [];
    let favoritedIds = favoritesList.map(favObj=>favObj._id);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Return JSX
    return (
        <div>
            <section>
                <h1>{singleReprint.title}</h1>
            </section>

            <Image src={singleReprint.asset} fluid />

            <Card>
                <Card.Body>{singleReprint.caption}</Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title><Card.Link href={`/profile/${singleReprint.author}`}>{singleReprint.author}</Card.Link></Card.Title>
                    <Card.Title><Card.Link href={`${singleReprint.marketListing}`}>{singleReprint.marketListing}</Card.Link></Card.Title>
                    <Card.Title>{singleReprint.caption}</Card.Title>
                    <Likes singleReprint={singleReprint} noftId={noftId}></Likes>
                    <Card.Title>{singleReprint.likeCount}</Card.Title>
                    {Auth.loggedIn() && (
                        <FavoriteButton noftId={noftId} favoritedIds={favoritedIds}></FavoriteButton>
                    )}
                </Card.Body>
            </Card>


            {singleReprint.commentCount > 0 && <CommentList comments={singleReprint.comments} />}

            {Auth.loggedIn() && <CommentForm reprintId={singleReprint._id} />}
        </div>
    );
};

export default PostInfo;