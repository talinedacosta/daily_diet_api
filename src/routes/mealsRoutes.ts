import { FastifyInstance } from 'fastify';
import { createMeal, deleteMeal, getMeal, getMeals, summaryMeal, updateMeal } from '../controllers/mealsController';
import { validateToken } from '../middlewares/validateTokenHandler';

export async function mealsRoutes(app: FastifyInstance) {

    //GET all
    app.get('/', { preHandler: validateToken }, getMeals);

    //GET one
    app.get('/:id', { preHandler: validateToken }, getMeal);

    //POST one
    app.post('/', { preHandler: validateToken }, createMeal);

    //UPDATE one
    app.put('/:id', { preHandler: validateToken }, updateMeal);

    //DELETE one
    app.delete('/:id', { preHandler: validateToken }, deleteMeal);

    //GET a summary
    app.get('/summary', { preHandler: validateToken }, summaryMeal);
}
