import {Product} from "@/types/Product";
import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const id = req.query.id;
            if (!id || isNaN(+id)) {
                res.status(400).send({error: "Bad request"});
            }
            const response = await fetch(
                `https://dummyjson.com/products/${id}`,
            );

            if (!response.ok) {
                throw new Error("Bad response");
            }

            const data = (await response.json()) as Product;

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({error});
        }
    } else {
        res.status(405).send({error: "Method not allowed"});
    }
}
