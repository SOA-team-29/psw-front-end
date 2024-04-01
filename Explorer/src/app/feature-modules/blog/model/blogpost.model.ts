import { BlogPostComment } from "./blog-post-comment.model"
import { BlogPostRating } from "./blog-post-rating.model"

export interface BlogPost {
    id: number,
    authorId: number,
    tourId:number,
    title: string,
    description: string,
    creationDate: Date,
    imageURLs:  string[] | null,
    comments: BlogPostComment[] | null,
    ratings: BlogPostRating[] | null,
    status: string
}