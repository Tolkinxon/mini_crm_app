import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';

export const viewsRouter = Router();
viewsRouter.get('/', viewsController.INDEX);
