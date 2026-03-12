import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document';

type Props = DocumentInitialProps & {
  locale?: string;
};

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
    const initialProps = await Document.getInitialProps(ctx);
    const locale =
      typeof ctx.query.locale === 'string' ? ctx.query.locale : undefined;

    return {
      ...initialProps,
      locale,
    };
  }

  render() {
    const locale = this.props.locale ?? 'pt-BR';

    return (
      <Html lang={locale}>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <meta
            name="description"
            content="D'Lourdes Casa de Bolos offers elegant homemade carrot cake and chocolate cake for warm, memorable moments."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
