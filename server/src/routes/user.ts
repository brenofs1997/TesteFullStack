import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify/types/instance"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/users', async (request, reply) => {
        const createUserBody = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
            phone: z.string(),
            address: z.string(),
            city: z.string(),
            cep: z.string(),
            state: z.string(),
        })

        const { name, email, password, phone, address, city, cep, state } = createUserBody.parse(request.body);


        let user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return reply.status(400).send({
                message: 'Email already Exists'
            })

        }

        const passwordHash = await hash(password, 8);
        user = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
                phone,
                address,
                city,
                cep,
                state
            }
        })


        return { ...user, password: undefined }
    })

    fastify.get('/users', { onRequest: [authenticate] }, async (request, reply) => {
        let users = await prisma.user.findMany({
            orderBy: {
                name: 'asc',
            },
        })

        const usersFormacted = users.map(user => {
            return {
                ...user, password: undefined
            }
        })

        return usersFormacted
    })
    fastify.get('/users/:id', { onRequest: [authenticate] }, async (request, reply) => {
        const userIdParam = z.object({
            id: z.string(),
        })

        const { id } = userIdParam.parse(request.params);

        let user = await prisma.user.findUnique({
            where: {
                id,
            },
        })

        return { ...user, password: undefined }
    })
    fastify.get('/finduser/:name', { onRequest: [authenticate] }, async (request, reply) => {
        const userNameParam = z.object({
            name: z.string(),
        })

        const { name } = userNameParam.parse(request.params);

        let user = await prisma.user.findUnique({
                where:{name}
            
        })

        return { ...user, password: undefined }
    })

    fastify.put('/users/:id', async (request, reply) => {
        const createUserBody = z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            phone: z.string(),
            address: z.string(),
            city: z.string(),
            cep: z.string(),
            state: z.string(),
        })

        const { id, name, email, phone, address, city, cep, state } = createUserBody.parse(request.body);


        let user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            return reply.status(404).send({
                message: 'User incorrect'
            })

        }


        user = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                phone,
                address,
                city,
                cep,
                state
            }
        })


        return { ...user, password: undefined }
    })

    fastify.delete('/users/:id', { onRequest: [authenticate] }, async (request, reply) => {
        const userIdParam = z.object({
            id: z.string(),
        })

        const { id } = userIdParam.parse(request.params);

        let user = await prisma.user.delete({
            where: {
                id,
            },
        })

        if (user) {
            return reply.status(200).send({
                message: 'User deleted'
            })
        }
    })
}