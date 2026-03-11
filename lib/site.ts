export const supportedLocales = ['pt-BR', 'en', 'es'] as const;

export type SiteLocale = (typeof supportedLocales)[number];

export function isSiteLocale(value: string | null): value is SiteLocale {
  return supportedLocales.includes(value as SiteLocale);
}

export const siteConfig = {
  brandName: "D'Lourdes Casa de Bolos",
  instagramUrl: 'https://instagram.com/dlourdes.bolos',
  whatsappNumber: '5511958316072',
  contactEmail: 'dlourdesoficial@gmail.com',
} as const;

export const localeLabels: Record<SiteLocale, string> = {
  'pt-BR': 'PT-BR',
  en: 'EN',
  es: 'ES',
};

export const siteContent = {
  'pt-BR': {
    metaDescription:
      "Bolos caseiros de cenoura e chocolate, com ou sem cobertura de chocolate. Faça seu pedido na D'Lourdes Casa de Bolos pelo WhatsApp.",
    brandTag: 'Casa de bolos artesanal',
    brandStatement: 'Mais do que bolo, uma experiência simples de cuidado e sabor.',
    languageLabel: 'Idioma',
    auth: {
      signIn: 'Entrar',
      app: 'App',
      goToApp: 'Ir para o app',
    },
    navigation: [
      { label: 'Produtos', href: '#products' },
      { label: 'Galeria', href: '#gallery' },
      { label: 'Como pedir', href: '#how-to-order' },
      { label: 'Contato', href: '#contact' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: {
      orderWhatsapp: 'Pedir pelo WhatsApp',
      exploreCakes: 'Ver os bolos',
      visitInstagram: 'Ver Instagram',
      contactToOrder: 'Falar para pedir',
    },
    whatsapp: {
      defaultMessage:
        "Olá! Gostaria de pedir um bolo da D'Lourdes Casa de Bolos.",
    },
    hero: {
      eyebrow: 'Bolo caseiro de cenoura e bolo caseiro de chocolate',
      title: 'Bolos caseiros com sabor marcante e uma apresentação especial.',
      description:
        'Na D’Lourdes, cada bolo é preparado com cuidado para deixar os momentos simples mais acolhedores, elegantes e memoráveis. Escolha bolo de cenoura ou bolo de chocolate, com ou sem cobertura de chocolate.',
      stats: [
        { label: 'Cardápio', value: '2 clássicos' },
        { label: 'Variações', value: 'Sem ou com cobertura' },
        { label: 'Atendimento', value: 'Rápido no WhatsApp' },
      ],
      feature: {
        eyebrow: 'Toque especial',
        title: 'Opção com cobertura de chocolate',
        description:
          'Um acabamento elegante para celebrações, presentes e mesas de café cheias de afeto.',
      },
      statementEyebrow: 'Essência da marca',
    },
    valueStrip: {
      label: 'Diferencial',
      items: [
        'Produção caseira',
        'Ingredientes selecionados',
        'Feito sob encomenda',
        'Atendimento ágil no WhatsApp',
      ],
    },
    productsSection: {
      eyebrow: 'Produtos',
      title: 'Um cardápio enxuto construído em torno de dois clássicos caseiros.',
      description:
        'A D’Lourdes mantém uma seleção intencional para que cada bolo seja preparado com consistência, sabor equilibrado e uma apresentação que já encanta no primeiro olhar.',
      selectionEyebrow: 'Seleção artesanal',
      variationsLabel: 'Variações disponíveis',
    },
    products: [
      {
        name: 'Bolo Caseiro de Cenoura',
        description:
          'Uma massa macia, com sabor equilibrado e o conforto de um bolo clássico de verdade. Disponível sem cobertura ou com cobertura de chocolate.',
        variants: ['Sem cobertura de chocolate', 'Com cobertura de chocolate'],
        image: '/carrot-cake.png',
        imageAlt: 'Bolo caseiro de cenoura sem cobertura de chocolate.',
        whatsappMessage:
          "Olá! Gostaria de pedir um Bolo Caseiro de Cenoura da D'Lourdes Casa de Bolos.",
      },
      {
        name: 'Bolo Caseiro de Chocolate',
        description:
          'Um clássico rico e acolhedor, com textura macia e sabor marcante. Disponível sem cobertura ou com cobertura de chocolate.',
        variants: ['Sem cobertura de chocolate', 'Com cobertura de chocolate'],
        image: '/chocolate-cake.png',
        imageAlt: 'Bolo caseiro de chocolate sem cobertura de chocolate.',
        whatsappMessage:
          "Olá! Gostaria de pedir um Bolo Caseiro de Chocolate da D'Lourdes Casa de Bolos.",
      },
    ],
    whyChoose: {
      eyebrow: 'Por que D’Lourdes',
      title: 'Escolhas cuidadosas criam uma experiência de confeitaria simples e memorável.',
      description:
        'O posicionamento da marca segue refinado e acolhedor: menu focado, qualidade consistente, apresentação convidativa e um caminho de compra direto para celebrações do dia a dia.',
      items: [
        {
          title: 'Sabor verdadeiramente caseiro',
          description:
            'Receitas clássicas, preparadas com equilíbrio, afeto e aquele sabor que parece familiar desde a primeira fatia.',
        },
        {
          title: 'Apresentação elegante',
          description:
            'Cada bolo recebe um acabamento cuidadoso para ficar tão convidativo na mesa quanto saboroso ao servir.',
        },
        {
          title: 'Menu focado, qualidade constante',
          description:
            'Um cardápio pequeno e intencional permite atenção real a cada bolo de cenoura e bolo de chocolate.',
        },
        {
          title: 'Pedido fácil',
          description:
            'Você escolhe o bolo, envia uma mensagem no WhatsApp e confirma entrega ou retirada sem etapas desnecessárias.',
        },
      ],
    },
    gallerySection: {
      eyebrow: 'Galeria',
      title: 'Uma galeria pronta para valorizar os produtos e a atmosfera da marca.',
      description:
        'A seção agora usa imagens reais dos bolos e já fica preparada para futuras atualizações com novos ângulos, closes e composições de mesa.',
      note: 'Substitua ou amplie a galeria sempre que novas fotos da marca estiverem disponíveis.',
      items: [
        {
          title: 'Bolo de cenoura sem cobertura',
          image: '/carrot-cake.png',
          alt: 'Bolo caseiro de cenoura sem cobertura de chocolate.',
        },
        {
          title: 'Bolo de cenoura com cobertura',
          image: '/carrot-cake-with-chocolate-topper.png',
          alt: 'Bolo caseiro de cenoura com cobertura de chocolate.',
        },
        {
          title: 'Bolo de chocolate sem cobertura',
          image: '/chocolate-cake.png',
          alt: 'Bolo caseiro de chocolate sem cobertura de chocolate.',
        },
        {
          title: 'Bolo de chocolate com cobertura',
          image: '/chocolate-cake-with-chocolate-topper.png',
          alt: 'Bolo caseiro de chocolate com cobertura de chocolate.',
        },
      ],
    },
    howToOrder: {
      eyebrow: 'Como pedir',
      title: 'Um fluxo simples em três passos para converter rápido.',
      description:
        'O caminho do cliente fica direto: escolha o bolo, fale pelo WhatsApp e combine entrega ou retirada.',
      steps: [
        {
          step: '01',
          title: 'Escolha seu bolo',
          description:
            'Selecione o bolo caseiro de cenoura ou o bolo caseiro de chocolate e depois defina se prefere a versão sem cobertura ou com cobertura de chocolate.',
        },
        {
          step: '02',
          title: 'Entre em contato pelo WhatsApp',
          description:
            'Envie o pedido em poucos toques e receba uma resposta rápida com disponibilidade e confirmação.',
        },
        {
          step: '03',
          title: 'Receba ou retire seu pedido',
          description:
            'Finalize da forma mais conveniente para sua rotina, com retirada ou entrega local combinada.',
        },
      ],
      stepLabel: 'Passo',
    },
    brandPositioning: {
      eyebrow: 'Posicionamento da marca',
      title: 'Feito para momentos simples e especiais, com cuidado, sabor e elegância acolhedora.',
      description:
        'A D’Lourdes Casa de Bolos une conforto caseiro e apresentação caprichada para que cada pedido pareça atencioso, convidativo e fácil de compartilhar.',
    },
    faqSection: {
      eyebrow: 'FAQ',
      title: 'Respostas úteis antes de fechar o pedido.',
      description:
        'A primeira versão da página mantém perguntas práticas e orientadas à conversão, com espaço para ampliar conforme a operação for sendo definida.',
      items: [
        {
          question: 'Quais sabores de bolo estão disponíveis?',
          answer:
            'No momento, a D’Lourdes oferece Bolo Caseiro de Cenoura e Bolo Caseiro de Chocolate.',
        },
        {
          question: 'Existe opção de cobertura?',
          answer:
            'Sim. Os dois bolos podem ser pedidos sem cobertura de chocolate ou com cobertura de chocolate.',
        },
        {
          question: 'Os bolos são feitos sob encomenda?',
          answer:
            'Sim. Os pedidos são preparados com cuidado para manter frescor, sabor e boa apresentação.',
        },
        {
          question: 'Como faço um pedido?',
          answer:
            'Basta enviar uma mensagem pelo WhatsApp, escolher o bolo e a variação desejada, e confirmar a melhor forma de entrega ou retirada.',
        },
        {
          question: 'Há entrega disponível?',
          answer:
            'A entrega pode ser combinada conforme a área de atendimento e os detalhes do pedido.',
        },
        {
          question: 'Posso retirar meu pedido?',
          answer:
            'Sim. A retirada pode ser combinada diretamente pelo WhatsApp durante a confirmação do pedido.',
        },
        {
          question: 'Com quanta antecedência devo pedir?',
          answer:
            'O ideal é pedir com antecedência, especialmente para horários específicos ou dias de maior procura.',
        },
      ],
    },
    contactForm: {
      eyebrow: 'Contato e pedidos',
      title: 'Envie sua solicitação por e-mail e receba retorno para finalizar o pedido.',
      description:
        'Se preferir, você pode preencher o formulário com os detalhes do bolo desejado. A mensagem será enviada para a equipe da D’Lourdes por e-mail.',
      cardTitle: 'Formulário de contato',
      cardDescription:
        'Informe os detalhes principais do pedido ou do seu contato. Os campos marcados como obrigatórios ajudam a acelerar o atendimento.',
      submitLabel: 'Enviar solicitação',
      submittingLabel: 'Enviando...',
      successMessage:
        'Sua mensagem foi enviada com sucesso. A D’Lourdes entrará em contato em breve.',
      errorMessage:
        'Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou use o WhatsApp.',
      requiredError: 'Preencha os campos obrigatórios antes de enviar.',
      fields: {
        name: 'Nome',
        email: 'E-mail',
        phone: 'Telefone',
        flavor: 'Sabor',
        topping: 'Cobertura',
        deliveryDate: 'Data de entrega/retirada',
        deliveryTime: 'Horário de entrega/retirada',
        observations: 'Observações',
      },
      placeholders: {
        name: 'Seu nome completo',
        email: 'voce@exemplo.com',
        phone: '(11) 99999-9999',
        observations: 'Detalhes extras, preferência de horário ou informações importantes.',
      },
      options: {
        flavorPlaceholder: 'Selecione o sabor',
        toppingPlaceholder: 'Selecione a cobertura',
        flavors: [
          { value: 'carrot', label: 'Bolo Caseiro de Cenoura' },
          { value: 'chocolate', label: 'Bolo Caseiro de Chocolate' },
        ],
        toppings: [
          { value: 'without', label: 'Sem cobertura de chocolate' },
          { value: 'with', label: 'Com cobertura de chocolate' },
        ],
      },
    },
    finalCta: {
      eyebrow: 'Pedido final',
      title: 'Pronta para pedir um bolo caseiro com acabamento elegante e sabor memorável?',
      description:
        'Fale com a D’Lourdes no WhatsApp para escolher o bolo, confirmar a variação desejada e combinar retirada ou entrega.',
    },
    footer: {
      serviceNote: 'Pedidos disponíveis para retirada ou entrega local sob combinação.',
      whatsappLabel: 'WhatsApp',
      instagramLabel: 'Instagram',
    },
  },
  en: {
    metaDescription:
      "Homemade carrot cake and chocolate cake, with or without chocolate topping. Order from D'Lourdes Casa de Bolos on WhatsApp.",
    brandTag: 'Artisanal cake house',
    brandStatement: 'More than just cake, a simple experience of care and flavor.',
    languageLabel: 'Language',
    auth: {
      signIn: 'Sign In',
      app: 'App',
      goToApp: 'Go to App',
    },
    navigation: [
      { label: 'Products', href: '#products' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'How to Order', href: '#how-to-order' },
      { label: 'Contact', href: '#contact' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: {
      orderWhatsapp: 'Order on WhatsApp',
      exploreCakes: 'Explore the cakes',
      visitInstagram: 'Visit Instagram',
      contactToOrder: 'Contact to order',
    },
    whatsapp: {
      defaultMessage:
        "Hello! I would like to order a cake from D'Lourdes Casa de Bolos.",
    },
    hero: {
      eyebrow: 'Homemade carrot cake and homemade chocolate cake',
      title: 'Homemade cakes with remarkable flavor and a special presentation.',
      description:
        'At D’Lourdes, every cake is prepared with care to make simple moments feel warmer, more elegant, and more memorable. Choose carrot cake or chocolate cake, with or without chocolate topping.',
      stats: [
        { label: 'Menu', value: '2 classics' },
        { label: 'Variations', value: 'Plain or topped' },
        { label: 'Service', value: 'Fast on WhatsApp' },
      ],
      feature: {
        eyebrow: 'Signature touch',
        title: 'Chocolate topping option',
        description:
          'A polished finish for celebrations, gifting, and coffee table moments.',
      },
      statementEyebrow: 'Brand statement',
    },
    valueStrip: {
      label: 'Value',
      items: [
        'Homemade production',
        'Selected ingredients',
        'Made to order',
        'Fast WhatsApp service',
      ],
    },
    productsSection: {
      eyebrow: 'Products',
      title: 'A focused menu built around two homemade classics.',
      description:
        'D’Lourdes keeps the selection intentional so every cake is prepared with consistency, balanced flavor, and a presentation that feels special from the first look.',
      selectionEyebrow: 'Handmade selection',
      variationsLabel: 'Available variations',
    },
    products: [
      {
        name: 'Homemade Carrot Cake',
        description:
          'A soft homemade batter with balanced flavor and the comforting feel of a truly classic cake. Available plain or with chocolate topping.',
        variants: ['Without chocolate topping', 'With chocolate topping'],
        image: '/carrot-cake.png',
        imageAlt: 'Homemade carrot cake without chocolate topping.',
        whatsappMessage:
          "Hello! I would like to order a Homemade Carrot Cake from D'Lourdes Casa de Bolos.",
      },
      {
        name: 'Homemade Chocolate Cake',
        description:
          'A rich and comforting classic with a soft texture and remarkable flavor. Available plain or with chocolate topping.',
        variants: ['Without chocolate topping', 'With chocolate topping'],
        image: '/chocolate-cake.png',
        imageAlt: 'Homemade chocolate cake without chocolate topping.',
        whatsappMessage:
          "Hello! I would like to order a Homemade Chocolate Cake from D'Lourdes Casa de Bolos.",
      },
    ],
    whyChoose: {
      eyebrow: 'Why D’Lourdes',
      title: 'Careful choices create a simple but memorable bakery experience.',
      description:
        'The brand positioning stays refined and warm: a focused menu, consistent quality, inviting presentation, and a smooth ordering path for everyday celebrations.',
      items: [
        {
          title: 'Real homemade taste',
          description:
            'Classic recipes prepared with balance, warmth, and the kind of flavor that feels familiar from the first slice.',
        },
        {
          title: 'Elegant presentation',
          description:
            'Each cake is finished with care so it looks as inviting on the table as it tastes when served.',
        },
        {
          title: 'Focused menu, consistent quality',
          description:
            'A small, deliberate menu lets every carrot cake and chocolate cake receive the same careful attention.',
        },
        {
          title: 'Easy ordering experience',
          description:
            'Choose your cake, send a message on WhatsApp, and confirm pickup or delivery without unnecessary steps.',
        },
      ],
    },
    gallerySection: {
      eyebrow: 'Gallery',
      title: 'A gallery ready to showcase the products and the brand atmosphere.',
      description:
        'The section now uses real cake images and is ready for future updates with new angles, close-ups, and table compositions.',
      note: 'Replace or expand the gallery whenever new brand photography becomes available.',
      items: [
        {
          title: 'Carrot cake without topping',
          image: '/carrot-cake.png',
          alt: 'Homemade carrot cake without chocolate topping.',
        },
        {
          title: 'Carrot cake with chocolate topping',
          image: '/carrot-cake-with-chocolate-topper.png',
          alt: 'Homemade carrot cake with chocolate topping.',
        },
        {
          title: 'Chocolate cake without topping',
          image: '/chocolate-cake.png',
          alt: 'Homemade chocolate cake without chocolate topping.',
        },
        {
          title: 'Chocolate cake with chocolate topping',
          image: '/chocolate-cake-with-chocolate-topper.png',
          alt: 'Homemade chocolate cake with chocolate topping.',
        },
      ],
    },
    howToOrder: {
      eyebrow: 'How to Order',
      title: 'A simple three-step flow designed for quick conversion.',
      description:
        'Keep the customer path direct: choose the cake, message on WhatsApp, and confirm pickup or delivery details.',
      steps: [
        {
          step: '01',
          title: 'Choose your cake',
          description:
            'Pick Homemade Carrot Cake or Homemade Chocolate Cake, then decide whether you want the plain version or the one with chocolate topping.',
        },
        {
          step: '02',
          title: 'Contact through WhatsApp',
          description:
            'Send your request in a few taps and receive a quick response with availability and confirmation details.',
        },
        {
          step: '03',
          title: 'Receive or pick up your order',
          description:
            'Complete the order with the option that fits your routine best, whether pickup or local delivery arrangement.',
        },
      ],
      stepLabel: 'Step',
    },
    brandPositioning: {
      eyebrow: 'Brand Positioning',
      title: 'Made for simple special moments, with care, flavor, and welcoming elegance.',
      description:
        'D’Lourdes Casa de Bolos brings together homemade comfort and polished presentation so each order feels thoughtful, inviting, and easy to share.',
    },
    faqSection: {
      eyebrow: 'FAQ',
      title: 'Helpful answers before the order is placed.',
      description:
        'The first version of the page keeps the questions practical and conversion-oriented, with room to expand as business policies are finalized.',
      items: [
        {
          question: 'Which cake flavors are available?',
          answer:
            'At the moment, D’Lourdes offers Homemade Carrot Cake and Homemade Chocolate Cake.',
        },
        {
          question: 'Is there a topping option?',
          answer:
            'Yes. Both cakes can be ordered without chocolate topping or with chocolate topping.',
        },
        {
          question: 'Are cakes made to order?',
          answer:
            'Yes. Orders are prepared with care to keep the cakes fresh, flavorful, and well presented.',
        },
        {
          question: 'How do I place an order?',
          answer:
            'Send a message through WhatsApp, choose your cake and preferred variation, and confirm the best pickup or delivery option.',
        },
        {
          question: 'Is delivery available?',
          answer:
            'Delivery can be arranged depending on the service area and order details.',
        },
        {
          question: 'Can I pick up my order?',
          answer:
            'Yes. Pickup can be coordinated directly through WhatsApp during order confirmation.',
        },
        {
          question: 'How early should I order?',
          answer:
            'Ordering in advance is recommended, especially for specific pickup times or higher-demand days.',
        },
      ],
    },
    contactForm: {
      eyebrow: 'Contact and orders',
      title: 'Send your request by email and get a reply to complete your order.',
      description:
        'If you prefer, you can fill in the form with the cake details you want. The message will be sent to the D’Lourdes team by email.',
      cardTitle: 'Contact form',
      cardDescription:
        'Share the main order or contact details. Required fields help speed up the response.',
      submitLabel: 'Send request',
      submittingLabel: 'Sending...',
      successMessage:
        'Your message was sent successfully. D’Lourdes will get back to you soon.',
      errorMessage:
        'We could not send your message right now. Please try again in a moment or use WhatsApp.',
      requiredError: 'Fill in the required fields before sending.',
      fields: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        flavor: 'Flavor',
        topping: 'Cake topping',
        deliveryDate: 'Delivery or pickup date',
        deliveryTime: 'Delivery or pickup time',
        observations: 'Observations',
      },
      placeholders: {
        name: 'Your full name',
        email: 'you@example.com',
        phone: '+55 11 99999-9999',
        observations: 'Extra details, preferred time, or important notes.',
      },
      options: {
        flavorPlaceholder: 'Select a flavor',
        toppingPlaceholder: 'Select a topping',
        flavors: [
          { value: 'carrot', label: 'Homemade Carrot Cake' },
          { value: 'chocolate', label: 'Homemade Chocolate Cake' },
        ],
        toppings: [
          { value: 'without', label: 'Without chocolate topping' },
          { value: 'with', label: 'With chocolate topping' },
        ],
      },
    },
    finalCta: {
      eyebrow: 'Final CTA',
      title: 'Ready to order a homemade cake with an elegant finish and memorable flavor?',
      description:
        'Message D’Lourdes on WhatsApp to choose your cake, confirm your preferred variation, and arrange pickup or delivery.',
    },
    footer: {
      serviceNote: 'Orders available for pickup or local delivery by arrangement.',
      whatsappLabel: 'WhatsApp',
      instagramLabel: 'Instagram',
    },
  },
  es: {
    metaDescription:
      "Pasteles caseros de zanahoria y chocolate, con o sin cobertura de chocolate. Haz tu pedido en D'Lourdes Casa de Bolos por WhatsApp.",
    brandTag: 'Casa artesanal de pasteles',
    brandStatement: 'Más que pastel, una experiencia simple de cuidado y sabor.',
    languageLabel: 'Idioma',
    auth: {
      signIn: 'Iniciar sesión',
      app: 'App',
      goToApp: 'Ir a la app',
    },
    navigation: [
      { label: 'Productos', href: '#products' },
      { label: 'Galería', href: '#gallery' },
      { label: 'Cómo pedir', href: '#how-to-order' },
      { label: 'Contacto', href: '#contact' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: {
      orderWhatsapp: 'Pedir por WhatsApp',
      exploreCakes: 'Ver los pasteles',
      visitInstagram: 'Ver Instagram',
      contactToOrder: 'Contactar para pedir',
    },
    whatsapp: {
      defaultMessage:
        "¡Hola! Me gustaría pedir un pastel de D'Lourdes Casa de Bolos.",
    },
    hero: {
      eyebrow: 'Pastel casero de zanahoria y pastel casero de chocolate',
      title: 'Pasteles caseros con un sabor memorable y una presentación especial.',
      description:
        'En D’Lourdes, cada pastel se prepara con cuidado para hacer que los momentos simples se sientan más cálidos, elegantes y memorables. Elige pastel de zanahoria o de chocolate, con o sin cobertura de chocolate.',
      stats: [
        { label: 'Menú', value: '2 clásicos' },
        { label: 'Variaciones', value: 'Sin o con cobertura' },
        { label: 'Atención', value: 'Rápida por WhatsApp' },
      ],
      feature: {
        eyebrow: 'Toque especial',
        title: 'Opción con cobertura de chocolate',
        description:
          'Un acabado elegante para celebraciones, regalos y momentos alrededor del café.',
      },
      statementEyebrow: 'Esencia de la marca',
    },
    valueStrip: {
      label: 'Diferencial',
      items: [
        'Producción casera',
        'Ingredientes seleccionados',
        'Hecho por encargo',
        'Atención ágil por WhatsApp',
      ],
    },
    productsSection: {
      eyebrow: 'Productos',
      title: 'Un menú enfocado construido alrededor de dos clásicos caseros.',
      description:
        'D’Lourdes mantiene una selección intencional para que cada pastel se prepare con consistencia, sabor equilibrado y una presentación que encanta desde la primera mirada.',
      selectionEyebrow: 'Selección artesanal',
      variationsLabel: 'Variaciones disponibles',
    },
    products: [
      {
        name: 'Pastel Casero de Zanahoria',
        description:
          'Una masa suave, con sabor equilibrado y la sensación reconfortante de un pastel clásico de verdad. Disponible sin cobertura o con cobertura de chocolate.',
        variants: ['Sin cobertura de chocolate', 'Con cobertura de chocolate'],
        image: '/carrot-cake.png',
        imageAlt: 'Pastel casero de zanahoria sin cobertura de chocolate.',
        whatsappMessage:
          "¡Hola! Me gustaría pedir un Pastel Casero de Zanahoria de D'Lourdes Casa de Bolos.",
      },
      {
        name: 'Pastel Casero de Chocolate',
        description:
          'Un clásico intenso y reconfortante, con textura suave y sabor memorable. Disponible sin cobertura o con cobertura de chocolate.',
        variants: ['Sin cobertura de chocolate', 'Con cobertura de chocolate'],
        image: '/chocolate-cake.png',
        imageAlt: 'Pastel casero de chocolate sin cobertura de chocolate.',
        whatsappMessage:
          "¡Hola! Me gustaría pedir un Pastel Casero de Chocolate de D'Lourdes Casa de Bolos.",
      },
    ],
    whyChoose: {
      eyebrow: 'Por qué D’Lourdes',
      title: 'Las decisiones cuidadosas crean una experiencia de pastelería simple y memorable.',
      description:
        'El posicionamiento de la marca sigue siendo refinado y acogedor: menú enfocado, calidad consistente, presentación atractiva y un camino de compra directo para celebraciones cotidianas.',
      items: [
        {
          title: 'Sabor realmente casero',
          description:
            'Recetas clásicas preparadas con equilibrio, cariño y ese sabor que se siente familiar desde la primera porción.',
        },
        {
          title: 'Presentación elegante',
          description:
            'Cada pastel recibe un acabado cuidadoso para verse tan atractivo en la mesa como sabroso al servir.',
        },
        {
          title: 'Menú enfocado, calidad constante',
          description:
            'Un menú pequeño e intencional permite atención real a cada pastel de zanahoria y de chocolate.',
        },
        {
          title: 'Pedido fácil',
          description:
            'Eliges el pastel, envías un mensaje por WhatsApp y confirmas entrega o recogida sin pasos innecesarios.',
        },
      ],
    },
    gallerySection: {
      eyebrow: 'Galería',
      title: 'Una galería lista para destacar los productos y la atmósfera de la marca.',
      description:
        'La sección ahora usa imágenes reales de los pasteles y queda preparada para futuras actualizaciones con nuevos ángulos, acercamientos y composiciones de mesa.',
      note: 'Sustituye o amplía la galería siempre que haya nuevas fotos de la marca.',
      items: [
        {
          title: 'Pastel de zanahoria sin cobertura',
          image: '/carrot-cake.png',
          alt: 'Pastel casero de zanahoria sin cobertura de chocolate.',
        },
        {
          title: 'Pastel de zanahoria con cobertura',
          image: '/carrot-cake-with-chocolate-topper.png',
          alt: 'Pastel casero de zanahoria con cobertura de chocolate.',
        },
        {
          title: 'Pastel de chocolate sin cobertura',
          image: '/chocolate-cake.png',
          alt: 'Pastel casero de chocolate sin cobertura de chocolate.',
        },
        {
          title: 'Pastel de chocolate con cobertura',
          image: '/chocolate-cake-with-chocolate-topper.png',
          alt: 'Pastel casero de chocolate con cobertura de chocolate.',
        },
      ],
    },
    howToOrder: {
      eyebrow: 'Cómo pedir',
      title: 'Un flujo simple en tres pasos para convertir rápido.',
      description:
        'El camino del cliente es directo: elige el pastel, escribe por WhatsApp y coordina entrega o recogida.',
      steps: [
        {
          step: '01',
          title: 'Elige tu pastel',
          description:
            'Selecciona el pastel casero de zanahoria o el pastel casero de chocolate y luego define si prefieres la versión sin cobertura o con cobertura de chocolate.',
        },
        {
          step: '02',
          title: 'Escribe por WhatsApp',
          description:
            'Envía el pedido en pocos toques y recibe una respuesta rápida con disponibilidad y confirmación.',
        },
        {
          step: '03',
          title: 'Recibe o recoge tu pedido',
          description:
            'Finaliza de la forma más conveniente para tu rutina, con recogida o entrega local coordinada.',
        },
      ],
      stepLabel: 'Paso',
    },
    brandPositioning: {
      eyebrow: 'Posicionamiento de marca',
      title: 'Hecho para momentos simples y especiales, con cuidado, sabor y una elegancia acogedora.',
      description:
        'D’Lourdes Casa de Bolos une confort casero y presentación cuidada para que cada pedido se sienta atento, invitante y fácil de compartir.',
    },
    faqSection: {
      eyebrow: 'FAQ',
      title: 'Respuestas útiles antes de cerrar el pedido.',
      description:
        'La primera versión de la página mantiene preguntas prácticas y orientadas a la conversión, con espacio para ampliar a medida que la operación se defina.',
      items: [
        {
          question: '¿Qué sabores de pastel están disponibles?',
          answer:
            'Por el momento, D’Lourdes ofrece Pastel Casero de Zanahoria y Pastel Casero de Chocolate.',
        },
        {
          question: '¿Existe opción de cobertura?',
          answer:
            'Sí. Los dos pasteles pueden pedirse sin cobertura de chocolate o con cobertura de chocolate.',
        },
        {
          question: '¿Los pasteles se hacen por encargo?',
          answer:
            'Sí. Los pedidos se preparan con cuidado para mantener frescura, sabor y buena presentación.',
        },
        {
          question: '¿Cómo hago un pedido?',
          answer:
            'Solo tienes que enviar un mensaje por WhatsApp, elegir el pastel y la variación deseada, y confirmar la mejor forma de entrega o recogida.',
        },
        {
          question: '¿Hay entrega disponible?',
          answer:
            'La entrega puede coordinarse según la zona de atención y los detalles del pedido.',
        },
        {
          question: '¿Puedo recoger mi pedido?',
          answer:
            'Sí. La recogida puede coordinarse directamente por WhatsApp durante la confirmación del pedido.',
        },
        {
          question: '¿Con cuánta anticipación debo pedir?',
          answer:
            'Lo ideal es pedir con anticipación, especialmente para horarios específicos o días de mayor demanda.',
        },
      ],
    },
    contactForm: {
      eyebrow: 'Contacto y pedidos',
      title: 'Envía tu solicitud por correo y recibe respuesta para finalizar el pedido.',
      description:
        'Si lo prefieres, puedes completar el formulario con los detalles del pastel que deseas. El mensaje se enviará por correo al equipo de D’Lourdes.',
      cardTitle: 'Formulario de contacto',
      cardDescription:
        'Comparte los detalles principales del pedido o de tu contacto. Los campos obligatorios ayudan a agilizar la respuesta.',
      submitLabel: 'Enviar solicitud',
      submittingLabel: 'Enviando...',
      successMessage:
        'Tu mensaje fue enviado correctamente. D’Lourdes se pondrá en contacto pronto.',
      errorMessage:
        'No fue posible enviar tu mensaje ahora. Inténtalo de nuevo en unos minutos o usa WhatsApp.',
      requiredError: 'Completa los campos obligatorios antes de enviar.',
      fields: {
        name: 'Nombre',
        email: 'Correo electrónico',
        phone: 'Teléfono',
        flavor: 'Sabor',
        topping: 'Cobertura',
        deliveryDate: 'Fecha de entrega o recogida',
        deliveryTime: 'Hora de entrega o recogida',
        observations: 'Observaciones',
      },
      placeholders: {
        name: 'Tu nombre completo',
        email: 'tu@ejemplo.com',
        phone: '+55 11 99999-9999',
        observations: 'Detalles extra, horario preferido o información importante.',
      },
      options: {
        flavorPlaceholder: 'Selecciona un sabor',
        toppingPlaceholder: 'Selecciona una cobertura',
        flavors: [
          { value: 'carrot', label: 'Pastel Casero de Zanahoria' },
          { value: 'chocolate', label: 'Pastel Casero de Chocolate' },
        ],
        toppings: [
          { value: 'without', label: 'Sin cobertura de chocolate' },
          { value: 'with', label: 'Con cobertura de chocolate' },
        ],
      },
    },
    finalCta: {
      eyebrow: 'Cierre',
      title: '¿Lista para pedir un pastel casero con acabado elegante y sabor memorable?',
      description:
        'Escribe a D’Lourdes por WhatsApp para elegir el pastel, confirmar la variación deseada y coordinar recogida o entrega.',
    },
    footer: {
      serviceNote: 'Pedidos disponibles para recogida o entrega local bajo coordinación.',
      whatsappLabel: 'WhatsApp',
      instagramLabel: 'Instagram',
    },
  },
} as const;

export function buildWhatsAppLink(message: string) {
  const searchParams = new URLSearchParams({
    text: message,
  });

  return `https://wa.me/${siteConfig.whatsappNumber}?${searchParams.toString()}`;
}
