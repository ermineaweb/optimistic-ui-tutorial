import { gql } from "@apollo/client";

export const queryRequest = gql`
  query {
    users {
      id
      username
    }
  }
`;

export const mutationRequest = gql`
  mutation($username: String!) {
    createUser(username: $username) {
      id
      username
    }
  }
`;
