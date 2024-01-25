import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        let { id, value, prefix, suffix } = await req.json()

        if (!id) {
            response.status = 400;
            response.message = 'Bad request';
            return new Response(JSON.stringify(response));
        }

        if (!value) {
            response.status = 400;
            response.message = 'Bad request';
            return new Response(JSON.stringify(response));
        }

        if (!prefix) {
            prefix = ""
        }

        if (!suffix) {
            suffix = ""
        }

        let isExists: any = await prisma.properties.findUnique({
            where: {
                id: id
            }
        })

        if (!isExists) {
            response.status = 400;
            response.message = 'Property does not exists';
            return new Response(JSON.stringify(response));
        }

        isExists = await prisma.propertyOptions.deleteMany({
            where: {
                propertyId: id,
            }
        })

        await prisma.propertyOptions.create({
            data: {
                propertyId: id,
                index: 1,
                value: value,
            }
        })

        await prisma.properties.update({
            where: {
                id: id
            },
            data: {
                prefix: prefix,
                suffix: suffix,
            }
        })

        const property = await prisma.properties.findUnique({
            where: {
                id: id
            },
            include: {
                category: true,
                propertyOptions: {
                    orderBy: {
                        index: 'asc'
                    }
                }
            }
        })

        response.status = 200;
        response.message = 'Value updated.';
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