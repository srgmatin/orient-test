import {Product} from "@/types/Product";
import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const response = await fetch(
                "https://dummyjson.com/products?limit=100",
            );

            if (!response.ok) {
                throw new Error("Bad response");
            }

            const {products} = (await response.json()) as {products: Product[]};

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({error});
        }
    } else {
        res.status(405).send({message: "Method not allowed"});
    }
}
