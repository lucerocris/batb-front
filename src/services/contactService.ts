import type {
  StoreInquiryPayload,
  StoreInquiryResponse,
} from '@/types/contact';
import {
  ensureCsrfCookie,
  getApiBaseUrl,
  getXsrfHeaders,
  requireJsonHeaders,
} from './apiClient';

const INQUIRIES_PATH = '/inquiries';

const buildPayload = (payload: StoreInquiryPayload) => ({
  full_name: payload.fullName.trim(),
  email: payload.email.trim(),
  title: payload.title.trim(),
  message: payload.message.trim(),
});

export async function submitInquiry(
  payload: StoreInquiryPayload
): Promise<StoreInquiryResponse> {
  const apiBaseUrl = getApiBaseUrl();

  await ensureCsrfCookie();

  const response = await fetch(`${apiBaseUrl}${INQUIRIES_PATH}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...requireJsonHeaders(),
      ...getXsrfHeaders(),
    },
    body: JSON.stringify(buildPayload(payload)),
  });

  let data: StoreInquiryResponse | null = null;
  try {
    data = await response.json();
  } catch (error) {
    console.error('Failed to parse inquiry response', error);
  }

  if (!response.ok || !data) {
    throw new Error(
      data?.message || 'Failed to submit inquiry. Please try again later.'
    );
  }

  return data;
}

