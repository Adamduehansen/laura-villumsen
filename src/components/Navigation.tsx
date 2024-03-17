'use client';

import { MenuItem } from '@/services/MenuRepository';
import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  menuItems: MenuItem[];
};

export default function Menu({ menuItems }: Props): React.JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
  }

  return (
    <div>
      <button onClick={toggleMobileMenu}>Menu</button>
      <nav>
        <ul
          className={classNames('fixed inset-0 bg-[#E8E6E7] duration-200', {
            'translate-y-0': isMobileMenuOpen,
            '-translate-y-full': !isMobileMenuOpen,
          })}
        >
          {menuItems.map((menuItem): React.JSX.Element => {
            return (
              <li key={menuItem.id}>
                <a href={menuItem.uri}>{menuItem.label}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
