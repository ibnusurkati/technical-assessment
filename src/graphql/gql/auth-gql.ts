import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

export const ACCOUNT_DETAIL = gql`
  query MyProfile {
    myProfile {
      id
      name
      avatar
    }
  }
`;
