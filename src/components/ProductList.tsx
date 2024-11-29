import Image from "next/image";
import {Product} from "@/types/Product";
import Link from "next/link";
import {FC, memo} from "react";

interface Props {
    products: Product[];
}

const ProductList: FC<Props> = ({products}) => {
    return (
        <div className="grid gap-x-4 gap-y-8 grid-cols-4">
            {products.map((product) => (
                <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="rounded-xl shadow-md hover:shadow-lg p-4 block"
                >
                    <div className="flex flex-col h-full">
                        <div className="bg-slate-100 w-[180px] h-[180px] rounded-lg mx-auto">
                            <Image
                                alt={product.title}
                                src={product.thumbnail}
                                width={180}
                                height={180}
                            />
                        </div>
                        <div className="my-3 font-semibold">
                            {product.title}
                        </div>
                        <div className="line-clamp-2 text-xs mt-auto">
                            {product.description}
                        </div>
                        <div className="mt-2">${product.price}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default memo(ProductList);
