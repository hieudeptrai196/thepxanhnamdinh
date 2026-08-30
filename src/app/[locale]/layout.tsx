import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/config';
import { oswald, barlow, jetbrainsMono } from '@/lib/fonts';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import { Header } from '@/shared/components/layout/Header';
import { Footer } from '@/shared/components/layout/Footer';
import { LoadingScreen } from '@/modules/loading-screen';
import '../globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const common = (await import(`@/i18n/messages/${locale}/common.json`)).default;
  const home = (await import(`@/i18n/messages/${locale}/home.json`)).default;
  const matches = (await import(`@/i18n/messages/${locale}/matches.json`)).default;
  const squad = (await import(`@/i18n/messages/${locale}/squad.json`)).default;
  const standings = (await import(`@/i18n/messages/${locale}/standings.json`)).default;
  const news = (await import(`@/i18n/messages/${locale}/news.json`)).default;
  const messages = { ...common, ...home, ...matches, ...squad, ...standings, ...news };

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme');
  const theme = themeCookie?.value === 'dark' ? 'dark' : undefined;

  return (
    <html
      lang={locale}
      className={`${oswald.variable} ${barlow.variable} ${jetbrainsMono.variable} h-full antialiased`}
      data-theme={theme}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider initialTheme={theme ?? 'light'}>
            <LoadingScreen />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
