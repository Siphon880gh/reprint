import gql from 'graphql-tag';

// TODO: Add more graphQL executions on the client UI side. 
// Try the query/mutations at http://localhost:3001/graphql before adding them here.

export const TRENDING_REPRINTS = gql`
query {
  trending {
    _id
    asset
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

export const GOOGLE_CLOUD_AUTH = gql`
query {
  googleCloudAuth
}`;

export const GOOGLE_CLOUD_STORAGE = gql`
query {
  googleCloudStorage
}`;