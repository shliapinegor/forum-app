import PostService from "./PostService";
import PostDto from "../dto/PostDto";
import {Post as P} from "../models/Post";
import IUpdateBody from "../dto/IUpdateBody";
import {HttpError} from "routing-controllers";
import PeriodsDto from "../dto/PeriodsDto";

export default class PostServiceImpl implements PostService{

    async createPost(author: string, title: string, content: string, tags: Set<string>): Promise<PostDto> {
        const newPost = new P({title, content, tags, author});
        const res = await newPost.save();
        return res.toObject({flattenObjectIds: true}) as PostDto;
    }

    async findPostsByAuthor(author: string): Promise<PostDto[]> {
        const posts = await P.find({author: author});
        return posts.map(p => p.toObject({flattenObjectIds: true}) as PostDto)
    }

    async findPostById(id: string): Promise<PostDto> {
        const post = await P.findById(id)
        return post!.toObject({flattenObjectIds: true}) as PostDto;
    }

    async updatePost(id: string, updatePostDto: IUpdateBody, login: string): Promise<PostDto> {
        const result = await P.findById(id);
        if(!result){
            throw new HttpError(404, `Post with id = ${id} not found`)
        }

        if(result.author !== login){
            throw new HttpError(401, 'Access denied. you dont have permission')
        }
        return await P.findByIdAndUpdate(id, updatePostDto, {new: true, lean: true}) as PostDto;
    }

    async deletePost(id: string, login: string): Promise<PostDto> {
        const result = await P.findById(id)
            if(!result){
                throw new HttpError(404, `Post with id = ${id} not found`)
            }
            if(result.author !== login){
                throw new HttpError(401, 'Access denied. you dont have permission')
            }
        await P.findByIdAndDelete(id);
        return result.toObject({flattenObjectIds: true}) as PostDto

    }

    async addComment(id: string, author: string, message: string): Promise<PostDto> {
        const result = await P.findByIdAndUpdate(id, {$push: {comments: {author, likes: 0, dateCreated: Date.now(), message}}})
        if(!result){
            throw new HttpError(404, `Post with id = ${id} not found`)
        }
        return this.findPostById(id);
    }

    async addLike(id: string): Promise<PostDto> {
        const result = await P.findByIdAndUpdate(id, {$inc: {likes: 1}})
        if(!result){
            throw new HttpError(404, `Post with id = ${id} not found`)
        }
        return this.findPostById(id);
    }

    async findPostsByPeriod(periods: PeriodsDto): Promise<PostDto[]> {
        const startDate = new Date(periods.dateFrom);
        const endDate = new Date(periods.dateTo);
        const posts = await P.find({$and: [{dateCreated: {$gte: startDate}}, {dateCreated: {$lte: endDate}}]})
        return posts.map(p => p.toObject({flattenObjectIds: true}) as PostDto)
    }

    async findPostsByTags(tags: string[]): Promise<PostDto[]> {
        const posts = await P.find({tags: {$elemMatch: {$in: tags}}});
        return posts.map(p => p.toObject({flattenObjectIds: true}) as PostDto)
    }

}