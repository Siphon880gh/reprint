import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, CardColumns, Container } from 'react-bootstrap';
import { GET_SINGLE_CARD } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

export function NoftCard() {
  let { title } = useParams();
  const { loading, data } = useQuery(GET_SINGLE_CARD, {
    variables: { title }
  });
  const singleReprint = data?.reprint || {};

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title ><Card.Link href={`/post/${singleReprint.title}`}>{singleReprint.title}</Card.Link></Card.Title>
        <Card.Img variant="top" src={singleReprint.asset} />
        <Card.Text><span role="img" aria-label="like emoji">👍</span>{singleReprint.likeCount}<span role="img" aria-label="comment emoji" >💬</span>{singleReprint.commentCount}</Card.Text>
        <Card.Text>NoFT Author: <Card.Link href={`/profile/${singleReprint.author}`}>{singleReprint.author}</Card.Link> </Card.Text>
        <Button variant="primary">Download</Button>
      </Card.Body>
    </Card>
  );
};

export default NoftCard;






