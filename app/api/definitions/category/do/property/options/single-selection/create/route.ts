import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { id, value } = await req.json()

        if (!id) {
            response.status = 400;
            response.message = 'Bad Request';
            response.data = null;
            return new Response(JSON.stringify(response));
        }

        if (!value) {
            response.status = 400;
            response.message = 'Bad Request';
            response.data = null;
            return new Response(JSON.stringify(response));
        }

        let isExists = await prisma.properties.findUnique({
            where: {
                id: id
            }
        })

        if (!isExists) {
            response.status = 404;
            response.message = 'Property does not exists.';
            response.data = null;
            return new Response(JSON.stringify(response));
        }

        let isOptionExists = await prisma.propertyOptions.findFirst({
            where: {
                value: value,
                propertyId: id
            }
        })

        if (isOptionExists) {
            response.status = 409;
            response.message = 'Option already exists in this property.';
            response.data = null;
            return new Response(JSON.stringify(response));
        }

        const availableOptions = await prisma.propertyOptions.findMany({
            where: {
                propertyId: id
            }
        })

        let option = await prisma.propertyOptions.create({
            data: {
                value: value,
                propertyId: id,
                index: availableOptions.length + 1
            }
        })

        response.status = 200;
        response.message = 'Option added';
        response.data = option;
        return new Response(JSON.stringify(response));
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}