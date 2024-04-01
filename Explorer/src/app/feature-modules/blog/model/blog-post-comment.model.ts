export interface BlogPostComment {
    blogId: number,
    username : string,
    text: string,
    userId: number,
    creationTime: Date, 
    lastUpdatedTime: Date
}