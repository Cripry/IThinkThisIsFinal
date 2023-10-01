import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, TurbineData } from "@prisma/client";
import { parse } from 'querystring';
import { v4 as uuidv4 } from 'uuid'; // Add this line
import fs from 'fs'; // Add this line
import path from 'path'; // Add this line

const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false,
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


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Handler Triggered");  // Add this line
    if (req.method === "GET") {
        try {
            const data = await getFirst10TurbineData();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    } else if (req.method === "POST") {
        const data: any = [];
        req.on('data', chunk => {
            data.push(chunk);
        });
        req.on('end', () => {
            const buffer = Buffer.concat(data);

            // Generate a unique file name with uuid
            const fileUuid = uuidv4();
            const fileExtension = '.txt'; // Replace this with logic to get the actual file extension
            const fileName = `${fileUuid}${fileExtension}`;

            const uploadPath = path.join(process.cwd(),'uploads', fileName);

            fs.writeFile(uploadPath, buffer, (err) => {
                if (err) {
                    console.error('Error writing file:', err);  // Log the error
                    return res.status(500).json({ success: false, message: 'Failed to write file' });
                }
                res.status(200).json({ success: true, message: 'File uploaded successfully' });
            });
        });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}