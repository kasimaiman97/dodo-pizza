'use client';

import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {
    CheckoutSidebar,
    Container,
    Title,
    CheckoutAddressForm,
    CheckoutCart,
    CheckoutPersonalForm, AddCardModal,
} from '@/shared/components';
import {CheckoutFormValues, checkoutFormSchema} from '@/shared/constants';
import {useCart} from '@/shared/hooks';
import {createOrder} from '@/app/actions';
import toast from 'react-hot-toast';
import React from 'react';
import {CheckoutPaymentForm} from "@/shared/components/shared/checkout/checkout-payment-form";


export interface CardType {
    cardHolder: string;
    cardNumber: string;
    cardExp: string;
    cardCode: string;
}

export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false);
    const {totalAmount, updateItemQuantity, items, removeCartItem, loading} = useCart();
    const [openAddCardModal, setAddCardModal] = React.useState(false);
    const [currentCart, setCurrentCart] = React.useState<CardType | null>(null);
    const [paymentMethodError, setPaymentMethodError] = React.useState('');

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cardData');
            if (storedCart) {
                setCurrentCart(JSON.parse(storedCart));
            }
        }
    }, []);

    React.useEffect(()=> {
        if (currentCart){
            setPaymentMethodError('')
        }
    }, [currentCart])


    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            comment: '',

            buildingName: '',
            roomNumber: '',
            street: '',
            community: ''
        },
    });


    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);

            if (!currentCart) {
                setPaymentMethodError('Please provide a payment method to complete the payment process.')
                setSubmitting(false);
                return;
            }else {
                setPaymentMethodError('')
            }

            const url = await createOrder({data, cardData: currentCart});
            if (url) {
                location.href = url;
            }
        } catch (err) {
            console.log(err);
            setSubmitting(false);
            toast.error('Failed to create order.', {
                icon: '❌',
            });
        }
        finally {
            setSubmitting(false);
        }
    };

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="mt-10 px-4 sm:px-6 lg:px-8">
            <Title text="Order placement" className="font-extrabold mb-8 text-[24px] sm:text-[30px] lg:text-[36px]"/>
            <AddCardModal
                setCurrentCart={setCurrentCart}
                open={openAddCardModal} onClose={() => setAddCardModal(false)}/>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row gap-10 sm:mb-0 mb-10">

                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />

                            <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''}/>

                            <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''}/>
                            <CheckoutPaymentForm
                                errorText={paymentMethodError}
                                currentCart={currentCart}
                                className={loading ? 'opacity-40 pointer-events-none' : ''}
                                handleOpenModal={() => setAddCardModal(true)}
                            />

                        </div>

                        {/* Правая часть */}
                        <div className="w-full lg:w-[450px] gap-2">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting}/>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
