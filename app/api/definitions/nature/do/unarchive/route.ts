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

        const isExists = await prisma?.nature.findUnique({
            where: {
                id: id
            }
        })

        if (!isExists) {
            response.status = 404
            response.message = "Nature doesn't exists anymore."
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const nature = await prisma?.nature.update({
            where: {
                id: id
            },
            data: {
                archived: false
            }
        })

        response.status = 200
        response.message = "Unarchived"
        response.data = nature
        return new Response(JSON.stringify(response))
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}