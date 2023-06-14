import { FastifyReply, FastifyRequest } from "fastify"
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { z } from 'zod';
import { bestSequenceOfOnDiet } from "../utils/sequenceOfOnDiet";

export const createMeal = async (request: FastifyRequest, reply: FastifyReply) => {

    const bodySchema = z.object({
        title: z.string(),
        description: z.string(),
        eaten_at: z.coerce.date(),
        isDiet: z.enum(['true', 'false'])
    })

    const { title, description, eaten_at, isDiet } = bodySchema.parse(request.body);

    const user_id = request.token;

    try {
        await knex('meals').insert({
            id: randomUUID(),
            title,
            description,
            isDiet,
            eaten_at: new Date(eaten_at).toUTCString(),
            updated_at: knex.fn.now(),
            user_id: user_id
        })

        return reply.status(201).send();

    } catch (error) {
        return reply.status(500).send(error);
    }
}

export const getMeals = async (request: FastifyRequest, reply: FastifyReply) => {
    const user_id = request.token;

    try {
        const meals = await knex('meals').select().where('user_id', user_id);

        return reply.status(200).send(meals);

    } catch (error) {
        return reply.status(500).send(error);
    }
}

export const getMeal = async (request: FastifyRequest, reply: FastifyReply) => {

    const paramSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = paramSchema.parse(request.params);

    const user_id = request.token;

    try {
        const meal = await knex('meals').select().where({ id: id, user_id: user_id }).first();

        if (meal) {
            return reply.status(200).send(meal);
        }

        return reply.status(404).send();

    } catch (error) {
        return reply.status(500).send();
    }
}

export const updateMeal = async (request: FastifyRequest, reply: FastifyReply) => {

    const paramsSchema = z.object({
        id: z.string().uuid()
    });

    const bodySchema = z.object({
        title: z.string(),
        description: z.string(),
        isDiet: z.enum(['true', 'false'])
    });

    const { id } = paramsSchema.parse(request.params);

    const user_id = request.token;

    const { title, description, isDiet } = bodySchema.parse(request.body);

    try {
        const currentMeal = await knex('meals')
            .select()
            .where({ id: id }).first();

        if (currentMeal) {
            await knex('meals')
                .where({ id: id, user_id: user_id })
                .update({
                    title,
                    description,
                    isDiet,
                    updated_at: knex.fn.now()
                })

            return reply.status(201).send();
        }

        return reply.status(404).send();

    } catch (error) {
        return reply.status(500).send();
    }
}

export const deleteMeal = async (request: FastifyRequest, reply: FastifyReply) => {

    const paramsSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = paramsSchema.parse(request.params);

    const user_id = request.token;

    try {
        const currentMeal = await knex('meals')
            .select()
            .where({ id: id, user_id: user_id }).first();

        if (currentMeal) {
            await knex('meals')
                .where({ id: id })
                .delete()

            return reply.status(201).send();
        }

        return reply.status(404).send();

    } catch (error) {
        return reply.status(500).send();
    }
}

export const summaryMeal = async (request: FastifyRequest, reply: FastifyReply) => {

    try {

        const user_id = request.token;

        const AllMeals = await knex('meals')
            .select()
            .where({ user_id: user_id });

        const mealsOnDiet = await knex('meals')
            .select()
            .where({ isDiet: 'true', user_id: user_id })
            .orderBy('created_at', 'desc');

        const mealsNotOnDiet = await knex('meals')
            .select()
            .where({ isDiet: 'false', user_id: user_id })
            .orderBy('created_at', 'desc');

        const mealsBestSequence = bestSequenceOfOnDiet(AllMeals);

        const summary = {
            meals: AllMeals,
            mealsOnDiet: mealsOnDiet,
            mealsNotOnDiet: mealsNotOnDiet,
            mealsBestSequence: mealsBestSequence
        }

        return reply.status(200).send(summary);

    } catch (error) {
        return reply.status(500).send(error);
    }
}