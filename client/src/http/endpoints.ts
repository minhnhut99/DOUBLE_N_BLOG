export const getApiCore = (path: string): string =>
  `${import.meta.env.VITE_API_CORE}/${path}`;
