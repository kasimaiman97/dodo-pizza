import {PaymentData} from '@/@types/yookassa';
import axios from 'axios';
import {CardFormValues} from "@/shared/constants";

interface Props {
    description: string;
    orderId: number;
    amount: number;
    cardData: CardFormValues
}

export async function createPayment(details: Props) {
    const FAKE_PAYMENT_GATE_URL = process.env.FAKE_PAYMENT_GATE_URL || "http://localhost:8000"
    const {data} = await axios.post<PaymentData>(
        FAKE_PAYMENT_GATE_URL + "/payments/create/" ,
        {
            amount: details.amount.toString(),
            currency: 'AED',

            cardholder_name: details.cardData.cardHolder,
            card_number: details.cardData.cardNumber,
            card_expiry_date: details.cardData.cardExp,
            card_cvv: details.cardData.cardCode,

            capture: true,
            description: details.description,
            metadata: {
                order_id: details.orderId,
            },
            confirmation: {
                type: 'redirect',
                return_url: process.env.YOOKASSA_CALLBACK_URL,
            },
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Idempotence-Key': Math.random().toString(36).substring(7),
            },
        },
    );

    return data;
}
