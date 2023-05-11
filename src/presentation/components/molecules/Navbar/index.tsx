import React from 'react';
import Default, {DefaultProps} from './Default';
import Logo from './Logo';
import Commerce, {CommerceProps} from './Commerce';
import Back, {BackProps} from './Back';

const Components = {
  default: Default,
  commerce: Commerce,
  logo: Logo,
  back: Back,
};

export interface NavbarProps {
  type: keyof typeof Components;
}

type NavbarPropsType = DefaultProps & BackProps & CommerceProps;

type NavbarMultipleProps = NavbarProps & NavbarPropsType;

const Navbar: React.FC<NavbarMultipleProps> = React.memo(
  React.forwardRef((props, ref) => {
    const {type, ...rest} = props;

    const NavbarComponents: React.ElementType =
      Components[type as keyof typeof Components];

    return (
      <NavbarComponents
        ref={ref}
        {...(rest as React.ComponentProps<typeof NavbarComponents>)}
      />
    );
  }),
);

export default Navbar;
