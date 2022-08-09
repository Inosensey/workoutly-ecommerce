import { GraphQLClient } from "graphql-request";
const graphcmstoken = process.env.GRAPHCMS_TOKEN;

export const GraphCmsApi = new GraphQLClient(
  "https://api-ap-northeast-1.hygraph.com/v2/cl4zjegzn08ls01umbq7m9fxt/master",
  {
    headers: {
      authorization: `Bearer ${graphcmstoken}`,
    },
  }
);
