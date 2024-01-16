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
            response.message = "Bad Request: Missing id"
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const property = await prisma.properties.findUnique({
            where: {
                id: id
            }
        })

        if (!property) {
            response.status = 404
            response.message = "Property does not exist"
            response.data = null
            return new Response(JSON.stringify(response))
        }

        await prisma.properties.delete({
            where: {
                id: id
            }
        })

        await sortPropertiesIndex()

        response.status = 200
        response.message = "Property deleted"
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

export async function sortPropertiesIndex() {
    const properties = await prisma.properties.findMany({
        orderBy: {
            index: 'asc'
        }
    })

    if (properties.length > 0) {
        properties.forEach(async (property, index) => {
            await prisma.properties.update({
                where: {
                    id: property.id
                },
                data: {
                    index: index + 1
                }
            })
        })
    }
}