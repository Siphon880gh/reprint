import React from 'react';
import { Card, Button, CardColumns, Container } from 'react-bootstrap';
import { GET_SINGLE_CARD } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

export function NoftCard() {
  const { data } = useQuery(GET_SINGLE_CARD);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{data.reprint.title}</Card.Title>
        <Card.Img variant="top" src={data.reprint.asset} />
        <Card.Text><Card.Link href="#"><span role="img" aria-label="like emoji">👍</span>{data.reprint.likeCount}</Card.Link><Card.Link href="#"><span role="img" aria-label="comment emoji" >💬</span>{data.reprint.commentCount}</Card.Link></Card.Text>
        <Card.Text>NoFT Author: <Card.Link href="#">{data.reprint.author}</Card.Link> </Card.Text>
        <Button variant="primary">Download</Button>
      </Card.Body>
    </Card>
  );
};

export default NoftCard;






