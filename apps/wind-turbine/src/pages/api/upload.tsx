import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, TurbineData } from "@prisma/client";
import multer from 'multer';
import { IncomingForm } from 'formidable';

const prisma = new PrismaClient();

const upload = multer({ dest: 'uploads/' });

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

export const config = {
    api: {
        bodyParser: false,
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
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({ error: "Invalid request" });
            }
            // TODO: Handle the uploaded files, maybe save them in your database, etc.
            res.status(200).json({ success: true, message: "File uploaded successfully" });
        });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
