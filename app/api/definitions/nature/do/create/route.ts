import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        const { name, dynamic } = await req.json()

        if (!name) {
            response.status = 400
            response.message = `Please specify name`
            response.data = null
            return new Response(JSON.stringify(response))
        }

        const isExists = await prisma?.nature.findUnique({
            where: {
                name: String(name).toLocaleLowerCase()
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
                name: String(name).toLocaleLowerCase(),
                dynamic: dynamic ? dynamic : false
            }
        })

        if (!nature) {
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