import fastify from 'fastify';
import { userRoutes } from './routes/user';
import { mealRoutes } from './routes/meal';

export const app = fastify();

//routes
app.register(userRoutes, {
    prefix: 'user'
});
app.register(mealRoutes, {
    prefix: 'meal'
});