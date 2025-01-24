import Link from 'next/link';
import React from 'react';
import {Title} from './title';
import {Button} from '../ui';
import {Plus} from 'lucide-react';
import {calcDiscount} from "@/shared/lib/calc-discount";
import {ProductDescription} from "@/shared/components";

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
    description: string;
}

export const ProductCard: React.FC<Props> = ({
                                                 id,
                                                 name,
                                                 price,
                                                 imageUrl,
                                                 description,
                                                 className,
                                             }) => {


    const [discounted, setDiscount] = React.useState({
        originalPrice: 0,
        discountedPrice: 0,
        discountPercent: 0,
    })

    React.useEffect(() => {
        setDiscount({...calcDiscount(price), originalPrice: price});
    }, [])


    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className="relative flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    {/* Image */}
                    <img className="w-[215px] h-[215px]" src={imageUrl} alt={name}/>

                    {/* Discount Badge */}
                    {discounted.originalPrice > 0 && (
                        <div
                            className="absolute top-2 right-2 bg-primary text-white rounded-[4px] w-12 h-7 flex items-center justify-center text-xs font-bold">
                            -{discounted.discountPercent}%
                        </div>
                    )}
                </div>

                {/* Product Title */}
                <Title text={name} size="sm" className="mb-1 mt-3 font-bold"/>

                {/*/!* Ingredients *!/*/}
                {/*<p className="text-sm text-gray-400">*/}
                {/*    {description}*/}
                {/*</p>*/}

                <ProductDescription description={description} />

                <div className="flex justify-between items-center mt-4">
                    {/* Price and Skeleton Loader */}
                    {discounted.originalPrice > 0 ? (
                        <div className="flex flex-col">
                            <span className="text-[20px]">AED <b>{discounted.originalPrice}</b></span>
                            <span
                                className="text-[15px] text-primary line-through">AED <b>{discounted.discountedPrice}</b></span>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <div className="w-[100px] h-[20px] bg-gray-300 animate-pulse rounded"></div>
                            <div className="w-[70px] h-[20px] bg-gray-300 animate-pulse rounded"></div>
                        </div>
                    )}

                    {/* Add Button */}
                    <Button variant="secondary" className="text-base font-bold">
                        <Plus size={20} className="mr-1"/>
                        Add
                    </Button>
                </div>
            </Link>
        </div>

    );
};
