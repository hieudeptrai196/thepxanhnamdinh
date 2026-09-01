import Link from 'next/link';
import { defaultLocale } from '@/i18n/config';
import { oswald, barlow, jetbrainsMono } from '@/lib/fonts';
import { NotFoundScene, ctaClass } from '@/modules/error/components/NotFoundScene';
import './globals.css';

/**
 * Catches URLs that match no route at all, so they never reach the `[locale]`
 * segment and its own not-found. The root layout is a passthrough, so this
 * supplies the document shell itself — and with no locale in the URL there is
 * no i18n context, hence the default-locale copy inline.
 */
export default function RootNotFound() {
  return (
    <html
      lang={defaultLocale}
      className={`${oswald.variable} ${barlow.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body">
        <NotFoundScene
          label="Lỗi 404"
          title="Việt vị"
          description="Trang bạn tìm đã ở ngoài đường biên. Có thể nó đã được di chuyển, hoặc chưa từng tồn tại."
          action={
            <Link href={`/${defaultLocale}`} className={ctaClass}>
              Về trang chủ
            </Link>
          }
        />
      </body>
    </html>
  );
}
