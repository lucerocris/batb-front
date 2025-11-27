import { useState } from 'react';
import testImage from '../../assets/storefront_assets/testimage.jpg'
import QR from '../../assets/storefront_assets/QR-PAYMENT.jpg'
import PayPal from '../../assets/storefront_assets/PayPal.svg'
import BPI from '../../assets/storefront_assets/BPI.svg'
import Gcash from '../../assets/storefront_assets/GCash.svg'
import BDO from '../../assets/storefront_assets/BDO.svg'

interface PaymentProps {
    onBack?: () => void;
}

export default function Payment({ onBack }: PaymentProps){
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('gcash');
    return(
        <>
        <div className='w-full h-screen bg-white flex flex-col items-center py-5 px-5'>
            <div className='border-b-4 border-black w-full h-[10vh] flex items-center'>
                <h1 className='text-3xl font-semibold'>PAYMENT</h1>
            </div>
            <div className='w-full flex items-center justify-center gap-2 my-2'>
                <p className='text-lg font-semibold text-gray-400'>Cart &gt;</p>
                <p className='text-lg font-semibold text-gray-400'>Checkout &gt;</p>
                <p className='text-lg font-semibold'>Payment </p>
            </div>
            <div className="w-full h-full flex">
                <div className="w-2/3 h-full flex flex-col bg-gray-200 p-2">
                    <div className='w-full h-full bg-white p-4 flex'>
                        
                        <div className='w-1/3 h-full p-4 border-r-2'>
                            <h1 className='text-2xl w-full font-extrabold mb-2'>
                                PAYMENT DETAILS
                            </h1>
                            <div className='w-full h-3/5 flex flex-col items-center'>
                                <h1 className='text-lg font-semibold mb-2'>GCASH</h1>
                                <img src={QR} alt="" className='w-3/4 aspect-square object-center object-cover -mt-2'/>
                                <p className='text-base font-bold mt-1'>NIO C.</p>
                                <span className='text-sm'>09053415915</span>                            
                            </div>

                            <div className='w-full h-2/5 flex flex-col items-center mt-4'>
                                <h1 className='text-lg font-semibold mb-3'>
                                    BANK TRANSFER
                                </h1>
                                <div className='flex flex-col h-full w-full gap-2'>
                                    <div className='flex w-full justify-between items-center px-2'>
                                        <img src={BPI} alt="" className='h-[3vh] w-[6vh] object-cover' />
                                        <p className='text-sm font-mono'>25492241966</p>
                                    </div>
                                    <div className='flex w-full justify-between items-center px-2'>
                                        <img src={PayPal} alt="" className='h-[3vh] object-cover' />
                                        <p className='text-sm font-mono'>4658454211</p>
                                    </div>
                                    <div className='flex w-full justify-between items-center px-2'>
                                        <img src={BDO} alt="" className='h-[3vh] w-[8.7vh] object-cover' />
                                        <p className='text-sm font-mono'>1648553294959</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-2/3 h-full flex flex-col p-4'>
                            <h1 className='text-2xl w-full font-extrabold mb-4'>
                                PAYMENT INSTRUCTIONS
                            </h1>
                            
                            <div className='space-y-4 text-black overflow-hidden'>
                                <p>
                                    Thank you for choosing our store! Please follow these simple steps to complete your payment:
                                </p>
                                
                                <div className='border-b pb-3'>
                                    <p className='font-semibold mb-1'>Step 1: Make Your Payment</p>
                                    <p>
                                        Transfer the total amount using your chosen payment method. Please ensure you transfer the exact amount 
                                        to avoid any delays in processing your order.
                                    </p>
                                </div>
                                
                                <div className='border-b pb-3'>
                                    <p className='font-semibold mb-1'>Step 2: Submit Reference Code</p>
                                    <p>
                                        After completing your payment, you'll receive a reference code or transaction ID. 
                                        Please enter this code in the form below to help us verify your payment quickly.
                                    </p>
                                </div>
                                
                                <div className='border-b pb-3'>
                                    <p className='font-semibold mb-1'>Step 3: Order Confirmation</p>
                                    <p>
                                        Once we verify your payment, we'll send you a text message confirming your order. 
                                        This usually takes 1-2 business hours during working days.
                                    </p>
                                </div>
                                
                                <div className='mt-4 p-3 bg-gray-100 border'>
                                    <p className='font-semibold mb-1 text-red-600'>Important Note</p>
                                    <p>
                                        Please note that shipping fees will be added to your total and are shouldered by the customer. 
                                        Shipping costs depend on your location and will be calculated based on our delivery partner's rates.
                                    </p>
                                </div>
                                
                                <div className='mt-4 text-center'>
                                    <p className='text-sm text-gray-600'>
                                        Need help? Contact our customer service team and we'll be happy to assist you!
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='w-1/3 h-full ml-1'>
                    <div className='w-full flex flex-col bg-gray-200 p-2'>
                        <div className='w-full h-min-[20vh] bg-white p-2 pb-0 pt-3'> 
                            <div className='flex flex-col w-full'>

                                <h1 className='text-xl font-semibold'>Your Orders</h1>
                                <span className='text-sm -mt-1'>Checkout to proceed with payment.</span>                        

                                <div className='max-h-[8vh] w-full mt-3 flex gap-2'>
                                    <div className='h-[8vh] aspect-square
                                    hover:scale-102 transition-all duration-300'> 
                                        <img src={testImage} className='w-full h-full object-top object-cover' />
                                    </div>
                                    <div className='h-[8vh] aspect-square
                                    hover:scale-102 transition-all duration-300'> 
                                        <img src={testImage} className='w-full h-full object-top object-cover' />
                                    </div>
                                    <div className='h-[8vh] aspect-square
                                    hover:scale-102 transition-all duration-300'> 
                                        <img src={testImage} className='w-full h-full object-top object-cover' />
                                    </div>
                                </div>

                            </div>

                            <div className='w-full flex mt-2 border-t-2 border-black py-2'>   
                                <h1 className='text-md font-extrabold'>Subtotal:</h1>
                                <div className='w-1/2 ml-auto min-h-10 flex flex-col items-end'>
                                    <p>800.00</p>
                                    <p>673.23</p>
                                    <p>212.00</p>
                                    <p>532.54</p>
                                </div>        
                            </div>

                            <div className='w-full flex mt-2 border-t-2 border-black py-2'>   
                                <h1 className='font-bold text-xl'>Total:</h1>
                                <p className='w-1/2 ml-auto min-h-10 flex flex-col items-end text-xl font-semibold'>
                                    1,417.77
                                </p>        
                            </div>
                        </div>
                        {/*30vh temp */}
                        <div className='h-[30vh] w-full flex flex-col bg-white mt-2 p-2'>
                            <h1 className='text-lg font-semibold'>PAYMENT CONFIRMATION</h1>
                            <div className='w-full h-full flex flex-col mt-2'>
                                {/* Tab Headers */}
                                <div className='flex w-full border-b-2 border-gray-300'>
                                    <button 
                                        onClick={() => setSelectedPaymentMethod('gcash')}
                                        className={`flex-1 py-2 px-3 text-sm font-semibold transition-colors  cursor-pointer ${
                                            selectedPaymentMethod === 'gcash' 
                                                ? 'bg-black text-white border-b-2 border-black' 
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        GCASH
                                    </button>
                                    <button 
                                        onClick={() => setSelectedPaymentMethod('bpi')}
                                        className={`flex-1 py-2 px-3 text-sm font-semibold transition-colors  cursor-pointer ${
                                            selectedPaymentMethod === 'bpi' 
                                                ? 'bg-black text-white border-b-2 border-black' 
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        BPI
                                    </button>
                                    <button 
                                        onClick={() => setSelectedPaymentMethod('paypal')}
                                        className={`flex-1 py-2 px-3 text-sm font-semibold transition-colors  cursor-pointer ${
                                            selectedPaymentMethod === 'paypal' 
                                                ? 'bg-black text-white border-b-2 border-black' 
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        PAYPAL
                                    </button>
                                    <button 
                                        onClick={() => setSelectedPaymentMethod('bdo')}
                                        className={`flex-1 py-2 px-3 text-sm font-semibold transition-colors cursor-pointer ${
                                            selectedPaymentMethod === 'bdo' 
                                                ? 'bg-black text-white border-b-2 border-black' 
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        BDO
                                    </button>
                                </div>
                                
                                {/* Tab Content */}
                                <div className='flex-1 p-3 bg-white border border-gray-200'>
                                    {selectedPaymentMethod === 'gcash' && (
                                        <div className='text-center'>
                                            <p className='text-sm mb-2'>Enter your GCash reference number:</p>
                                            <input type="text" placeholder="Reference Number" className='w-full border border-gray-300 p-2 text-sm' />
                                        </div>
                                    )}
                                    {selectedPaymentMethod === 'bpi' && (
                                        <div className='text-center'>
                                            <p className='text-sm mb-2'>Enter your BPI reference number:</p>
                                            <input type="text" placeholder="Reference Number" className='w-full border border-gray-300 p-2 text-sm' />
                                        </div>
                                    )}
                                    {selectedPaymentMethod === 'paypal' && (
                                        <div className='text-center'        >
                                            <p className='text-sm mb-2'>Enter your PayPal transaction ID:</p>
                                            <input type="text" placeholder="Transaction ID" className='w-full border border-gray-300 p-2 text-sm' />
                                        </div>
                                    )}
                                    {selectedPaymentMethod === 'bdo' && (
                                        <div className='text-center'>
                                            <p className='text-sm mb-2'>Enter your BDO reference number:</p>
                                            <input type="text" placeholder="Reference Number" className='w-full border border-gray-300 p-2 text-sm' />
                                        </div>
                                    )}
                                </div>
                                <button 
                                className='h-full w-full bg-black text-white items-center justify-center flex
                                duration-300 hover:text-lg'
                                > 
                                ORDER 
                                </button>
                            </div>
                        </div>
                        {onBack && (
                            <div className='w-full h-[8vh] flex p-1 bg-white'>
                                <button 
                                    onClick={onBack}
                                    className='h-full w-full bg-gray-500 text-white items-center justify-center flex
                                    duration-300 hover:bg-gray-600'
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
    )
}