import { FastifyInstance } from 'fastify';
import { userSignin, userSignup } from '../controllers/userController';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/signup', userSignup);

    app.post('/signin', userSignin);
}
