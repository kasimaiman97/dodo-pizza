import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Thank you for order! 🎉</h1>

    <p>Your order #{orderId} paid successful. List of items:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} AED x {item.quantity} шт. ={' '}
          {item.productItem.price * item.quantity} AED
        </li>
      ))}
    </ul>
  </div>
);
