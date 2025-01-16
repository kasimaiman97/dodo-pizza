import {cn} from '@/shared/lib/utils';
import React from 'react';
import {Container} from './container';
import {FilterButton} from "@/shared/components/shared/filter-button";
import {CartButton, SearchInput} from "@/shared/components";
import {FindPizzasResult} from "@/shared/lib/find-pizzas";

interface Props {
    className?: string;
    categories?: FindPizzasResult[];
}

export const TopBar: React.FC<Props> = ({className, categories}) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 ', className)}>
            <Container className="flex items-center justify-between mx-auto max-w-[1280px] px-4 sm:px-8 gap-3">
                <SearchInput categories={categories} />
                <FilterButton className={"lg:hidden block"}/>
                <CartButton className={"lg:inline-flex hidden"}/>
            </Container>
        </div>
    );
};
