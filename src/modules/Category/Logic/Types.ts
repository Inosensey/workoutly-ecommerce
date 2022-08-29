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

export type ItemsType = ItemsInterface;