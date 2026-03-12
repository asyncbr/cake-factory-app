import type { GetServerSideProps } from 'next';
import { i18n } from '@/src/i18n/config';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: `/${i18n.defaultLocale}/products`,
    permanent: false,
  },
});

export default function ProductsRedirect() {
  return null;
}
