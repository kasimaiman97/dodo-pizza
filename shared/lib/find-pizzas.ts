import {prisma} from '@/prisma/prisma-client';
import {Prisma} from '@prisma/client';

export interface GetSearchParams {
    query?: string;
    sortBy?: 'price' | 'rating' | 'name'; // Если есть фиксированные значения сортировки
    sizes?: string; // CSV строка
    pizzaTypes?: string; // CSV строка
    ingredients?: string; // CSV строка
    priceFrom?: string; // Может быть строкой или числом
    priceTo?: string;   // Может быть строкой или числом
}


export type FindPizzasResult = Prisma.CategoryGetPayload<{
    include: {
        products: {
            include: {
                ingredients: true;
                items: true;
            };
        };
    };
}>;


const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (
    params: GetSearchParams
): Promise<FindPizzasResult[]> => {
    const sizes = params.sizes?.split(',').map(Number);
    const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
    const ingredientsIdArr = params.ingredients?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    return await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc',
                },
                where: {
                    ingredients: ingredientsIdArr
                        ? {
                            some: {
                                id: {
                                    in: ingredientsIdArr,
                                },
                            },
                        }
                        : undefined,
                    items: {
                        some: {
                            size: {
                                in: sizes,
                            },
                            pizzaType: {
                                in: pizzaTypes,
                            },
                            price: {
                                gte: minPrice, // >=
                                lte: maxPrice, // <=
                            },
                        },
                    },
                },
                include: {
                    ingredients: true,
                    items: {
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                        orderBy: {
                            price: 'asc',
                        },
                    },
                },
            },
        },
    });
};
