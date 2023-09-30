import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, TurbineData } from "@prisma/client";

const prisma = new PrismaClient();

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
  if (req.method === "GET") {
    try {
      const data = await getFirst10TurbineData();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
