import React from 'react';

interface Props {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({orderId, totalAmount, paymentUrl}) => (
    <div>
        <h1>Order #{orderId}</h1>

        <p>
            Pay for the order in the amount of <b>{totalAmount} AED</b>. Go{' '}
            <a href={paymentUrl}>to this link</a> to pay for the order.
        </p>

    </div>
);
