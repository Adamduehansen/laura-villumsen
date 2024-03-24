'use client';

import { usePathname } from 'next/navigation';

function getBreadcrumbPath(pathname: string): string {
  if (pathname === '/') {
    return 'work';
  } else if (pathname.includes('case')) {
    return 'case';
  }

  return pathname.substring(1);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.substring(1, str.length);
}

export default function Breadcrumb() {
  const pathname = usePathname();

  return (
    <p className='z-20'>
      <span className='hidden lg:inline'>Portfolio</span>/
      {capitalize(getBreadcrumbPath(pathname))}
    </p>
  );
}
