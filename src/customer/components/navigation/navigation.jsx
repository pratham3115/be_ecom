'use client'

import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../../assets/BELOGO.jpg';
import { Link } from 'react-router-dom';

const navigation = {
  categories: [
    {
      id: 'Home',
      name: 'Home',
    },
    {
      id: 'About',
      name: 'About',
    },
  ],
  pages: [
    { name: 'Products', href: '/products' },
    { name: 'Contact Us', href: '/contact' },
  ],
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link to={page.href} className="block p-2 font-medium text-gray-900">
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="bg-white">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between border-b border-gray-200">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
            >
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Bhuwan Enterprise" className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <PopoverGroup className="hidden lg:flex lg:space-x-8">
              {navigation.categories.map((category) => (
                <Popover key={category.name}>
                  <PopoverButton className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    {category.name}
                  </PopoverButton>
                </Popover>
              ))}
              {navigation.pages.map((page) => (
                <Link
                  key={page.name}
                  to={page.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  {page.name}
                </Link>
              ))}
            </PopoverGroup>
          </div>
        </nav>
      </header>
    </div>
  );
}