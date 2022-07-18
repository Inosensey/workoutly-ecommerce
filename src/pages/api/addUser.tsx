import type { NextApiRequest, NextApiResponse } from "next";
import { GraphCmsApi } from "../../Services/GraphcmsApi";
import { gql } from "graphql-request";

const MUTATION = gql`
mutation CreateUserDetail(
  $email: String!
  $username: String!
  $password: String!
  $member: Boolean!
) {
  createUserDetail(
    data: {
      email: $email
      username: $username
      password: $password
      slug: $username
      member: $member
    }
  ) {
    id
  }
  publishUserDetail(where: { slug: $username }) {
    username
  }
`;

interface props {
  Username: string;
  Email: string;
  password: string;
}

export default async ({ body }: any, res: NextApiResponse) => {
  await GraphCmsApi.request(MUTATION, {
    email: body.email,
    username: body.username,
    password: body.password,
    member: false,
  });
};
