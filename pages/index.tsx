import type { GetServerSideProps } from 'next';
import { i18n } from '@/src/i18n/config';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: `/${i18n.defaultLocale}`,
    permanent: false,
  },
});

export default function IndexRedirect() {
  return null;
}
