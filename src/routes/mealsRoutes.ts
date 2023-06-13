import { FastifyInstance } from 'fastify';
import { createMeal, deleteMeal, getMeal, getMeals, summaryMeal, updateMeal } from '../controllers/mealsController';

export async function mealsRoutes(app: FastifyInstance) {
    //GET all
    app.get('/', getMeals);

    //GET one
    app.get('/:id', getMeal);

    //POST one
    app.post('/', createMeal);

    //UPDATE one
    app.put('/:id', updateMeal);

    //DELETE one
    app.delete('/:id', deleteMeal);

    //GET a summary
    app.get('/summary', summaryMeal);
}
