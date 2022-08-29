interface ProductInterface {
        description: {
            text: string
        },
        id: string,
        productName: string,
        productPhoto: {url: string},
        productPrice: number,
        productQuantity?: number
        slug: string
    }
interface ItemInfoInterface {
    Quantity: number;
    itemInfo: {
        description: {
            text: string
        },
        id: string,
        productName: string,
        productPhoto: {url: string},
        productPrice: number,
        productQuantity?: number
        slug: string
    }
}
interface CollectionBannersInterface {
    collectionCoverPhoto: {url: string},
    collectionName: string,
    id: string,
    slug: string
}
interface CategoryInterface {
    id: string;
    categoryName: string;
    slug: string;
    categoryCoverPhoto: {
      url: string;
    };
  }
interface OrderInterface {
    order_id: string,
    id: string,
    track_id: string,
    full_name: string,
    item_metadata: any,
    total_price: number,
    address_id: number,
    status: string,
    purchased_at: Date
}
interface ReviewInterface {
    review_id: number,
    id: string,
    item_id: string,
    review: string,
    created_at: Date,
    rating: number,
    username: string
}
interface ProfileInterface {
    id: string,
    personal_details_id: string,
    username: string,
    personal_details: {
        first_name: string,
        middle_name: string,
        last_name: string,
        gender: string,
        birth_date: Date,
    }
}

export type CategoryType = CategoryInterface;
export type CollectionBannersType = CollectionBannersInterface;
export type Product = ProductInterface;
export type Item = ItemInfoInterface;
export type Order = OrderInterface;
export type Review = ReviewInterface;
export type Profile = ProfileInterface
