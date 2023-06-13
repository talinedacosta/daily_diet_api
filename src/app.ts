import fastify from 'fastify';
import { usersRoutes } from './routes/usersRoutes';
import { mealsRoutes } from './routes/mealsRoutes';

export const app = fastify();

//routes
app.register(usersRoutes, {
    prefix: 'users'
});
app.register(mealsRoutes, {
    prefix: 'meals'
});