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
            response.message = `Invalid request`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        })

        if (!category) {
            response.status = 404
            response.message = `Nature doesn't exists.`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        await prisma.category.delete({
            where: {
                id: id
            }
        })

        response.status = 200
        response.message = "Category deleted"
        response.data = null
        return new Response(JSON.stringify(response))
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}