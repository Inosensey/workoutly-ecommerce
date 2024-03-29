import { NextPage } from "next";
import Link from "next/link";
import { gql } from "graphql-request";
import { GraphCmsApi } from "../../Services/GraphcmsApi";
import Head from "next/head";
import React from "react";
import Nav from "../../common/Nav";
import Hero from "../../modules/Category/Hero";
import Items from "../../modules/Category/Items";
import { ItemsType } from "../../modules/Category/Logic/Types";
import { CategoryType } from "../../TypeScript/ReusableTypes";

import styles from "../../../styles/Category/Hero.module.css";

//Graphcms
const QUERY = gql`
  query Categories($slug: String!) {
    categories(where: { slug: $slug }) {
      id
      categoryName
      categoryCoverPhoto {
        url
      }
    }
  }
`;
const QUERYITEM = gql`
  query Items($id: ID!) {
    items(where: { categories_some: { id: $id } }) {
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
  query {
    categories {
      id
      categoryName
      slug
      categoryCoverPhoto {
        url
      }
    }
  }
`;

interface params {
  params: {
    categories: string;
  };
}

export const getStaticPaths = async () => {
  const { categories } = await GraphCmsApi.request(SLUGLIST);
  return {
    paths: categories.map((category: CategoryType) => ({
      params: { categories: category.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: params) => {
  const slug = params.categories;
  const { categories } = await GraphCmsApi.request(QUERY, { slug });
  const id = categories[0].id;
  const { items } = await GraphCmsApi.request(QUERYITEM, { id });
  return {
    props: { categories, items },
  };
};

interface Props {
  categories: CategoryType[];
  items: ItemsType[];
}

const CategoriesPage: NextPage<Props> = ({ categories, items }) => {
  return (
    <div>
      <Head>
        <title>Workoutly Ecommerce</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/Logo.ico" />
      </Head>
      <main style={{ position: "relative" }}>
        <div className={styles.backArrow}>
          <Link href="/">
            <i className="fa-solid fa-circle-chevron-left"></i>
          </Link>
        </div>
        <Nav />
        <Hero category={categories} />
        <Items Items={items} />
      </main>
    </div>
  );
};

export default CategoriesPage;
