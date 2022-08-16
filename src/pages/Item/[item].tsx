import { NextPage } from "next";
import Head from "next/head";
import { gql } from "graphql-request";
import { GraphCmsApi } from "../../Services/GraphcmsApi";
import ItemCard from "../../modules/Item/ItemCard";
import { useRouter } from "next/router";
import OtherItem from "../../modules/Item/OtherItem";
import Nav from "../../common/Nav";
import ReviewComments from "../../modules/Item/ReviewComments";
import { Item, Product } from "../../TypeScript/ReusableTypes";
import styles from "../../../styles/Item/Item.module.css";

//Graphcms
const QUERY = gql`
  query Item($slug: String!, $itemLimit: Int!) {
    item(where: { slug: $slug }) {
      id
      productName
      productPrice
      productQuantity
      rating
      description {
        text
      }
      productPhoto {
        url
      }
      slug
    }
    items(first: $itemLimit) {
      id
      productName
      productPrice
      slug
      productPhoto {
        url
      }
    }
  }
`;
const ITEMLIST = gql`
  {
    items {
      id
    }
  }
`;
const SLUGLIST = gql`
  {
    items {
      slug
    }
  }
`;

type Slug = {
  slug: string;
};
interface Params {
  params: {
    item: string;
  };
}
interface Props {
  item: Product;
  items: [
    {
      id: string;
      productName: string;
      productPrice: number;
      slug: string;
      productPhoto: {
        url: string;
      };
    }
  ];
}

export const getStaticPaths = async () => {
  const response = await GraphCmsApi.request(SLUGLIST);
  return {
    paths: response.items.map((item: Slug) => ({
      params: { item: item.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const slug = params.item;
  const ItemList = await GraphCmsApi.request(ITEMLIST);
  const itemCount = ItemList.items.length / 2;
  const { item, items } = await GraphCmsApi.request(QUERY, {
    slug: slug,
    itemLimit: itemCount,
  });
  return {
    props: { item, items },
    revalidate: 10,
  };
};

const ItemPage: NextPage<Props> = ({ item, items }) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Workoutly Ecommerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Logo.ico" />
      </Head>
      <main>
        <Nav />
        <section className={styles.container}>
          <div className={styles.backArrow}>
            <i
              onClick={() => router.back()}
              className="fa-solid fa-circle-chevron-left"
            ></i>
          </div>
          <ItemCard {...item} />
          <ReviewComments {...item} />
          <OtherItem {...items} />
        </section>
      </main>
    </div>
  );
};

export default ItemPage;
