import { formalizeText } from "@/lib/my";
import prisma from "@/lib/prisma"
import { nature } from "@prisma/client";
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { name, nature } = await req.json()

        if(!name)
        {
            response.status = 400
            response.message = `Name is required.`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        if(!nature){
            response.status = 400
            response.message = `Please select parent nature.`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        let isExists = await prisma.nature.findUnique({
            where: {
                name: String(nature).toLocaleLowerCase()
            }
        })

        if (!isExists) {
            response.status = 400
            response.message = `Nature doesn't exists anymore.`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const dbNature = isExists

        isExists = await prisma.category.findUnique({
            where: {
                name: String(name).toLocaleLowerCase(),
                natureId: dbNature.id
            }
        })

        if (isExists) {
            response.status = 400
            response.message = `Category with name '${formalizeText(name)}' already exists in this nature.`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const category = await prisma.category.create({
            data: {
                name: String(name).toLocaleLowerCase(),
                natureId: dbNature.id,
                archived: false
            }
        })

        response.status = 200
        response.message = "Created."
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