import React from 'react';
import { Card, Button, CardColumns, Container } from 'react-bootstrap';
import { GET_STREAM } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

export function NoftCard() {
  const { data } = useQuery(GET_STREAM);
  let reprint = data.stream;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{reprint.title}</Card.Title>
        <Card.Img variant="top" src={reprint.asset} />
        <Card.Text><Card.Link href="#"><span>👍</span>{reprint.likeCount}</Card.Link><Card.Link href="#"><span>💬</span>{reprint.commentCount}</Card.Link></Card.Text>
        <Card.Text>NoFT Author: <Card.Link href="#">{reprint.author}</Card.Link> </Card.Text>
        <Button variant="primary">Download</Button>
      </Card.Body>
    </Card>
  );
};

export default NoftCard;






