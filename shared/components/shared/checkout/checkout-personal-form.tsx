import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Personal info" className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormInput name="fullName" className="text-base" placeholder="Full Name" />
        <FormInput name="phone" className="text-base" placeholder="Phone Number" />
      </div>
    </WhiteBlock>
  );
};
