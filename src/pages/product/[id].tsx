import {Product} from "@/types/Product";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import Link from "next/link";
import {FC} from "react";
import ProductCard from "@/components/ProductCard";
import PageContainer from "@/components/PageContainer";

interface ProductPageProps {
    product: Product;
}

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({
    params,
    res,
}: GetServerSidePropsContext) => {
    try {
        const response = await fetch(
            `${process.env.HOST}/api/products/${params!.id}`,
        );
        if (!response.ok) {
            throw new Error("Bad response");
        }

        res.setHeader(
            "Cache-Control",
            "public, s-maxage=10, stale-while-revalidate=59",
        );

        const data = (await response.json()) as Product;

        return {
            props: {
                product: data,
            },
        };
    } catch (error) {
        console.error(error);
        return {notFound: true};
    }
};

const ProductPage: FC<ProductPageProps> = ({product}) => {
    return (
        <PageContainer>
            <div className="mb-6">
                <Link
                    href="/"
                    className="text-blue-600 hover:underline hover:decoration-blue-600 focus:outline-none focus:underline focus:decoration-blue-600"
                >
                    На главную
                </Link>
            </div>

            <ProductCard product={product} />
        </PageContainer>
    );
};

export default ProductPage;
