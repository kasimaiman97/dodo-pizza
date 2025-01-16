import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { cn } from '@/shared/lib/utils';

const VAT = 15;
const DELIVERY_PRICE = 9;

interface Props {
    totalAmount: number;
    loading?: boolean;
    className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

    return (
        <WhiteBlock className={cn('p-4 sm:p-6 sticky top-4', className)}>
            <div className="flex flex-col gap-1">
                <span className="text-lg sm:text-xl">Total:</span>
                {loading ? (
                    <Skeleton className="h-8 sm:h-11 w-32 sm:w-48" />
                ) : (
                    <span className="h-8 sm:h-11 text-[28px] sm:text-[34px] font-extrabold">
            {totalPrice} AED
          </span>
                )}
            </div>

            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Package className="mr-2 text-gray-400 text-base sm:text-lg" />
                        Total cart:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-5 sm:h-6 w-12 sm:w-16 rounded-[6px]" />
                    ) : (
                        `${totalAmount} AED`
                    )
                }
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Percent className="mr-2 text-gray-400 text-base sm:text-lg" />
                        Fees:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-5 sm:h-6 w-12 sm:w-16 rounded-[6px]" />
                    ) : (
                        `${vatPrice} AED`
                    )
                }
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Truck className="mr-2 text-gray-400 text-base sm:text-lg" />
                        Delivery:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-5 sm:h-6 w-12 sm:w-16 rounded-[6px]" />
                    ) : (
                        `${DELIVERY_PRICE} AED`
                    )
                }
            />

            <Button
                loading={loading}
                type="submit"
                className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl mt-4 sm:mt-6 text-sm sm:text-base font-bold">
                Place to order
                <ArrowRight className="w-4 sm:w-5 ml-2" />
            </Button>
        </WhiteBlock>
    );
};
