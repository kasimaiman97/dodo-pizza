'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  details,
  className,
  disabled,
}) => {
  return (
      <div
          className={cn(
              'flex items-center justify-start gap-5',
              {
                  'opacity-50 pointer-events-none': disabled,
              },
              className,
          )}>
          <CartItemDetails.Image src={imageUrl}/>
          <div className={"w-full grid grid-cols-1 sm:grid-cols-2 gap-1 justify-center items-center"}>
              <CartItemDetails.Info name={name} details={details}/>
              <CartItemDetails.Price value={price}/>
          </div>

          {/*<div className="flex items-center gap-5 ml-20">*/}
          {/*    <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity}/>*/}
          {/*    <button type="button" onClick={onClickRemove}>*/}
          {/*        <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20}/>*/}
          {/*    </button>*/}
          {/*</div>*/}
      </div>
  );
};
