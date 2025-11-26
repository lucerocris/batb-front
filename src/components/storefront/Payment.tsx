import testImage from '../../assets/storefront_assets/testimage.jpg'
import QR from '../../assets/storefront_assets/QR-PAYMENT.jpg'
import PayPal from '../../assets/storefront_assets/PayPal.svg'
import BPI from '../../assets/storefront_assets/BPI.svg'



export default function(){
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
                    <div className='w-full h-full bg-white p-4'>
                            <div className='w-1/3 h-full '>
                            <div className='w-full h-3/5 flex flex-col items-center'>
                                <h1 className='text-2xl font-semibold'>GCASH</h1>
                                <img src={QR} alt="" className='w-3/4 aspect-square object-center object-cover -mt-1'/>
                                <p className='text-lg font-bold'>NIO C.</p>
                                <span className='-mt-2'>09053415915</span>                            
                            </div>

                            <div className='w-full h-2/5 flex flex-col items-center border-black mt-6'>
                                <h1 className='text-2xl font-semibold'>
                                    BANK TRANSFER
                                </h1>
                                <div className='flex flex-col h-full w-full border-pink-300 mt-2 gap-5'>
                                    <div className='flex w-full justify-between items-center border-pink-300 px-4'>
                                        <img src={BPI} alt="" className='h-[4vh] w-[8vh] object-cover' />
                                        <p className='text-xl '>25492241966</p>
                                    </div>
                                    <div className='flex w-full justify-between items-center border-pink-300 px-4'>
                                        <img src={PayPal} alt="" className='h-[4vh] object-cover' />
                                        <p className='text-xl'>25492241966</p>
                                    </div>
                                    <div className='flex w-full justify-between items-center border-pink-300 px-4'>
                                        <img src={BPI} alt="" className='h-[4vh] w-[8vh] object-cover' />
                                        <p className='text-xl'>25492241966</p>
                                    </div>
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
                                    <h1 className='font-bold '>Total:</h1>
                                    <p className='w-1/2 ml-auto min-h-10 flex flex-col items-end'>
                                        1,417.77
                                    </p>        
                                </div>
                            

                            </div>
                        <div className='w-full h-[10vh] flex p-1 bg-white'>
                            <a href="/checkout" className='h-full w-full bg-black text-white items-center justify-center flex
                            duration-300 hover:text-lg'> ORDER </a>
                        </div>
                    </div>
                </div>
            </div>            

            
        </div>
        </>
    )
}