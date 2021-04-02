import React from 'react';
import { Card, Button } from 'react-bootstrap';

export function NoftCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Noft Title</Card.Title>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Text>This is a caption of the stuff you wanna say!
    </Card.Text>
        <Card.Text><Card.Link href="#">👍2</Card.Link><Card.Link href="#">💬5</Card.Link></Card.Text>
        <Card.Text>NoFT Author: <Card.Link href="#">Username</Card.Link> </Card.Text>
        <Button variant="primary">Download</Button>
      </Card.Body>
    </Card>
  )
};






