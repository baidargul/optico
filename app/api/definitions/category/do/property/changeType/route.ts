import prisma from "@/lib/prisma";
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { id, type } = await req.json()

        if (!id) {
            response.status = 400;
            response.message = 'Bad Request: Missing id';
            return new Response(JSON.stringify(response));
        }

        if (!type) {
            response.status = 400;
            response.message = 'Bad Request: Missing type';
            return new Response(JSON.stringify(response));
        }

        let isExists = await prisma.properties.findUnique({
            where: {
                id: id
            }
        })

        if (!isExists) {
            response.status = 404;
            response.message = 'Not Found: Property not found';
            return new Response(JSON.stringify(response));
        }

        await prisma.propertyOptions.deleteMany({
            where:{
                propertyId: id
            }
        })

        const property = await prisma.properties.update({
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
            },
            data: {
                type: type
            }
        })

        response.status = 200;
        response.message = 'Type change successfull.';
        response.data = property;
        return new Response(JSON.stringify(response));
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}