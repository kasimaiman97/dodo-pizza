import {Prisma} from '@prisma/client';
import {prisma} from './prisma-client';
import path from "path";
import fs from "fs";

const randomDecimalNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10

const generateProductItem = (
    {
        productId,
        pizzaType,
        size,
    }: {
        productId: number;
        pizzaType?: 1 | 2;
        size?: 20 | 30 | 40;
    }) => {
    return {
        productId,
        price: randomDecimalNumber(190, 600),
        pizzaType,
        size,
    } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
    const productsFilePath = path.resolve(__dirname, 'seed.json'); // Adjust the path if needed
    const rawData = fs.readFileSync(productsFilePath, 'utf-8');
    const productsData = JSON.parse(rawData);

    await prisma.ingredient.createMany({
        data: productsData.ingredients,
    });

    for (const category_obj of productsData["products"]) {
        await prisma.category.create({
            data: {
                name: category_obj.name,
                products: {
                    create: category_obj.productItems.map((productItemData: any) => ({
                        name: productItemData.name,
                        imageUrl: productItemData.imageUrl,
                        items: category_obj.name === "Pizza 🍕" ? {
                            createMany: {
                                skipDuplicates: true,
                                data: [
                                    {
                                        price: parseFloat(productItemData.price) * 40 / 100 ,
                                        size: 20,
                                        pizzaType: 1,
                                    },
                                    {
                                        price: parseFloat(productItemData.price)* 40 / 100 ,
                                        size: 30,
                                        pizzaType: 1,
                                    },
                                    {
                                        price: parseFloat(productItemData.price)* 40 / 100 ,
                                        size: 40,
                                        pizzaType: 1,
                                    },
                                    {
                                        price: parseFloat(productItemData.price)* 40 / 100 ,
                                        size: 20,
                                        pizzaType: 2,
                                    },
                                    {
                                        price: parseFloat(productItemData.price)* 40 / 100 ,
                                        size: 30,
                                        pizzaType: 2,
                                    },
                                    {
                                        price: parseFloat(productItemData.price)* 40 / 100 ,
                                        size: 40,
                                        pizzaType: 2,
                                    },

                                ]
                            }
                        } : {
                            createMany: {
                                skipDuplicates: true,
                                data: [{
                                    price: parseFloat(productItemData.price)* 40 / 100 , // Random price for non-pizza items
                                }]
                            }
                        },
                        ingredients: {
                            connect: productItemData.ingredients?.map((ingredientId: number) => ({
                                id: ingredientId,
                            })) ?? [],
                        }
                    }))
                }
            },
        })
    }

    for (const storyData of productsData.story) {
        const createdStory = await prisma.story.create({
            data: {
                previewImageUrl: storyData.imageUrl,
            },
        });
        const storyItemsData = storyData.storyItems.map((sourceUrl: string) => ({
            sourceUrl,
            storyId: createdStory.id,
        }));
        await prisma.storyItem.createMany({
            data: storyItemsData,
        });
    }
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;

}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
