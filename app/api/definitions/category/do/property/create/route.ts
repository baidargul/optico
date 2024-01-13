import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { id } = await req.json()

        if (!id) {
            response.status = 400
            response.message = 'Bad Request'
            response.data = null
            return new Response(JSON.stringify(response))
        }

        let isExists: any = await prisma.category.findUnique({
            include: {
                properties: true
            },
            where: {
                id
            }
        })

        if (!isExists) {
            response.status = 404
            response.message = 'Category does not exists'
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const property = await prisma.properties.create({
            data: {
                categoryId: id,
                index: isExists.properties.length + 1,
                name: `New Property ${isExists.properties.length + 1}`
            }
        })

        if (!property) {
            response.status = 500
            response.message = 'Unable to create property.'
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const category = await prisma.category.findUnique({
            include: {
                properties: true,
                nature: true,
            }, where: {
                id: id
            }
        })

        response.status = 200
        response.message = 'Property created'
        response.data = category
        return new Response(JSON.stringify(response))
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}