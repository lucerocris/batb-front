import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import type { UseCheckoutFormReturn } from '@/hooks/useCheckoutForm';
import { submitOrder } from '@/services/orderService';
import QR from '../../../public/assets/storefront_assets/QR-PAYMENT.jpg';
import PayPal from '../../../public/assets/storefront_assets/PayPal.svg';
import BPI from '../../../public/assets/storefront_assets/BPI.svg';
import BDO from '../../../public/assets/storefront_assets/BDO.svg';
import testImage from '../../../public/assets/storefront_assets/testimage.jpg';

const currencyFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
});

interface PaymentProps {
  checkoutForm: UseCheckoutFormReturn;
  onBack?: () => void;
}

export default function Payment({ checkoutForm, onBack }: PaymentProps) {
  const { items, total, loading: cartLoading, error: cartError } = useCart();
  const {
    values,
    setPaymentChannel,
    updatePayment,
    setPaymentProof,
    buildOrderPayload,
    canSubmitOrder: formSubmissionReady,
    validationIssues,
    resetForm,
  } = checkoutForm;
  const paymentProof = values.payment.proof;
  const selectedPaymentChannel = values.payment.channel;
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(
    null
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const previewItems = items.slice(0, 3);
  const canSubmitOrder =
    !cartLoading && !cartError && items.length > 0 && formSubmissionReady;

  const blockingReasons = useMemo(() => {
    const reasons: string[] = [];
    if (cartLoading) {
      reasons.push('Fetching cart data, please wait.');
    }
    if (cartError) {
      reasons.push('Resolve the cart issue before placing an order.');
    }
    if (!cartLoading && !cartError && !items.length) {
      reasons.push('Add at least one item to your cart.');
    }
    if (!formSubmissionReady) {
      reasons.push(...validationIssues);
    }
    return reasons;
  }, [
    cartLoading,
    cartError,
    items.length,
    formSubmissionReady,
    validationIssues,
  ]);

  const handlePaymentProofChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;
    setPaymentProof(file);
    setSubmitError(null);
  };

  const handleSubmitOrder = async () => {
    if (!canSubmitOrder) {
      setSubmitError(
        blockingReasons[0] ?? 'Unable to submit order. Please review the form.'
      );
      return;
    }

    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmitting(true);

    try {
      const payload = buildOrderPayload({ cartItems: items });
      const response = await submitOrder(payload);
      setSubmitSuccess(
        response?.message ||
          'Order submitted successfully! Check your email for confirmation.'
      );
      resetForm();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to submit order.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderReferenceFields = (label: string, placeholder: string) => (
    <div className="text-center space-y-3">
      <div>
        <p className="text-sm mb-2">{label}</p>
        <input
          type="text"
          placeholder={placeholder}
          value={values.payment.reference}
          onChange={(e) => updatePayment('reference', e.target.value)}
          className="w-full border border-gray-300 p-2 text-sm"
        />
      </div>
      <div className="text-left">
        <label className="text-xs font-semibold text-gray-600">
          Payment Date
        </label>
        <input
          type="date"
          value={values.payment.sentAt}
          onChange={(e) => updatePayment('sentAt', e.target.value)}
          className="w-full border border-gray-300 p-2 text-sm mt-1"
        />
      </div>
    </div>
  );

  useEffect(() => {
    if (!paymentProof) {
      setPaymentProofPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(paymentProof);
    setPaymentProofPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [paymentProof]);

  const handleRemovePaymentProof = () => {
    setPaymentProof(null);
    setPaymentProofPreview(null);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white flex flex-col items-center py-5 px-5">
        <div className="border-b-4 border-black w-full h-[10vh] flex items-center">
          <h1 className="text-3xl font-semibold">PAYMENT</h1>
        </div>
        <div className="w-full flex items-center justify-center gap-2 my-2">
          <p className="text-lg font-semibold text-gray-400">Cart &gt;</p>
          <p className="text-lg font-semibold text-gray-400">Checkout &gt;</p>
          <p className="text-lg font-semibold">Payment </p>
        </div>
        <div className="w-full h-full flex">
          <div className="w-2/3 h-full flex flex-col bg-gray-200 p-2">
            <div className="w-full h-full bg-white p-4 flex">
              <div className="w-1/3 h-full p-4 border-r-2">
                <h1 className="text-2xl w-full font-extrabold mb-2">
                  PAYMENT DETAILS
                </h1>
                <div className="w-full h-3/5 flex flex-col items-center">
                  <h1 className="text-lg font-semibold mb-2">GCASH</h1>
                  <img
                    src={QR}
                    alt=""
                    className="w-3/4 aspect-square object-center object-cover -mt-2"
                  />
                  <p className="text-base font-bold mt-1">NIO C.</p>
                  <span className="text-sm">09053415915</span>
                </div>

                <div className="w-full h-2/5 flex flex-col items-center mt-4">
                  <h1 className="text-lg font-semibold mb-3">BANK TRANSFER</h1>
                  <div className="flex flex-col h-full w-full gap-2">
                    <div className="flex w-full justify-between items-center px-2">
                      <img
                        src={BPI}
                        alt=""
                        className="h-[3vh] w-[6vh] object-cover"
                      />
                      <p className="text-sm font-mono">25492241966</p>
                    </div>
                    <div className="flex w-full justify-between items-center px-2">
                      <img
                        src={PayPal}
                        alt=""
                        className="h-[3vh] object-cover"
                      />
                      <p className="text-sm font-mono">4658454211</p>
                    </div>
                    <div className="flex w-full justify-between items-center px-2">
                      <img
                        src={BDO}
                        alt=""
                        className="h-[3vh] w-[8.7vh] object-cover"
                      />
                      <p className="text-sm font-mono">1648553294959</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-2/3 h-full flex flex-col p-4">
                <h1 className="text-2xl w-full font-extrabold mb-4">
                  PAYMENT INSTRUCTIONS
                </h1>

                <div className="space-y-4 text-black overflow-hidden">
                  <p>
                    Thank you for choosing our store! Please follow these simple
                    steps to complete your payment:
                  </p>

                  <div className="border-b pb-3">
                    <p className="font-semibold mb-1">
                      Step 1: Make Your Payment
                    </p>
                    <p>
                      Transfer the total amount using your chosen payment
                      method. Please ensure you transfer the exact amount to
                      avoid any delays in processing your order.
                    </p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="font-semibold mb-1">
                      Step 2: Submit Reference Code
                    </p>
                    <p>
                      After completing your payment, you'll receive a reference
                      code or transaction ID. Please enter this code in the form
                      below to help us verify your payment quickly.
                    </p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="font-semibold mb-1">
                      Step 3: Order Confirmation
                    </p>
                    <p>
                      Once we verify your payment, we'll send you a text message
                      confirming your order. This usually takes 1-2 business
                      hours during working days.
                    </p>
                  </div>

                  <div className="mt-4 p-3 bg-gray-100 border">
                    <p className="font-semibold mb-1 text-red-600">
                      Important Note
                    </p>
                    <p>
                      Please note that shipping fees will be added to your total
                      and are shouldered by the customer. Shipping costs depend
                      on your location and will be calculated based on our
                      delivery partner's rates.
                    </p>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Need help? Contact our customer service team and we'll be
                      happy to assist you!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 h-full ml-1">
            <div className="w-full flex flex-col bg-gray-200 p-2">
              <div className="w-full min-h-[30vh] bg-white p-2 pb-0 pt-3">
                <div className="flex flex-col w-full">
                  <h1 className="text-xl font-semibold">Your Orders</h1>
                  <span className="text-sm -mt-1">
                    Checkout to proceed with payment.
                  </span>

                  <div className="max-h-[8vh] w-full mt-3 flex gap-2">
                    {cartLoading && (
                      <p className="text-sm text-gray-500">Loading cart...</p>
                    )}
                    {!cartLoading && cartError && (
                      <p className="text-sm text-red-500">
                        Failed to load cart. Please try again.
                      </p>
                    )}
                    {!cartLoading && !cartError && !previewItems.length && (
                      <p className="text-sm text-gray-400">
                        Items will appear here once your cart is ready.
                      </p>
                    )}
                    {!cartLoading &&
                      !cartError &&
                      previewItems.map((item) => (
                        <div
                          key={item.id}
                          className="h-[8vh] aspect-square hover:scale-102 transition-all duration-300 overflow-hidden rounded"
                        >
                          <img
                            src={item.product.imageUrl || testImage}
                            className="w-full h-full object-top object-cover"
                            alt={item.product.name}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="w-full mt-2 border-t-2 border-black pt-2 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h1 className="text-md font-extrabold">Subtotal:</h1>
                    <p className="text-right font-semibold">
                      {cartLoading ? '...' : currencyFormatter.format(total)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1">
                    {!cartLoading &&
                      !cartError &&
                      items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm text-gray-600"
                        >
                          <span className="max-w-[60%] truncate">
                            {item.product.name}
                          </span>
                          <span>
                            {currencyFormatter.format(
                              item.subtotal ?? item.price
                            )}
                          </span>
                        </div>
                      ))}
                    {!cartLoading && !cartError && !items.length && (
                      <p className="text-sm text-gray-500">
                        No items to display.
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex mt-2 border-t-2 border-black py-2">
                  <h1 className="font-bold text-xl">Total:</h1>
                  <p className="w-1/2 ml-auto min-h-10 flex flex-col items-end text-xl font-semibold">
                    {cartLoading ? '...' : currencyFormatter.format(total)}
                  </p>
                </div>
              </div>
              {/* Payment confirmation */}
              <div className="w-full flex flex-col bg-white mt-2 p-2">
                <h1 className="text-lg font-semibold">PAYMENT CONFIRMATION</h1>
                <div className="w-full flex flex-col gap-3 mt-2">
                  {/* Tab Headers */}
                  <div className="flex w-full border-b-2 border-gray-300">
                    <button
                      onClick={() => setPaymentChannel('gcash')}
                      className={`flex-1 py-2 px-3 text-sm font-semibold transition-colors  cursor-pointer ${
                        selectedPaymentChannel === 'gcash'
                          ? 'bg-black text-white border-b-2 border-black'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      GCASH
                    </button>
                    <button
                      onClick={() => setPaymentChannel('bpi')}
                      className={`flex-1 py-2 px-3 text-sm font-semibold transition-colors  cursor-pointer ${
                        selectedPaymentChannel === 'bpi'
                          ? 'bg-black text-white border-b-2 border-black'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      BPI
                    </button>
                    <button
                      onClick={() => setPaymentChannel('paypal')}
                      className={`flex-1 py-2 px-3 text-sm font-semibold transition-colors  cursor-pointer ${
                        selectedPaymentChannel === 'paypal'
                          ? 'bg-black text-white border-b-2 border-black'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      PAYPAL
                    </button>
                    <button
                      onClick={() => setPaymentChannel('bdo')}
                      className={`flex-1 py-2 px-3 text-sm font-semibold transition-colors cursor-pointer ${
                        selectedPaymentChannel === 'bdo'
                          ? 'bg-black text-white border-b-2 border-black'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      BDO
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-3 bg-white border border-gray-200">
                    {selectedPaymentChannel === 'gcash' &&
                      renderReferenceFields(
                        'Enter your GCash reference number:',
                        'Reference Number'
                      )}
                    {selectedPaymentChannel === 'bpi' &&
                      renderReferenceFields(
                        'Enter your BPI reference number:',
                        'Reference Number'
                      )}
                    {selectedPaymentChannel === 'paypal' &&
                      renderReferenceFields(
                        'Enter your PayPal transaction ID:',
                        'Transaction ID'
                      )}
                    {selectedPaymentChannel === 'bdo' &&
                      renderReferenceFields(
                        'Enter your BDO reference number:',
                        'Reference Number'
                      )}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      id="payment-proof"
                      className="hidden"
                      onChange={handlePaymentProofChange}
                    />
                    <label
                      htmlFor="payment-proof"
                      className="inline-flex items-center justify-center px-4 py-2 bg-black text-white text-sm font-semibold cursor-pointer rounded hover:bg-gray-900 transition-colors"
                    >
                      {paymentProof
                        ? 'Change Payment Proof'
                        : 'Upload Payment Proof'}
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Attach a screenshot or photo of your payment receipt
                      (JPG/PNG, max 5MB).
                    </p>
                    {paymentProof && (
                      <p className="text-sm text-gray-700 mt-1 break-all">
                        Selected file: {paymentProof.name}
                      </p>
                    )}
                    {paymentProofPreview && (
                      <div className="mt-3 flex flex-col items-center gap-2">
                        <span className="text-xs text-gray-500">Preview:</span>
                        <img
                          src={paymentProofPreview}
                          alt="Payment proof preview"
                          className="w-32 h-32 object-cover rounded border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePaymentProof}
                          className="text-xs text-red-600 hover:text-red-700 underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmitOrder}
                    disabled={!canSubmitOrder || isSubmitting}
                    className="w-full py-3 bg-black text-white items-center justify-center flex
                                duration-300 hover:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'PROCESSING...' : 'ORDER'}
                  </button>
                </div>
                {(blockingReasons.length > 0 || submitError) && (
                  <div className="text-xs text-gray-600 mt-2 space-y-1">
                    {submitError && (
                      <p className="text-red-600 font-semibold">
                        {submitError}
                      </p>
                    )}
                    <ul className="list-disc list-inside space-y-0.5">
                      {blockingReasons.map((reason, index) => (
                        <li key={`${reason}-${index}`}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {submitSuccess && (
                  <p className="text-xs text-emerald-600 mt-2">
                    {submitSuccess}
                  </p>
                )}
              </div>
              {onBack && (
                <div className="w-full h-[8vh] flex p-1 bg-white">
                  <button
                    onClick={onBack}
                    className="h-full w-full bg-gray-500 text-white items-center justify-center flex
                                    duration-300 hover:bg-gray-600"
                  >
                    ← GO BACK
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
