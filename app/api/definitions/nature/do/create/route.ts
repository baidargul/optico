import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { name } = await req.json()

        const isExists = await prisma?.nature.findUnique({
            where: {
                name: name
            }
        })

        if (isExists) {
            response.status = 400
            response.message = `${name} already exists.`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const nature = await prisma?.nature.create({
            data: {
                name: name
            }
        })

        if(!nature){
            response.status = 500
            response.message = `Unable to create nature.`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        response.status = 200
        response.message = `Created`
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