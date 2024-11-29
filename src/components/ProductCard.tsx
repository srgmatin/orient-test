import {Product} from "@/types/Product";
import {FC} from "react";
import Image from "next/image";

interface Props {
    product: Product;
}

const ProductCard: FC<Props> = ({product}) => {
    return (
        <div className="flex gap-16">
            <div className="bg-slate-100 w-[360px] h-[360px] rounded-lg flex-shrink-0">
                <Image
                    alt={product.title}
                    src={product.thumbnail}
                    width={360}
                    height={360}
                />
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <div>
                    <b>Стоимость:</b> ${product.price}
                </div>
                <div>
                    <b>Рейтинг:</b> {product.rating} / 5
                </div>
                <div>
                    <b>Артикул:</b> {product.sku}
                </div>
                <div>
                    <b>В наличии:</b> {product.stock} шт.
                </div>

                <p>
                    <b>Описание:</b> {product.description}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
