import {cn} from '@/shared/lib/utils';
import React from 'react';

interface Props {
    className?: string;
    imageUrl: string;
    size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({imageUrl, size, className}) => {
    return (
        <div className={cn('flex items-center justify-center flex-1 relative w-full min-h-[400px]', className)}>
            <img
                src={imageUrl}
                alt="Logo"
                className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
                    // Для экрана меньше lg (максимум 320px)
                    'w-[280px] h-[280px]': size === 40,
                    'w-[230px] h-[230px]': size === 30,
                    'w-[200px] h-[200px]': size === 20,


                    // Для экрана больше lg
                    'sm:w-[300px] sm:h-[300px]': size === 20,
                    'sm:w-[350px] sm:h-[350px]': size === 30,
                    'sm:w-[400px] sm:h-[400px]': size === 40,
                })}

            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-red-100
      w-[260px] h-[260px]
      sm:w-[365px] sm:h-[365px]"
            />
            <div
                style={{
                    width: '220px',
                    height: '220px',
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-red-200
      sm:w-[330px] sm:h-[330px]"
            />
        </div>
    );
};
