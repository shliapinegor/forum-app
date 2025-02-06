import 'reflect-metadata';
import express, {Application, NextFunction, Request, Response} from 'express';
import {useExpressServer} from "routing-controllers";
import PostController from "./controllers/PostController";
import dotenv from 'dotenv';
import * as mongoose from "mongoose";
import {ErrorHandlingMiddleWare} from "./middleware/ErrorHandlingMiddleWare";

dotenv.config();

mongoose.connect(process.env.DB_URL!)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) =>{
        console.error('MongoDb connection error: ' + err);
        process.exit(1);
    })

const app: Application = express();
const PORT = 3000;

app.use(express.json());


useExpressServer(app, {
    controllers: [PostController],
    middlewares: [ErrorHandlingMiddleWare],
    defaultErrorHandler: false
})

async function startServer() {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    })
}

startServer().catch(console.error);