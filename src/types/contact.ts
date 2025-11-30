export interface ContactFormValues {
  fullName: string;
  email: string;
  title: string;
  message: string;
}

export interface StoreInquiryPayload extends ContactFormValues {}

export interface StoreInquiryResponse {
  success: boolean;
  message: string;
  inquiryId?: string | number;
}

