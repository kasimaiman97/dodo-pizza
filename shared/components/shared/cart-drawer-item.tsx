import {cn} from '@/shared/lib/utils';
import React from 'react';

import * as CartItem from './cart-item-details';
import {CartItemProps} from './cart-item-details/cart-item-details.types';
import {CountButton} from './count-button';
import {Trash2Icon} from 'lucide-react';

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
                                                    imageUrl,
                                                    name,
                                                    price,
                                                    quantity,
                                                    details,
                                                    disabled,
                                                    onClickCountButton,
                                                    onClickRemove,
                                                    className,
                                                }) => {
    return (
        <div
            className={cn(
                'flex bg-white p-3',
                {
                    'opacity-50 pointer-events-none': disabled,
                },
                className,
            )}>
            <div className={cn(className, 'p-2 flex flex-col justify-between items-center')}>
                <CartItem.Image src={imageUrl}/>
                <Trash2Icon
                    onClick={onClickRemove}
                    className="text-gray-400 cursor-pointer hover:text-gray-600"
                    size={16}
                />
            </div>
            <div className="flex-1">
                <CartItem.Info name={name} details={details}/>

                <hr className="my-3"/>

                <div className="flex items-center justify-between">
                    <CountButton size={"sm"} onClick={onClickCountButton} value={quantity}/>
                    <div className="flex items-center gap-3">
                        <CartItem.Price value={price}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
