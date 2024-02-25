import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { id } = await req.json()

        if (!id) {
            response.status = 400;
            response.message = 'Bad Request';
            return new Response(JSON.stringify(response));
        }

        const items = await prisma.itemDefinitions.findMany({
            include: {
                category: true,
                nature: true,
            },
            orderBy: [
                {
                    name: 'asc'
                },
                {
                    category: {
                        name: 'asc'
                    }
                },
                {
                    nature: {
                        name: 'asc',
                        dynamic: "asc"
                    }
                }
            ],
            where: {
                categoryId: id
            }
        })

        response.status = 200;
        response.message = 'Success';
        response.data = items;
        return new Response(JSON.stringify(response));
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}