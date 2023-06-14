import { FastifyReply, FastifyRequest } from "fastify"
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from "../env";
import { z } from 'zod';

export const userSignup = async (request: FastifyRequest, reply: FastifyReply) => {

    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userExists = await knex('users').select().where('email', email).first()

        if (userExists) {
            return reply.status(400).send("Email already used.")
        }

        const user = await knex('users').insert({
            id: randomUUID(),
            name: name,
            email: email,
            password: hashedPassword
        }).returning('*');

        const accessToken = jwt.sign({
            user: {
                name: user[0].name,
                email: user[0].email,
                id: user[0].id,
                created_at: user[0].created_at
            },
        },
            env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        )

        reply.status(201).send({ accessToken: accessToken });

    } catch (error) {
        reply.status(500).send(error);
    }
}

export const userSignin = async (request: FastifyRequest, reply: FastifyReply) => {

    const bodySchema = z.object({
        password: z.string(),
        email: z.string().email(),
    });

    const { email, password } = bodySchema.parse(request.body);

    try {
        const user = await knex('users').select().where('email', email).first();

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return reply.status(400).send("Email or password is not valid.")
        }

        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                id: user.id,
                created_at: user.created_at
            },
        },
            env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        )

        reply.status(201).send({ accessToken: accessToken });

    } catch (error) {
        reply.status(500).send(error);
    }
}