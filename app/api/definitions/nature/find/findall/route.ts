import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const nature = await prisma?.nature.findMany({
            orderBy: {
                name: "asc"
            }
        })

        if (!nature) {
            response.status = 404
            response.message = "Nature doesn't exists."
            response.data = null
            return new Response(JSON.stringify(response))
        }

        response.status = 200
        response.message = "Found nature."
        response.data = nature
        return new Response(JSON.stringify(response))
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}