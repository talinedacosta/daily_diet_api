import { FastifyReply, FastifyRequest } from "fastify";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from "../env";

declare module 'fastify' {
    export interface FastifyRequest {
        token: jwt.JwtPayload | string;
    }
}

export interface TokenInterface {
    user: {
        id: string;
    };
}

export const validateToken = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        let token = request.headers.authorization as string;

        if (!token) {
            throw new Error();
        }

        token = token.split(' ')[1];

        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        request.token = (decoded as TokenInterface).user.id;

    } catch (error) {
        reply.status(401).send();
    }

}