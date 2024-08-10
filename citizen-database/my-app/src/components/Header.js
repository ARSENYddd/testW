import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Citizens', href: '/citizens', current: false },
  // Дополнительные пункты навигации по мере необходимости
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const location = useLocation(); // Получаем текущий путь
  const [navItems, setNavItems] = useState(navigation);

  useEffect(() => {
    // Обновляем активный элемент в зависимости от текущего пути
    const currentPath = location.pathname;
    const updatedNavItems = navItems.map(item => ({
      ...item,
      current: item.href === currentPath,
    }));
    setNavItems(updatedNavItems);
  }, [location.pathname]); // Запускаем эффект при изменении пути

  const handleItemClick = (clickedIndex) => {
    // Обновляем активный элемент при клике
    const updatedNavItems = navItems.map((item, index) => ({
      ...item,
      current: index === clickedIndex,
    }));
    setNavItems(updatedNavItems);
  };

  return (
    <Disclosure as="header" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navItems.map((item, index) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => handleItemClick(index)}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleItemClick(index)}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
