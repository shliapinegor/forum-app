import CommentDto from "./CommentDto";

export default interface IUpdateBody{
    title?: string,
    content?: string,
    tags?: [string];
    author?: string;
}