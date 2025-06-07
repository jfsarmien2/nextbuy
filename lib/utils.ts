export function formatPrice(price: number): string { 
    return new Intl.NumberFormat("en-Us", {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}