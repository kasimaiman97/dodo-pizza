
import {
    Container,
    Filters,
    Title,
    TopBar,
    ProductsGroupList,
    Stories,
} from '@/shared/components/shared';
import React, { Suspense } from 'react';
import {GetSearchParams, findPizzas, FindPizzasResult} from '@/shared/lib/find-pizzas';
import CartWidget from "@/shared/components/shared/cart-widget";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
    const categories: FindPizzasResult[] = await findPizzas(searchParams);

    return (
        <>
            <TopBar categories={categories.filter((category => category.products.length > 0))}/>
            <CartWidget className={"lg:hidden inline-flex"}/>
            <Container className="mt-5 flex items-center justify-between mx-auto max-w-[1280px] px-4 sm:px-8">
                <Title text="All you need to know" size="lg" className="font-extrabold"/>
            </Container>
            <Stories/>
            <Container
                className="mt-5 pb-14 flex items-center justify-between py-8 mx-auto max-w-[1280px] px-4 sm:px-8">
                <div className="flex gap-[80px]">
                    <div className="w-[250px] hidden lg:block">
                        <Suspense>
                            <Filters/>
                        </Suspense>
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(
                                (category) =>
                                    category.products.length > 0 && (
                                        <ProductsGroupList
                                            key={category.id}
                                            title={category.name}
                                            categoryId={category.id}
                                            items={category.products}
                                        />
                                    ),
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
