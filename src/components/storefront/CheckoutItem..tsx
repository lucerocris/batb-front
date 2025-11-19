import testImage from '../../assets/storefront_assets/testimage.jpg'
import { LucideX } from "lucide-react";

export default function(){
    return(
        <div className='w-full flex flex-col p-2'>
            <div className='w-full h-[20vh] bg-white flex justify-between hover:scale-98 transition-all duration-1000'>
                <div className='h-full aspect-square p-1.5'>
                    <img src={testImage} alt="testProduct" className='h-full w-full object-cover object-top'/>
                </div>
                <div className='ml-5 h-full w-full flex'>
                    <div className='h-full w-2/3 flex flex-col py-5'>
                        <div>
                            <h1 className='text-xl font-bold'>Nike Soul Searching</h1>
                            <p className='ml-5 text-gray-500'>Bershka shirt that is cool, made of wool and cloth</p>
                        </div>
                        <div className='mt-auto'>
                            <h1 className='text-xl font-semibold'>
                                ₱700.00    
                            </h1>
                        </div>
                    </div>
                    <div className='ml-auto h-full] p-3'>
                        <LucideX className='cursor-pointer hover:scale-125 hover:rotate-32 transition-all duration-300 hover:text-red-500'/>
                    </div>
                </div>
            </div>
        </div>
    )
}