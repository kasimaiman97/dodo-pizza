import React from 'react';

export const ProductDescription = ({description}: {description: string}) => {
    const maxLength = 100; // Maximum length for description before truncating
    const truncatedDescription = description.length > maxLength
        ? description.slice(0, maxLength) + '...'
        : description;

    return (
        <div>
            <p className="text-sm text-gray-400">
                {truncatedDescription}
            </p>
        </div>
    );
};

export default ProductDescription;