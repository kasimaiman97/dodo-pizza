'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
import { ClearButton } from '../clear-button';
import { RequiredSymbol } from '../required-symbol';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const formatCardNumber = (value: string) => {
  return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

const formatCardExp = (value: string) => {
  return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(?=\d)/g, '$1/')
      .slice(0, 5);
};

const formatCardCode = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 4); // Limit to 3 or 4 digits
};

export const FormPaymentInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  // Handle formatting based on input type (cardNumber, cardExp, cardCode)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (name === 'cardNumber') {
      setValue(name, formatCardNumber(value), { shouldValidate: true });
    } else if (name === 'cardExp') {
      setValue(name, formatCardExp(value), { shouldValidate: true });
    } else if (name === 'cardCode') {
      setValue(name, formatCardCode(value), { shouldValidate: true });
    } else {
      setValue(name, value, { shouldValidate: true });
    }
  };

  return (
      <div className={className}>
        {label && (
            <p className="font-medium mb-2">
              {label} {required && <RequiredSymbol />}
            </p>
        )}

        <div className="relative">
          <Input
              className="h-12 text-md"
              {...register(name)}
              {...props}
              onChange={handleInputChange} // Handle change with formatting
          />
          {value && <ClearButton onClick={onClickClear} />}
        </div>
      </div>
  );
};