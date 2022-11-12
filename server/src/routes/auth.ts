import { FastifyInstance } from "fastify/types/instance"
import { z } from "zod";
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate";
import { compare } from "bcryptjs";

export async function authRoutes(fastify: FastifyInstance) {
    fastify.get('/auth/me', { onRequest: [authenticate] }, async (request) => {
        return { user: request.user }
    })

    fastify.post('/auth', async (request, reply) => {

        const createUserBody = z.object({
            email: z.string(),
            password: z.string(),
        })

        const { email, password } = createUserBody.parse(request.body);
        console.log(request.body);

        let user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return reply.status(400).send({
                message: 'Email or password incorrect'
            })

        }

        const passwordMath = compare(password, user.password)

        if (!passwordMath) {
            return reply.status(400).send({
                message: 'Password incorrect'
            })
        }

        const token = fastify.jwt.sign({
            name: user.name,
            email: user.email,
        }, {
            sub: user.id,
            expiresIn: '7 days',
        })

        return { token }
    })
}