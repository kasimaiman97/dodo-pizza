export function getCardType(cardNumber: string): "visa" | "master_card" | "american_express" | "unknown" {
    const sanitizedCardNumber = cardNumber.replace(/\D/g, '');

    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(sanitizedCardNumber)) {
        return 'visa';
    } else if (/^5[1-5][0-9]{14}$/.test(sanitizedCardNumber)) {
        return 'master_card';
    } else if (/^3[47][0-9]{13}$/.test(sanitizedCardNumber)) {
        return 'american_express';
    } else {
        return 'unknown';
    }
}
