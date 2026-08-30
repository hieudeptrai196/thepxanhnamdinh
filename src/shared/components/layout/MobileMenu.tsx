'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { mainNav } from '@/config/navigation';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: Props) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
      document.body.style.overflow = 'hidden';
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-dark-navy/80 transition-opacity duration-300"
        style={{ opacity: animating ? 1 : 0 }}
        onClick={onClose}
      />
      <nav
        className="absolute top-0 left-0 h-full w-72 bg-dark-navy p-6 flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: animating ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <button
          onClick={onClose}
          className="self-start p-2 text-white/70 hover:text-white transition-colors duration-150"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <ul className="mt-8 flex flex-col gap-1">
          {mainNav.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block px-4 py-3 font-heading font-semibold uppercase tracking-wide text-sm transition-colors duration-150 rounded-sm ${
                    isActive
                      ? 'text-club-blue bg-white/5'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
