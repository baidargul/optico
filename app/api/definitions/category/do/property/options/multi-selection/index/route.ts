import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

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

        let targetOption: any = await prisma.propertyOptions.findUnique({
            where: {
                id: id
            }
        })

        const currentOptions = await prisma.propertyOptions.findMany({
            where: {
                propertyId: targetOption.propertyId
            },
            orderBy: {
                index: 'asc'
            }
        })

        if (!targetOption) {
            response.status = 404;
            response.message = 'Property does not exist';
            return new Response(JSON.stringify(response));
        }

        if (targetOption.index === 1 && index === -1) {
            response.status = 300;
            response.message = 'This is the first option';
            return new Response(JSON.stringify(response));
        }

        if (targetOption.index === currentOptions.length && index === 1) {
            response.status = 300;
            response.message = 'This is the last property';
            return new Response(JSON.stringify(response));
        }

        const newIndex = Number(targetOption.index) + Number(index)
        let prevOption = await prisma.propertyOptions.findFirst({
            where: {
                index: newIndex
            }
        })

        if (prevOption) {
            prevOption = await prisma.propertyOptions.update({
                data: {
                    index: targetOption.index
                },
                where: {
                    id: prevOption.id
                },
            })
        }

        targetOption = await prisma.propertyOptions.update({
            include: {
                properties: {
                    include: {
                        category: true,
                        propertyOptions: {
                            orderBy: {
                                index: 'asc'
                            }
                        }
                    }
                }
            },
            where: {
                id: id
            },
            data: {
                index: targetOption.index + index
            }
        })

        response.status = 200;
        response.message = 'Index changed';
        response.data = targetOption;
        return new Response(JSON.stringify(response));
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}