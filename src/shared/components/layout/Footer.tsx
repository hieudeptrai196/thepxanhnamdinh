import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const footerLinks = [
    { key: 'privacyPolicy', href: '#' },
    { key: 'termsOfService', href: '#' },
    { key: 'contactUs', href: '#' },
    // { key: 'sponsors', href: '#' },
  ] as const;

  return (
    <footer className="bg-dark-navy text-white/70 mt-auto">
      <div className="mx-auto max-w-[var(--max-width)] px-4 py-10 lg:px-10">
        <div className="text-center">
          {/* <p className="font-display text-lg tracking-wide text-white uppercase mb-4">
            {t('clubName')}
          </p> */}

          <nav className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            {footerLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="hover:text-white transition-colors duration-150"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>

          <p className="text-xs text-white/40">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
