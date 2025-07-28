import express from 'express';
import path from 'path';
import { serverConfig } from './config.js';
import { mainRouter } from './routes/main.routes.js';
import { viewsRouter } from './routes/views.routes.js';
const { PORT, publicPath, viewsPath}  = serverConfig;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', viewsPath());
app.use(express.static(publicPath()));

app.use('/', viewsRouter);
app.use("/api", mainRouter);




app.listen(PORT, () => console.log(`Server runnign on port ${PORT}`))