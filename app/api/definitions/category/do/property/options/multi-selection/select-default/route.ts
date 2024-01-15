import prisma from "@/lib/prisma";
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {

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

        let isExists = await prisma.propertyOptions.findUnique({
            where: {
                id
            }
        })

        if (!isExists) {
            response.status = 404;
            response.message = 'Option does not exists';
            return new Response(JSON.stringify(response));
        }

        const property = await prisma.properties.findUnique({
            where: {
                id: isExists.propertyId
            }
        })

        if (!property) {
            response.status = 404;
            response.message = 'Property does not exists';
            return new Response(JSON.stringify(response));
        }

        let updatedProperty
        if (property.defaultId === id) {
            updatedProperty = await prisma.properties.update({
                where: {
                    id: isExists.propertyId
                },
                data: {
                    defaultId: null
                }
            })

        } else {
            updatedProperty = await prisma.properties.update({
                where: {
                    id: isExists.propertyId
                },
                data: {
                    defaultId: id
                }
            })

        }


        if (!updatedProperty) {
            response.status = 500;
            response.message = 'Unable to set default property';
            return new Response(JSON.stringify(response));
        }

        response.status = 200;
        response.message = 'Property default set successfully';
        response.data = updatedProperty;
        return new Response(JSON.stringify(response));
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}