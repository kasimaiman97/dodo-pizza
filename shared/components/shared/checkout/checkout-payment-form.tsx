'use client';

import React from 'react';
import {WhiteBlock} from '../white-block';
import {AmericanExpress, MasterCard, Visa, Unknown} from "@/shared/components/shared/checkout";
import {Button, ErrorText} from "@/shared/components";
import {Edit, Plus} from "lucide-react";
import {CardType} from "@/app/(checkout)/checkout/page";
import {getCardType} from "@/shared/lib/get-card-type";
import {cn} from "@/shared/lib/utils";

interface Props {
    className?: string;
    handleOpenModal: () => void;
    currentCart: CardType | null;
    errorText?: string;
}

const CardLogo: {
    [key in "visa" | "master_card" | "american_express" | 'unknown']: React.ComponentType<any>
} = {
    "visa": Visa,
    "master_card": MasterCard,
    "american_express": AmericanExpress,
    "unknown": Unknown
};

export const CheckoutPaymentForm: React.FC<Props> = ({className, handleOpenModal, currentCart, errorText}) => {

    const renderCardHolder = (cardHolder: string) => {
        const cardHolderList = cardHolder.split(" ");
        return `${cardHolderList[0][0]}. ${cardHolderList[1]}`;
    };

    const cardType = getCardType(currentCart?.cardNumber || "");

    const CardIcon = CardLogo[cardType];

    return (
        <WhiteBlock title="4. Payment method" className={className}>
            <div className={'flex justify-between items-center'}>
                {currentCart && (
                    <div className="flex gap-5 justify-start items-center">
                        <CardIcon className={''}/>
                        <div className={'flex flex-col'}>
                            <div className={'flex'}>
                                <h2 className={'text-base leading-6 sm:block hidden flex-1'}>{currentCart.cardHolder}</h2>
                                <h2 className={'text-base leading-6 sm:hidden block flex-1'}>{renderCardHolder(currentCart.cardHolder)}</h2>
                            </div>
                            <p className="text-xs text-gray-400 sm:text-sm w-[90%]">** {currentCart.cardNumber.slice(currentCart.cardNumber.length - 4, currentCart.cardNumber.length)}</p>
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-5">
                    <Button type={"button"} onClick={handleOpenModal} variant={'link'}
                            className="flex items-center gap-1">
                        {
                            currentCart ?
                                <Edit size={16} className={'mr-1'}/> :
                                <Plus size={16} className={'mr-3'}/>
                        }
                        <span
                            className={cn("md:inline", {"hidden": currentCart})}>{currentCart ? "Edit" : "Add payment methods"}</span>
                    </Button>
                </div>

            </div>
            {errorText && <ErrorText text={errorText} className="mt-2"/>}
        </WhiteBlock>
    );
};
