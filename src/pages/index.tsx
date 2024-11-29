import {Product} from "@/types/Product";
import {GetServerSideProps} from "next";
import {FC, memo} from "react";
import ProductList from "@/components/ProductList";
import PageContainer from "@/components/PageContainer";
import SearchInput from "@/components/SearchInput";
import NoItems from "@/components/NoItems";
import {useSearchContext} from "@/shared/SearchContext";

interface HomePageProps {
    products: Product[];
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
    res,
}) => {
    try {
        const response = await fetch(`${process.env.HOST}/api/products`);
        if (!response.ok) {
            throw new Error("Bad response");
        }
        const products = (await response.json()) as Product[];

        if (!products) {
            return {notFound: true};
        }

        res.setHeader(
            "Cache-Control",
            "public, s-maxage=10, stale-while-revalidate=59",
        );

        return {
            props: {
                products,
            },
        };
    } catch (error) {
        console.error(error);
        return {notFound: true};
    }
};

const HomePage: FC<HomePageProps> = ({products = []}) => {
    const {searchValue, onSearch} = useSearchContext();

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchValue.trim().toLowerCase()),
    );

    return (
        <PageContainer>
            <div className="mb-10">
                <SearchInput value={searchValue} onChange={onSearch} />
            </div>

            {filteredProducts.length > 0 ? (
                <ProductList products={filteredProducts} />
            ) : (
                <NoItems />
            )}
        </PageContainer>
    );
};

export default memo(HomePage);
