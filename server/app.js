import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import postsRoutes from './routes/posts.routes.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//middlewares
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload',
})),
    app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false })),

    app.use(express.static(path.join(__dirname, '../client/build')));

// //routes
// app.use(postRoutes);

export { app };
