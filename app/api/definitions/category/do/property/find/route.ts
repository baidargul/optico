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
            response.message = `'Bad Request'`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        let isExists: any = await prisma.properties.findUnique({
            include: {
                category: true,
                propertyOptions: {
                    orderBy: {
                        index: 'asc'
                    }
                }
            },
            where: {
                id: id
            }
        })

        if (!isExists) {
            response.status = 404
            response.message = 'Property does not exists.'
            response.data = null
            return new Response(JSON.stringify(response))
        }

        response.status = 200
        response.message = 'Property found.'
        response.data = isExists
        return new Response(JSON.stringify(response))
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}