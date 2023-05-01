import React from 'react';
import Garden, {GardenProps} from './Garden';
import Product, {ProductProps} from './Product';
import Plant from './Plant';

const Components = {
  garden: Garden,
  product: Product,
  plant: Plant,
};

export interface CardProps {
  type: keyof typeof Components;
}

type CardPropsType = GardenProps | ProductProps;

type CardMultipleProps = CardProps & CardPropsType;

const Card: React.FC<CardMultipleProps> = React.memo(
  React.forwardRef((props, ref) => {
    const {type, ...rest} = props;

    const CardComponents: React.ElementType =
      Components[type as keyof typeof Components];

    return (
      <CardComponents
        ref={ref}
        {...(rest as React.ComponentProps<typeof CardComponents>)}
      />
    );
  }),
);

export default Card;
