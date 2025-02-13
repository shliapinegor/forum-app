import PostDto from "../dto/PostDto";
import IUpdateBody from "../dto/IUpdateBody";
import PeriodsDto from "../dto/PeriodsDto";

export default interface PostService {
    createPost(author:string, title:string, content:string, tags: Set<string>): Promise<PostDto>;

    findPostById(id: string): Promise<PostDto>;

    findPostsByAuthor(author: string): Promise<PostDto[]>;

    updatePost(id: string, updatePostDto: IUpdateBody, login: string): Promise<PostDto>;

    deletePost(id: string, login: string): Promise<PostDto>;

    addComment(id: string, author: string, message: string): Promise<PostDto>;

    addLike(id: string): Promise<PostDto>;

    findPostsByTags(tags: string[]): Promise<PostDto[]>;

    findPostsByPeriod(periods: PeriodsDto): Promise<PostDto[]>;
}