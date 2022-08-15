interface CollectionBannersInterface {
    collectionCoverPhoto: {url: string},
    collectionName: string,
    id: string
}
interface ItemsInterface {
    id: string;
    productName: string;
    productPrice: number;
    productQuantity: number,
    slug: string;
    productPhoto: {
      url: string;
    };
}

export type CollectionBannersType = CollectionBannersInterface;
export type ItemsType = ItemsInterface;