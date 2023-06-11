import { FastifyReply, FastifyRequest } from "fastify"
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from "../env";

interface User {
    name?: string,
    email: string,
    password: string,
}

export const userSignup = async (request: FastifyRequest, reply: FastifyReply) => {

    const { name, email, password } = request.body as User;

    if (!name || !email || !password) {
        return reply.status(400).send("All fields are required.")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userExists = await knex('users').select().where('email', email).first()

        if (userExists) {
            return reply.status(400).send("Email already used.")
        }

        const response = await knex('users').insert({
            id: randomUUID(),
            name: name,
            email: email,
            password: hashedPassword
        }).returning('*')

        const accessToken = jwt.sign({
            user: response,
        },
            env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        )

        reply.status(201).send({ accessToken: accessToken });

    } catch (error) {
        reply.status(500).send();
    }
}

export const userSignin = async (request: FastifyRequest, reply: FastifyReply) => {

    const { email, password } = request.body as User;

    if (!email || !password) {
        return reply.status(400).send("All fields are required.")
    }

    try {
        const user = await knex('users').select().where('email', email).first()

        const passwordValidate = await bcrypt.compare(password, user.password);

        if (!user || !passwordValidate) {
            return reply.status(400).send("Email or password is not valid.")
        }

        const accessToken = jwt.sign({
            user: user,
        },
            env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        )

        reply.status(201).send({ accessToken: accessToken });

    } catch (error) {
        reply.status(500).send();
    }
}