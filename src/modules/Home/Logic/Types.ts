interface CategoriesInterface {
    id: string,
    categoryName: string,
    slug: string,
    categoryCoverPhoto: {
      url: string
    }
}
interface LimitedItemInterface {
    id: string,
    productName: string,
    productPrice: number,
    coverPhotoTitle: string,
    productQuantity?: number
    coverPhoto: {
      url: string,
    }
    productPhoto: {
      url: string,
    }
    description: {
        text: string
    },
    slug: string
}
interface ItemsInterface {
    id: string,
    productName: string,
    productPrice: string,
    slug: string,
    productPhoto: {
      url: string,
    }
}


export type CategoriesType = CategoriesInterface;
export type LimitedItemType = LimitedItemInterface
export type ItemsType = ItemsInterface