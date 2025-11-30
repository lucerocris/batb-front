import { useCallback, useMemo, useState } from 'react';
import type { CartItem } from '@/types/cart';
import type { OrderPaymentMethod, StoreOrderPayload } from '@/types/order';

export type PaymentChannel = 'gcash' | 'bpi' | 'paypal' | 'bdo';
export type PaymentMethod = OrderPaymentMethod;

interface CheckoutContactInfo {
  email: string;
}

export interface ShippingAddressValues {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  barangay: string;
  region: string;
  postalCode: string;
  countryCode: string;
  phone: string;
}

interface PaymentValues {
  channel: PaymentChannel;
  method: PaymentMethod;
  reference: string;
  sentAt: string;
  proof: File | null;
}

export interface CheckoutFormValues {
  contact: CheckoutContactInfo;
  shippingAddress: ShippingAddressValues;
  payment: PaymentValues;
  currency: string;
  customerNotes: string;
}

export interface BuildOrderPayloadInput {
  cartItems: CartItem[];
  idempotencyKey?: string;
  discountAmount?: number;
  taxAmount?: number;
  shippingAmount?: number | null;
}

export interface UseCheckoutFormReturn {
  values: CheckoutFormValues;
  updateContact: (field: keyof CheckoutContactInfo, value: string) => void;
  updateShippingAddress: (
    field: keyof ShippingAddressValues,
    value: string
  ) => void;
  updatePayment: (field: 'reference' | 'sentAt', value: string) => void;
  setPaymentChannel: (channel: PaymentChannel) => void;
  setPaymentProof: (file: File | null) => void;
  setCustomerNotes: (notes: string) => void;
  resetForm: () => void;
  buildOrderPayload: (input: BuildOrderPayloadInput) => StoreOrderPayload;
  isCustomerInfoComplete: boolean;
  isShippingComplete: boolean;
  isPaymentReady: boolean;
  canProceedToPayment: boolean;
  canSubmitOrder: boolean;
  validationIssues: string[];
}

const generateIdempotencyKey = () => {
  const cryptoObj = globalThis.crypto as Crypto | undefined;
  if (cryptoObj && typeof cryptoObj.randomUUID === 'function') {
    return cryptoObj.randomUUID();
  }

  return `batb-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
};

const buildInitialValues = (
  initial?: Partial<CheckoutFormValues>
): CheckoutFormValues => {
  const defaultValues: CheckoutFormValues = {
    contact: {
      email: '',
    },
    shippingAddress: {
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      province: '',
      barangay: '',
      region: '',
      postalCode: '',
      countryCode: 'PH',
      phone: '',
    },
    payment: {
      channel: 'gcash',
      method: 'gcash',
      reference: '',
      sentAt: new Date().toISOString().slice(0, 10),
      proof: null,
    },
    currency: 'PHP',
    customerNotes: '',
  };

  if (!initial) {
    return defaultValues;
  }

  return {
    ...defaultValues,
    ...initial,
    contact: {
      ...defaultValues.contact,
      ...initial.contact,
    },
    shippingAddress: {
      ...defaultValues.shippingAddress,
      ...initial.shippingAddress,
    },
    payment: {
      ...defaultValues.payment,
      ...initial.payment,
    },
  };
};

export const useCheckoutForm = (
  initialValues?: Partial<CheckoutFormValues>
): UseCheckoutFormReturn => {
  const [values, setValues] = useState<CheckoutFormValues>(
    buildInitialValues(initialValues)
  );

  const updateContact = useCallback(
    (field: keyof CheckoutContactInfo, value: string) => {
      setValues((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value,
        },
      }));
    },
    []
  );

  const updateShippingAddress = useCallback(
    (field: keyof ShippingAddressValues, value: string) => {
      setValues((prev) => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value,
        },
      }));
    },
    []
  );

  const updatePayment = useCallback(
    (field: 'reference' | 'sentAt', value: string) => {
      setValues((prev) => ({
        ...prev,
        payment: {
          ...prev.payment,
          [field]: value,
        },
      }));
    },
    []
  );

  const setPaymentChannel = useCallback((channel: PaymentChannel) => {
    setValues((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        channel,
        method: channel === 'gcash' ? 'gcash' : 'bank_transfer',
      },
    }));
  }, []);

  const setPaymentProof = useCallback((file: File | null) => {
    setValues((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        proof: file,
      },
    }));
  }, []);

  const setCustomerNotes = useCallback((notes: string) => {
    setValues((prev) => ({
      ...prev,
      customerNotes: notes,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(buildInitialValues(initialValues));
  }, [initialValues]);

  const isCustomerInfoComplete = useMemo(() => {
    return (
      values.shippingAddress.firstName.trim().length > 0 &&
      values.shippingAddress.lastName.trim().length > 0 &&
      values.contact.email.trim().length > 0
    );
  }, [
    values.shippingAddress.firstName,
    values.shippingAddress.lastName,
    values.contact.email,
  ]);

  const isShippingComplete = useMemo(() => {
    const address = values.shippingAddress;
    return (
      address.addressLine1.trim().length > 0 &&
      address.city.trim().length > 0 &&
      address.province.trim().length > 0 &&
      address.barangay.trim().length > 0 &&
      address.region.trim().length > 0 &&
      address.postalCode.trim().length > 0 &&
      address.phone.trim().length > 0
    );
  }, [values.shippingAddress]);

  const isPaymentReady = useMemo(() => {
    const payment = values.payment;
    return (
      payment.reference.trim().length > 0 &&
      payment.sentAt.trim().length > 0 &&
      payment.proof !== null
    );
  }, [values.payment]);

  const canProceedToPayment = isCustomerInfoComplete && isShippingComplete;
  const canSubmitOrder = canProceedToPayment && isPaymentReady;

  const validationIssues = useMemo(() => {
    const issues: string[] = [];
    if (!isCustomerInfoComplete) {
      issues.push('Provide first name, last name, and contact email.');
    }
    if (!isShippingComplete) {
      issues.push(
        'Complete the shipping address, including city, province, barangay, ZIP, and phone.'
      );
    }
    if (isCustomerInfoComplete && isShippingComplete && !isPaymentReady) {
      issues.push(
        'Enter a payment reference, date, and upload proof of payment.'
      );
    }
    return issues;
  }, [isCustomerInfoComplete, isShippingComplete, isPaymentReady]);

  const buildOrderPayload = useCallback(
    ({
      cartItems,
      idempotencyKey,
      discountAmount,
      taxAmount,
      shippingAmount,
    }: BuildOrderPayloadInput): StoreOrderPayload => {
      const resolvedIdempotencyKey = idempotencyKey ?? generateIdempotencyKey();

      return {
        userId: null,
        paymentMethod: values.payment.method,
        paymentReference: values.payment.reference,
        paymentSentDate: values.payment.sentAt,
        image: values.payment.proof,
        email: values.contact.email,
        currency: values.currency,
        customerNotes: values.customerNotes,
        shippingAddress: {
          ...values.shippingAddress,
        },
        orderItems: cartItems.map((item) => {
          const productId = item.product_id ?? item.product?.id;

          if (!productId) {
            throw new Error('Cart item is missing product reference.');
          }

          return {
            productId,
            quantity: 1,
            unitPrice: item.price,
          };
        }),
        idempotencyKey: resolvedIdempotencyKey,
        discountAmount,
        taxAmount,
        shippingAmount,
      };
    },
    [values]
  );

  return {
    values,
    updateContact,
    updateShippingAddress,
    updatePayment,
    setPaymentChannel,
    setPaymentProof,
    setCustomerNotes,
    resetForm,
    buildOrderPayload,
    isCustomerInfoComplete,
    isShippingComplete,
    isPaymentReady,
    canProceedToPayment,
    canSubmitOrder,
    validationIssues,
  };
};
