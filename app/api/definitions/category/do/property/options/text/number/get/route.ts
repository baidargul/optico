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
            response.status = 400;
            response.message = 'Bad request';
            return new Response(JSON.stringify(response));
        }

        let isExists = await prisma.properties.findUnique({
            include: {
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
            response.status = 400;
            response.message = 'Property does not exists';
            return new Response(JSON.stringify(response));
        }

        const value = isExists.propertyOptions[0].value

        response.status = 200;
        response.message = 'Success';
        response.data = value;
        return new Response(JSON.stringify(response));
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}