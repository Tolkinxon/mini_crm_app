import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';

export const viewsRouter = Router();
viewsRouter.get('/groups', viewsController.GROUPS);
viewsRouter.get('/students', viewsController.STUDENTS);
