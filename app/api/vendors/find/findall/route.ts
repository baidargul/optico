import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const vendors = await prisma.vendor.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        response.status = 200;
        response.message = 'Vendors fetched';
        response.data = vendors;
        return new Response(JSON.stringify(response));

    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}