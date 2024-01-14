import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { id, name } = await req.json()
        if (!id) {
            response.status = 400;
            response.message = 'Bad Request';
            response.data = null;
            return new Response(JSON.stringify(response));
        }

        if (!name) {
            response.status = 400;
            response.message = 'Name is required';
            response.data = null;
            return new Response(JSON.stringify(response));
        }

        let isExists = await prisma.properties.findUnique({
            where: {
                id
            }
        })

        if (!isExists) {
            response.status = 404;
            response.message = 'Property does not exists';
            response.data = null;
            return new Response(JSON.stringify(response));
        }


        let isNameExists = await prisma.properties.findFirst({
            where: {
                AND: {
                    name: name,
                    categoryId: isExists.categoryId,
                    NOT: {
                        id: id
                    }
                }
            }
        })

        if (isNameExists) {
            response.status = 409;
            response.message = 'Property with this name already exists in this category';
            response.data = null;
            return new Response(JSON.stringify(response));
        }

        let data = await prisma.properties.update({
            include: {
                category: true,
                propertyOptions: {
                    orderBy: {
                        index: 'asc'
                    }
                }
            },
            where: {
                id
            },
            data: {
                name
            }
        })
        response.status = 200;
        response.message = 'Property renamed successfully';
        response.data = data;
        return new Response(JSON.stringify(response));
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}