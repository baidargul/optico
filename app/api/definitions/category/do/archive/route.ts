import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { id } = await req.json()

        const isExists = await prisma.category.findUnique({
            where: {
                id: id
            }
        })

        if (!isExists) {
            response.status = 404
            response.message = "Category doesn't exists anymore."
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const category = await prisma.category.update({
            include: {
                nature: true
            },
            where: {
                id: id
            },
            data: {
                archived: true
            }
        })

        response.status = 200
        response.message = "Achived"
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