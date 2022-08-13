interface StarInterface {
    FiveStar: {
        StarRating: number,
        StarCount:number,
      },
      FourStar: {
        StarRating: number,
        StarCount:number,
      },
      ThreeStar: {
        StarRating: number,
        StarCount:number,
      },
      TwoStar: {
        StarRating: number,
        StarCount:number,
      },
      OneStar: {
        StarRating: number,
        StarCount:number,
      },
}
interface ReviewDetailsInterface {
    id: string,
    item_id: string,
    review: string,
    rating: number,
    username: string,
}
export interface ReviewState<OrderType, ReviewType, UserDetailsType, ReviewDetailsType> {    
    order: OrderType[],
    reviews: ReviewType[],
    userDetails: UserDetailsType | undefined,
    reviewDetails: ReviewDetailsType,
    star: StarInterface
}

export interface ReviewSetStates {
    setIsLoading: any,
    setOrder: any,
    setReviews: any,
    setUserDetails: any,
    setReviewDetails:any,
    setRating: any,
    setStar: any
}
export type StarType = StarInterface;
export type ReviewDetailsType = ReviewDetailsInterface