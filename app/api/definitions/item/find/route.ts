import prisma from "@/lib/prisma";
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { id } = await req.json()
        
        if(!id){
            response.status = 299;
            response.message = 'Invalid request, Requires ID';
            response.data = null;
            return new Response(JSON.stringify(response));
        }

        const items = await prisma.itemDefinitions.findMany({
            include: {
                nature: true,
                category: true,
            },
            orderBy:
                [
                    { name: 'asc' },
                    {
                        nature: {
                            name: 'asc'
                        },

                    },
                    {
                        category: {
                            name: 'asc'
                        }
                    }
                ],
            where: {
                id: id
            }
        })


        const result = items.length > 0 ? items[0] : null;
        console.log(result)

        response.status = 200;
        response.message = 'Items fetched';
        response.data = result;
        return new Response(JSON.stringify(response));
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}