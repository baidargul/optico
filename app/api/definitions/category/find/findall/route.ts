import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const categories = await prisma.category.findMany({
            include: {
                nature: true,
                properties: {
                    include: {
                        propertyOptions: {
                            orderBy: {
                                index: 'asc'
                            }
                        }
                    },
                    orderBy:{
                        index: 'asc'
                    }
                }
            },
            orderBy: [
                {
                    nature: {
                        name: "asc"
                    },
                },
                { name: "asc" },
            ],
        });


        response.status = 200
        response.message = `Got categories`
        response.data = categories
        return new Response(JSON.stringify(response))
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}