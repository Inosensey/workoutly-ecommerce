import { NextPage } from "next";
import { gql } from "graphql-request";
import { GraphCmsApi } from "../../Services/GraphcmsApi";
import Head from "next/head";
import React from "react";
import Nav from "../../common/Nav";
import Hero from "../../modules/Collection/Hero";
import Items from "../../modules/Collection/Items";

//Graphcms
const QUERY = gql`
  query CollectionBanners($slug: String!) {
    collectionBanners(where: { slug: $slug }) {
      id
      collectionName
      collectionCoverPhoto {
        url
      }
    }
  }
`;
const QUERYITEM = gql`
  query Items($id: ID!) {
    items(where: { collectionBanners_some: { id: $id } }) {
      id
      productName
      productPrice
      productQuantity
      rating
      slug
      productPhoto {
        url
      }
    }
  }
`;
const SLUGLIST = gql`
  {
    collectionBanners {
      slug
    }
  }
`;

export const getStaticPaths = async () => {
  const { collectionBanners } = await GraphCmsApi.request(SLUGLIST);
  return {
    paths: collectionBanners.map((collectionBanner: any) => ({
      params: { collection: collectionBanner.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const slug = params.collection;
  const { collectionBanners } = await GraphCmsApi.request(QUERY, { slug });
  const id = collectionBanners[0].id;
  const { items } = await GraphCmsApi.request(QUERYITEM, { id });
  return {
    props: { collectionBanners, items },
  };
};

const CollectionPage: NextPage = ({ collectionBanners, items }: any) => {
  return (
    <div>
      <Head>
        <title>Workoutly Ecommerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Logo.ico" />
      </Head>
      <main>
        <Nav />
        <Hero CollectionBanner={collectionBanners} />
        <Items Items={items} />
      </main>
    </div>
  );
};

export default CollectionPage;
