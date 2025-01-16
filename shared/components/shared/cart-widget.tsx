'use client'


import React from 'react';
import {CartButton} from "@/shared/components";
import {cn} from "@/shared/lib/utils";

const CartWidget = ({className}: {className: string}) => {
    return (
        <div
             className={cn('fixed bottom-4 right-4 z-30', className)}>
            <CartButton/>
        </div>
    );
};

export default CartWidget;
