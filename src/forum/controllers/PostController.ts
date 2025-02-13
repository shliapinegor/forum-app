import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseBefore} from "routing-controllers";
import NewPostDto from "../dto/NewPostDto";
import PostService from "../service/PostService";
import PostServiceImpl from "../service/PostServiceImpl";
import IUpdateBody from "../dto/IUpdateBody";
import AddCommentDto from "../dto/AddCommentDto";
import PeriodsDto from "../dto/PeriodsDto";
import {AuthMiddleware} from "../../account/middleware/AuthMiddleware";
import {CheckUserPermission} from "../../account/middleware/CheckUserPermission";
import {Request} from 'express'
import {getLoginFromResponse} from "../../account/utils/getLoginFromResponse";
import {CheckModerator} from "../../account/middleware/CheckModerator";


@Controller('/forum')
export default class PostController {

    postService:PostService = new PostServiceImpl();

    @UseBefore(AuthMiddleware)
    @UseBefore(CheckUserPermission)
    @Post("/post/:author")
    async createPost(@Param('author') author:string, @Body({validate: true, required: true}) newPostDto: NewPostDto){
        return await this.postService.createPost(author,newPostDto.title , newPostDto.content, newPostDto.tags);
    }
    @UseBefore(AuthMiddleware)
    @Get("/post/:id")
    async findPostById(@Param('id') id:string){
        return await this.postService.findPostById(id)
    }
    @UseBefore(AuthMiddleware)
    @Get("/posts/author/:author")
    async findPostsByAuthor(@Param('author') author:string){
        return await this.postService.findPostsByAuthor(author)
    }
    @UseBefore(AuthMiddleware)
    @Put("/post/:id")
    async updatePost(@Param('id') id:string, @Body({validate: true, required: true}) updatePostDto: IUpdateBody,  @Req() req: Request ){
        return await this.postService.updatePost(id, updatePostDto, getLoginFromResponse(req))
    }

    @UseBefore(AuthMiddleware)
    @UseBefore(CheckModerator)
    @Delete("/post/:id")
    async deletePost(@Param('id') id:string, @Req() req: Request){
        return await this.postService.deletePost(id, getLoginFromResponse(req))
    }
    @UseBefore(AuthMiddleware)
    @UseBefore(CheckUserPermission)
    @Put('/post/:id/comment/:author')
    async addComment(@Param('id') id: string, @Param('author') author: string, @Body({validate: true, required: true}) addCommentDto: AddCommentDto){
        return await this.postService.addComment(id, author, addCommentDto.message)
    }
    @UseBefore(AuthMiddleware)
    @Put('/post/:id/like')
    async addLike(@Param('id') id: string){
        return await this.postService.addLike(id)
    }
    @UseBefore(AuthMiddleware)
    @Get('/posts/tags')
    async findPostsByTags(@Body({validate: true, required: true}) tags: string[]){
        return await this.postService.findPostsByTags(tags)
    }
    @UseBefore(AuthMiddleware)
    @Get('/posts/period')
    async findPostsByPeriod(@Body({validate: true, required: true}) periods: PeriodsDto){
        return await this.postService.findPostsByPeriod(periods)
    }
}