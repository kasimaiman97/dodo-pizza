import {cn} from '@/shared/lib/utils';
import React from 'react';
import {Title} from './title';
import {Button} from '../ui';

interface Props {
    imageUrl: string;
    name: string;
    price: number;
    loading?: boolean;
    onSubmit?: VoidFunction;
    className?: string;
    description: string;
}

/**
 * Форма выбора ПРОДУКТА
 */
export const ChooseProductForm: React.FC<Props> = ({
                                                       name,
                                                       imageUrl,
                                                       description,
                                                       price,
                                                       onSubmit,
                                                       className,
                                                       loading,
                                                   }) => {
    return (
        <div className={cn(className, 'flex flex-col lg:flex-row flex-1')}>
            <div className="flex items-center justify-center flex-1 relative sm:min-h-[600px]">
                <img
                    src={imageUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all duration-300 w-[260px] sm:bg-contain"
                />
            </div>

            <div className="w-full lg:w-[490px] bg-[#f7f6f5] p-2 md:p-7">
                <Title text={name} size="md" className="font-extrabold mb-1"/>
                <p className="text-lg text-gray-400">
                    {description}
                </p>

                <Button
                    loading={loading}
                    onClick={() => onSubmit?.()}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Add to cart for {price} AED
                </Button>
            </div>
        </div>
    );
};
