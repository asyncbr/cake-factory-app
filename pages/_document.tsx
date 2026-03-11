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

    return {
      ...initialProps,
      locale: ctx.locale,
    };
  }

  render() {
    const locale = this.props.locale ?? 'pt-BR';

    return (
      <Html lang={locale}>
        <Head>
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
