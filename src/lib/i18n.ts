import 'server-only';

const messages = {
  es: () => import('@/messages/es.json').then((m) => m.default),
  en: () => import('@/messages/en.json').then((m) => m.default),
};

export const getMessages = async (locale: 'es' | 'en') => {
  // Fallback to es if locale not found
  if (locale !== 'es' && locale !== 'en') {
    return messages['es']();
  }
  return messages[locale]();
};
