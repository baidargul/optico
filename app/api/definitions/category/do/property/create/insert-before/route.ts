import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { categoryId, targetId } = await req.json()

        if (!categoryId) {
            response.status = 400
            response.message = `'Bad Request'`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        let isExists: any = await prisma.category.findUnique({
            include: {
                properties: true
            },
            where: {
                id: categoryId
            }
        })

        if (!isExists) {
            response.status = 404
            response.message = 'Category does not exists'
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const referenceProperty = await prisma.properties.findUnique({
            where: {
                id: targetId
            }
        })

        if (!referenceProperty) {
            response.status = 404
            response.message = 'Property does not exists'
            response.data = null
            return new Response(JSON.stringify(response))
        }

        let newProperty: any;
        if (referenceProperty) {

            let refIndex = referenceProperty.index
            if (!refIndex) {
                response.status = 500
                response.message = 'Unable to create property.'
                response.data = null
                return new Response(JSON.stringify(response))
            }
            refIndex = Number(refIndex) + 1

            const afterProperty = await prisma.properties.findFirst({
                where: {
                    index: refIndex,
                }
            })

            if (afterProperty) {
                await prisma.properties.update({
                    where: {
                        id: afterProperty.id
                    },
                    data: {
                        index: Number(afterProperty?.index) + 1
                    }
                })
            }
            newProperty = await prisma.properties.create({
                data: {
                    categoryId: categoryId,
                    index: afterProperty?.index,
                    name: `New Property ${isExists.properties.length + 1}`
                }
            })

        }


        if (!newProperty) {
            response.status = 500
            response.message = 'Unable to create property.'
            response.data = null
            return new Response(JSON.stringify(response))
        }

        await sortPropertiesIndex()

        const category = await prisma.category.findUnique({
            include: {
                properties: {
                    include: {
                        propertyOptions: {
                            orderBy: {
                                index: 'asc'
                            }
                        },
                    },
                    orderBy: {
                        index: 'asc'
                    }
                },
                nature: true,
            }, where: {
                id: categoryId
            }
        })

        response.status = 200
        response.message = 'Property created'
        response.data = category
        return new Response(JSON.stringify(response))
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}

async function sortPropertiesIndex() {
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