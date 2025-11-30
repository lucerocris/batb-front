const RAW_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CSRF_PATH = '/sanctum/csrf-cookie';
const API_HOST_URL = RAW_API_BASE_URL?.replace(/\/api\/?$/, '');

const getCookieValue = (name: string) => {
  const value = document.cookie
    ?.split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return value ? decodeURIComponent(value) : null;
};

let csrfInitialized = false;
let csrfPromise: Promise<void> | null = null;

export const getApiBaseUrl = (): string => {
  if (!RAW_API_BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL');
  }

  return RAW_API_BASE_URL;
};

const getCsrfBaseUrl = () => {
  const baseUrl = getApiBaseUrl();
  return API_HOST_URL ?? baseUrl;
};

export const ensureCsrfCookie = async () => {
  if (csrfInitialized) {
    return;
  }

  if (!csrfPromise) {
    const csrfBase = getCsrfBaseUrl();

    csrfPromise = fetch(`${csrfBase}${CSRF_PATH}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to initialize CSRF protection.');
        }
        csrfInitialized = true;
      })
      .catch((error) => {
        csrfInitialized = false;
        throw error;
      })
      .finally(() => {
        csrfPromise = null;
      });
  }

  return csrfPromise;
};

export const getXsrfHeaders = () => {
  const xsrfToken = getCookieValue('XSRF-TOKEN');

  if (!xsrfToken) {
    return {};
  }

  return {
    'X-XSRF-TOKEN': xsrfToken,
  };
};

export const requireJsonHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

