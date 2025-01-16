import { cn } from '@/shared/lib/utils';

interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold text-md sm:text-right', className)}>{value} AED</h2>;
};
