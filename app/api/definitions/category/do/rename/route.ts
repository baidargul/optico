import { formalizeText } from "@/lib/my";
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
            response.status = 404
            response.message = `Invalid category`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        if (!name) {
            response.status = 404
            response.message = `Name cannot be empty`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        let isExists: any = await prisma.category.findFirst({
            where: {
                name: name,
                NOT: {
                    id: id
                }
            }
        })

        if (isExists) {
            response.status = 404
            response.message = `Category with name: '${formalizeText(name)}' already exists.`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        isExists = await prisma.category.findUnique({
            include: {
                nature: true
            },
            where: {
                id: id
            }
        })

        if (!isExists) {
            response.status = 400
            response.message = `Category '${formalizeText(name)}' not found.`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const natureId = isExists.natureId
        isExists = await prisma.nature.findUnique({
            where: {
                id: natureId
            }
        })

        if (!isExists) {
            response.status = 400
            response.message = `Category's nature not found.`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const updated = await prisma.category.update({
            data: {
                name: String(name).toLocaleLowerCase()
            },
            where: {
                id: id
            }
        })

        response.status = 200
        response.message = `Updated`
        response.data = updated
        return new Response(JSON.stringify(response))
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}