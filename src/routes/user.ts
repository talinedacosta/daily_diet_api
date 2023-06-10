import { FastifyInstance } from 'fastify';

export async function userRoutes(app: FastifyInstance) {
    app.post('/signup', async (request, response) => {
        console.log(request.body)
    })

    app.post('/signin', async (request, response) => {
        console.log(request.body)
    })
}
