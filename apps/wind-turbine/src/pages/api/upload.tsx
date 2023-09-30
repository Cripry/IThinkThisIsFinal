import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, TurbineData } from "@prisma/client";
import { parse } from 'querystring';

const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // you can set the size limit for the body parser here
        },
    },
};



async function getFirst10TurbineData(): Promise<TurbineData[]> {
    try {
        const categories = await prisma.turbineData.findMany({
            take: 10,
            orderBy: {
                record_time: 'desc'
            }
        });

        return categories;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export const apiConfig = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // you can set the size limit for the body parser here
        },
    },
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const data = await getFirst10TurbineData();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    } else if (req.method === "POST") {
        const buffer = await req.body;
        const text = buffer.toString();
        const parsed = parse(text);
        // TODO: Handle the uploaded files, maybe save them in your database, etc.
        res.status(200).json({ success: true, message: "File uploaded successfully" });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
