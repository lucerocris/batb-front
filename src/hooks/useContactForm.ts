import { useCallback, useMemo, useState } from 'react';
import type {
  ContactFormValues,
  StoreInquiryResponse,
} from '@/types/contact';
import { submitInquiry } from '@/services/contactService';

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const buildInitialValues = (
  initial?: Partial<ContactFormValues>
): ContactFormValues => ({
  fullName: initial?.fullName ?? '',
  email: initial?.email ?? '',
  title: initial?.title ?? '',
  message: initial?.message ?? '',
});

const isValidEmail = (email: string) => {
  const trimmed = email.trim();
  if (!trimmed) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
};

const validateValues = (values: ContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  const fullName = values.fullName.trim();
  if (!fullName) {
    errors.fullName = 'Please provide your full name.';
  } else if (fullName.length > 255) {
    errors.fullName = 'Full name must be 255 characters or fewer.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please provide your email address.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please provide a valid email address.';
  } else if (values.email.trim().length > 255) {
    errors.email = 'Email must be 255 characters or fewer.';
  }

  const title = values.title.trim();
  if (!title) {
    errors.title = 'Please provide a title for your inquiry.';
  } else if (title.length > 255) {
    errors.title = 'Title must be 255 characters or fewer.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please provide a message.';
  }

  return errors;
};

export interface UseContactFormReturn {
  values: ContactFormValues;
  errors: ContactFormErrors;
  isValid: boolean;
  isSubmitting: boolean;
  status: SubmitStatus;
  submitError: string | null;
  submitSuccessMessage: string | null;
  updateField: (field: keyof ContactFormValues, value: string) => void;
  resetForm: () => void;
  submit: () => Promise<StoreInquiryResponse | null>;
}

export const useContactForm = (
  initialValues?: Partial<ContactFormValues>
): UseContactFormReturn => {
  const [values, setValues] = useState<ContactFormValues>(() =>
    buildInitialValues(initialValues)
  );
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState<
    string | null
  >(null);

  const errors = useMemo(() => validateValues(values), [values]);
  const isValid = useMemo(
    () => Object.keys(errors).length === 0,
    [errors]
  );

  const updateField = useCallback((field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSubmitError(null);
    setSubmitSuccessMessage(null);
    setStatus((prev) => (prev === 'success' ? 'idle' : prev));
  }, []);

  const resetForm = useCallback(() => {
    setValues(buildInitialValues(initialValues));
    setSubmitError(null);
    setSubmitSuccessMessage(null);
    setStatus('idle');
  }, [initialValues]);

  const submit = useCallback(async () => {
    const validationErrors = validateValues(values);
    if (Object.keys(validationErrors).length > 0) {
      setSubmitError('Please fill out all required fields correctly.');
      setStatus('error');
      return null;
    }

    setStatus('submitting');
    setSubmitError(null);
    setSubmitSuccessMessage(null);

    try {
      const response = await submitInquiry({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        title: values.title.trim(),
        message: values.message.trim(),
      });
      setStatus('success');
      setSubmitSuccessMessage(
        response?.message ||
          'Thank you for reaching out. We will get back to you shortly.'
      );
      setValues(buildInitialValues(initialValues));
      return response;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to submit inquiry.';
      setSubmitError(message);
      setStatus('error');
      throw error;
    }
  }, [initialValues, values]);

  return {
    values,
    errors,
    isValid,
    isSubmitting: status === 'submitting',
    status,
    submitError,
    submitSuccessMessage,
    updateField,
    resetForm,
    submit,
  };
};

