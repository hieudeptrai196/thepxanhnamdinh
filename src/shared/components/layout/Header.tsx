'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { mainNav } from '@/config/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const t = useTranslations('nav');
  const tSite = useTranslations('site');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-bg-secondary shadow-card">
        <div className="mx-auto flex h-16 max-w-[var(--max-width)] items-center justify-between px-4 lg:px-10">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-150 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo — centered on mobile, inline on desktop */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-auto lg:translate-x-0 flex items-center gap-2"
          >
            <Image
              src="/images/logo.png"
              alt={tSite('name')}
              width={40}
              height={40}
              className="size-10"
              priority
            />
            <span className="hidden lg:block font-heading font-bold text-base tracking-wide text-text-primary uppercase">
              {tSite('name')}
            </span>
            <span className="hidden sm:block lg:hidden font-heading font-bold text-base tracking-wide text-text-primary uppercase">
              {tSite('shortName')}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-2 font-heading font-semibold uppercase text-sm tracking-wide transition-colors duration-150 ${
                    isActive
                      ? 'text-club-blue border-b-2 border-club-blue'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-150"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
