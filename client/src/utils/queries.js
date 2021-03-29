import gql from 'graphql-tag';

export const TRENDING_REPRINTS = gql`
query {
  trending {
    Post {
      _id,
      url
    }
  }
}`;

export const GET_ME = gql`
query {
  me {
    _id
    username
    email
  }
}`;