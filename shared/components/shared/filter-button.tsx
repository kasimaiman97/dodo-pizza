import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Button } from '../ui';
import {FilterDrawer} from "@/shared/components/shared/filter-drawner";
import {Filter} from "lucide-react";

interface Props {
  className?: string;
}


export const FilterButton: React.FC<Props> = ({ className }) => {

    return (
      <FilterDrawer>
        <Button variant={"outline"}
            className={cn('group relative', className)}>
            <Filter size={16}/>
        </Button>
      </FilterDrawer>
  );
};