export default function(){
    return(
        <>
        <div className='w-full min-h-screen bg-white flex flex-col items-center py-5 px-5'>
            <div className='border-b-4 border-black w-full h-[10vh] flex items-center'>
                <h1 className='text-3xl font-semibold'>CHECKOUT</h1>
            </div>
            <div className='w-full flex items-center justify-center gap-2 my-2'>
                <p className='text-lg font-semibold text-gray-400'>Cart &gt;</p>
                <p className='text-lg font-semibold '>Checkout &gt;</p>
                <p className='text-lg font-semibold text-gray-400'>Payment &gt;</p>
            </div>
            

            
        </div>
        </>
    )
}