import {cn} from '@/shared/lib/utils';
import React from 'react';
import {Container} from './container';
import {FindPizzasResult} from "@/shared/lib/find-pizzas";
import Link from "next/link";

interface Props {
    className?: string;
    categories?: FindPizzasResult[];
}

export const CategorySelector: React.FC<Props> = ({className, categories}) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 ', className)}>
            <Container className="flex items-center justify-between mx-auto max-w-[1280px] px-4 sm:px-8 gap-3">
                {categories?.length && categories.map(({name, id}, index) => (
                    <Link key={id} className={cn('flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10',)}
                          href={`/#${name}`}> <span>{name}</span>
                    </Link>
                ))}
            </Container>
        </div>
    );
};
