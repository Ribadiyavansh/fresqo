export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    discount: string;
    images: string[];
    ingredients: string[];
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Variety Pack',
        description: '4 unique flavors in one pack',
        price: 349,
        originalPrice: 449,
        discount: '22% OFF',
        images: ['/images/product-variety.jpg', '/images/product-variety.jpg', '/images/product-variety.jpg', '/images/product-variety.jpg'],
        ingredients: ['Natural fruit extracts', 'Citric acid', 'Sodium bicarbonate', 'Natural colors'],
    },
    {
        id: 2,
        name: 'Cosmopolitan Ball',
        description: 'Classic cranberry-citrus blend',
        price: 349,
        originalPrice: 449,
        discount: '22% OFF',
        images: ['/images/product-cosmopolitan.jpg', '/images/product-cosmopolitan.jpg', '/images/product-cosmopolitan.jpg', '/images/product-cosmopolitan.jpg'],
        ingredients: ['Cranberry extract', 'Lime extract', 'Orange peel', 'Natural pink color'],
    },
    {
        id: 3,
        name: 'Sex on the Beach',
        description: 'Tropical peach-orange delight',
        price: 349,
        originalPrice: 449,
        discount: '22% OFF',
        images: ['/images/product-sexonthebeach.jpg', '/images/product-sexonthebeach.jpg', '/images/product-sexonthebeach.jpg', '/images/product-sexonthebeach.jpg'],
        ingredients: ['Peach extract', 'Orange extract', 'Cranberry', 'Natural orange color'],
    },
    {
        id: 4,
        name: 'Kala Khatta Ball',
        description: 'Authentic Indian flavor',
        price: 349,
        originalPrice: 449,
        discount: '22% OFF',
        images: ['/images/product-kalakhatta.jpg', '/images/product-kalakhatta.jpg', '/images/product-kalakhatta.jpg', '/images/product-kalakhatta.jpg'],
        ingredients: ['Kala khatta extract', 'Black salt', 'Lime', 'Natural purple color'],
    },
    {
        id: 5,
        name: 'Watermelon Mint',
        description: 'Refreshing summer favorite',
        price: 349,
        originalPrice: 449,
        discount: '22% OFF',
        images: ['/images/product-watermelon.jpg', '/images/product-watermelon.jpg', '/images/product-watermelon.jpg', '/images/product-watermelon.jpg'],
        ingredients: ['Watermelon extract', 'Mint extract', 'Lime', 'Natural green-pink color'],
    },
];
