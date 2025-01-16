import React from 'react';

import {
  Sheet, SheetContent,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import {Filters} from "@/shared/components";

export const FilterDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-72 bg-white overflow-y-scroll" side={"left"}>
        <Filters/>
      </SheetContent>
    </Sheet>
  );
};
