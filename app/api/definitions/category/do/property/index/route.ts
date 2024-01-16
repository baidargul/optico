import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';
import { sortPropertiesIndex } from "../delete/route";

export async function PATCH(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { id, index } = await req.json()

        if (!id) {
            response.status = 400;
            response.message = 'Bad Request: Missing id';
            return new Response(JSON.stringify(response));
        }

        if (!index) {
            response.status = 400;
            response.message = 'Bad Request: Missing index';
            return new Response(JSON.stringify(response));
        }

        let property: any = await prisma.properties.findUnique({
            include: {
                category: {
                    include: {
                        properties: true
                    }
                },
                propertyOptions: true
            },
            where: {
                id: id
            }
        })

        if (!property) {
            response.status = 404;
            response.message = 'Property does not exist';
            return new Response(JSON.stringify(response));
        }

        if (property.index + index < 1) {
            response.status = 200;
            response.message = 'This is the first property';
            return new Response(JSON.stringify(response));
        }

        if (property.index + index > property.category.properties.length) {
            response.status = 200;
            response.message = 'This is the last property';
            return new Response(JSON.stringify(response));
        }

        let prevProperty = await prisma.properties.findFirst({
            where: {
                index: property.index + index
            }
        })

        if (prevProperty) {
            prevProperty = await prisma.properties.update({
                data: {
                    index: property.index
                },
                where: {
                    id: prevProperty.id
                },
            })
        }

        property = await prisma.properties.update({
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
                index: property.index + index
            } 
        })

        await sortPropertiesIndex()

        response.status = 200;
        response.message = 'Index changed';
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