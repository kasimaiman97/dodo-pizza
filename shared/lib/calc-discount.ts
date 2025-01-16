export function calcDiscount(price: number | string) {
    const discountPercent = 40
    const discountedPrice = Math.floor(Number(price) * 100 / discountPercent)
    return {
        discountPercent,
        discountedPrice
    }
}