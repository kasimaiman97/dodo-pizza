'use client';

import React from 'react';
import {WhiteBlock} from '../white-block';
import {FormInput, FormTextarea} from '../form';

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({className}) => {

    return (
        <WhiteBlock title="3. Delivery address" className={className}>
            <div className="flex flex-col gap-5">
                <FormInput
                    name="buildingName"
                    className="text-base"
                    placeholder="Building Name"
                />
                <FormInput
                    name="roomNumber"
                    className="text-base"
                    placeholder="Room/Apartment"
                />
                <FormInput
                    name="street"
                    className="text-base"
                    placeholder="Street (e.g., Al Marsa Street)"
                />
                <FormInput
                    name="community"
                    className="text-base"
                    placeholder="(e.g., Dubai Marina)"
                />

                <FormTextarea
                    name="comment"
                    className="text-base"
                    placeholder="Comment to the order"
                    rows={5}
                />
            </div>
        </WhiteBlock>
    );
};
