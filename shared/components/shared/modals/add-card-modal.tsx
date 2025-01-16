'use client';

import {Dialog, DialogContent} from '@/shared/components/ui/dialog';
import {cn} from '@/shared/lib/utils';
import React from 'react';
import {FormInput, FormTextarea} from '../form';
import {AmericanExpress, Button, ErrorText, MasterCard, Title, Visa} from "@/shared/components";
import {FormProvider, useForm} from "react-hook-form";
import {cardFormSchema, CardFormValues} from "@/shared/constants";
import {zodResolver} from "@hookform/resolvers/zod";


interface Props {
    open: boolean;
    onClose: () => void;
    setCurrentCart: (data: CardFormValues) => void;
}

export const AddCardModal: React.FC<Props> = ({open, onClose, setCurrentCart}) => {
    const [loading, setLoading] = React.useState(false);

    const form = useForm<CardFormValues>({
        resolver: zodResolver(cardFormSchema),
        defaultValues: {
            cardNumber: '',
            cardExp: '',
            cardCode: '',
            cardHolder: '',
        },
    });

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cardData');
            if (storedCart) {
                const parsedData = JSON.parse(storedCart);
                form.reset({
                    cardNumber: parsedData.cardNumber || '',
                    cardExp: parsedData.cardExp || '',
                    cardCode: '***',
                    cardHolder: parsedData.cardHolder || '',
                });
            }
        }
    }, [open]);

    const handleClose = () => {
        onClose();
    };
    const customStyle = {borderStyle: 'none', height: '1.75rem'}

    const onSubmit = async (data: CardFormValues) => {
        setLoading(true);
        setCurrentCart(data)
        if (typeof window !== 'undefined') {
            localStorage.setItem('cardData', JSON.stringify(data));
        }
        setTimeout(()=> {
            setLoading(false);
            handleClose();
        }, 3000)
    }


    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent
                className={cn(
                    ' w-[90vw] max-w-[550px] min-w-[280px] bg-white p-1 sm:p-10 overflow-y-scroll',
                )}
            >

                <div className="flex flex-col justify-center items-start gap-5 p-3">
                    <Title text="Adding card" size="md" className="font-bold"/>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className="card flex-col rounded-md shadow-sm p-3 bg-white border border-gray-300">
                                <FormInput
                                    style={{borderStyle: 'none'}}
                                    name="cardNumber"
                                    className="text-base border-none sm:h-12"
                                    placeholder="4321 1234 5678 8753"
                                />
                                <div className="flex flex-row gap-5 mt-3">
                                    <FormInput
                                        style={customStyle}
                                        name="cardExp"
                                        className="text-base border-none sm:h-12"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                    />
                                    <FormInput
                                        style={customStyle}
                                        name="cardCode"
                                        className="text-base border-none sm:h-12"
                                        placeholder="CVV"
                                        maxLength={4}
                                    />
                                </div>
                                <FormInput
                                    style={customStyle}
                                    name="cardHolder"
                                    className="text-base pt-5"
                                    placeholder="Card Holder Name"
                                />
                            </div>

                            <Button
                                loading={loading}
                                type="submit"
                                className="h-12 w-full mt-5 "
                            >
                                Save
                            </Button>
                        </form>
                    </FormProvider>

                    <div className="mt-5 text-sm text-gray-600">
                        <p className="mb-2">
                            By adding your card, you agree to our{' '}
                            <a href="https://drive.google.com/file/d/16SBImDU2Po226qhtT7y9tFcldfbv--nr/view" className="text-blue-500 underline">
                                Terms and Conditions
                            </a>.
                        </p>
                        <p className="mb-4 text-xs text-gray-400">
                            We ensure that your data is securely stored and transmitted using advanced encryption
                            technology. Your card information is processed in compliance with PCI DSS standards.
                        </p>
                        <div className="flex items-center gap-3 justify-center">
                            <MasterCard className="w-8 h-8"/>
                            <Visa className="w-8 h-8"/>
                            <AmericanExpress className="w-8 h-8"/>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
        ;
};
