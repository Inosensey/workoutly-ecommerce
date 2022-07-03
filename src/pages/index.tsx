import type { NextPage } from "next";
import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import Nav from "../common/Nav";
import Hero from "../modules/Home/Hero";
import Categories from "../modules/Home/Categories";

// GraphCms
const graphcms = new GraphQLClient(
  "https://api-ap-northeast-1.graphcms.com/v2/cl4zjegzn08ls01umbq7m9fxt/master"
);

const QUERY = gql`
  {
    collectionBanners {
      id
      collectionName
      collectionCoverPhoto {
        url
      }
    }
  }
`;

export const getStaticProps = async () => {
  const { collectionBanners } = await graphcms.request(QUERY);
  return {
    props: { collectionBanners },
    revalidate: 10,
  };
};

const Home: NextPage = ({ collectionBanners }: any) => {
  return (
    <div>
      <Head>
        <title>Workoutly Ecommerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Logo.ico" />
      </Head>

      <main>
        <Nav />
        <Hero CollectionBanners={collectionBanners} />
        <Categories />
      </main>
    </div>
  );
};

export default Home;
