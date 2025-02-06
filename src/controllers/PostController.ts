import {Body, Controller, Delete, Get, Param, Post, Put} from "routing-controllers";
import NewPostDto from "../dto/NewPostDto";
import PostService from "../service/PostService";
import PostServiceImpl from "../service/PostServiceImpl";
import IUpdateBody from "../dto/IUpdateBody";
import AddCommentDto from "../dto/AddCommentDto";
import PeriodsDto from "../dto/PeriodsDto";



@Controller('/forum')
export default class PostController {

    postService:PostService = new PostServiceImpl();

    @Post("/post/:author")
    async createPost(@Param('author') author:string, @Body({validate: true, required: true}) newPostDto: NewPostDto){
        return await this.postService.createPost(author,newPostDto.title , newPostDto.content, newPostDto.tags);
    }

    @Get("/post/:id")
    async findPostById(@Param('id') id:string){
        return await this.postService.findPostById(id)
    }

    @Get("/posts/author/:author")
    async findPostsByAuthor(@Param('author') author:string){
        return await this.postService.findPostsByAuthor(author)
    }

    @Put("/post/:id")
    async updatePost(@Param('id') id:string, @Body({validate: true, required: true}) updatePostDto: IUpdateBody ){
        return await this.postService.updatePost(id, updatePostDto)
    }

    @Delete("/post/:id")
    async deletePost(@Param('id') id:string ){
        return await this.postService.deletePost(id)
    }
    @Put('/post/:id/comment/:user')
    async addComment(@Param('id') id: string, @Param('user') user: string, @Body({validate: true, required: true}) addCommentDto: AddCommentDto){
        return await this.postService.addComment(id, user, addCommentDto.message)
    }
    @Put('/post/:id/like')
    async addLike(@Param('id') id: string){
        return await this.postService.addLike(id)
    }
    @Get('/posts/tags')
    async findPostsByTags(@Body({validate: true, required: true}) tags: string[]){
        return await this.postService.findPostsByTags(tags)
    }
    @Get('/posts/period')
    async findPostsByPeriod(@Body({validate: true, required: true}) periods: PeriodsDto){
        return await this.postService.findPostsByPeriod(periods)
    }
}