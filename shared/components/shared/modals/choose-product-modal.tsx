'use client';

import {Dialog, DialogContent} from '@/shared/components/ui/dialog';
import {cn} from '@/shared/lib/utils';
import React from 'react';
import {useRouter} from 'next/navigation';
import {ProductWithRelations} from '@/@types/prisma';
import {ProductForm} from '../product-form';

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    ' w-[90vw]  bg-white overflow-y-scroll ',
                    className
                )}
            >
                <ProductForm product={product} onSubmit={() => router.back()}/>
            </DialogContent>
        </Dialog>
    );
};
