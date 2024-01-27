import prisma from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {

    const response = {
        status: 500,
        message: 'Internal Server Error',
        data: null as any
    }

    try {

        let { dateOfPurchase, accountId } = await req.json()

        if (!dateOfPurchase) {
            dateOfPurchase = new Date()
        }

        const newInvoice = await prisma.purchase.create({
            data: {
                dateOfPurchase: dateOfPurchase,
                accountId: String(accountId),
            }
        })

        response.status = 200;
        response.message = 'Success';
        response.data = newInvoice;
        return new Response(JSON.stringify(response));
    } catch (error: any) {
        console.log('[SERVER ERROR]: ' + error.message);
        response.status = 500;
        response.message = error.message;
        response.data = null;
        return new Response(JSON.stringify(response));
    }

}