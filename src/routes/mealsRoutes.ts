import { FastifyInstance } from 'fastify';

export async function mealsRoutes(app: FastifyInstance) {
    //GET all
    app.get('/', async (request, response) => {
        console.log(request.params)
    })

    //GET one
    app.get('/:id', async (request, response) => {
        console.log(request.params)
    })

    //POST one
    app.post('/', async (request, response) => {
        console.log(request.body)
    })

    //UPDATE one
    app.put('/:id', async (request, response) => {
        console.log(request.body, request.params)
    })

    //DELETE one
    app.delete('/:id', async (request, response) => {
        console.log(request.params)
    })

    //GET a summary
    app.delete('/summary', async (request, response) => {
        console.log(request.params)
    })
}
