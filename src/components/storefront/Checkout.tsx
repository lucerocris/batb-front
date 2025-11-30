
import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import testImage from '../../../public/assets/storefront_assets/testimage.jpg'

const currencyFormatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
});

//WARNING, FETCHING FOR PSGC API USED AI 
//FIX IF SOMETHING WENT WRONG

// Type definitions for PSGC API
interface PSGCLocation {
    code: string;
    name: string;
}

interface MyCartProps {
    onPayment?: () => void;
    onBack?: () => void;
}

export default function({ onPayment, onBack }: MyCartProps){
    const { items, total, loading: cartLoading, error: cartError } = useCart();
    // Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    
    // Location states
    const [regions, setRegions] = useState<PSGCLocation[]>([]);
    const [provinces, setProvinces] = useState<PSGCLocation[]>([]);
    const [cities, setCities] = useState<PSGCLocation[]>([]);
    const [barangays, setBarangays] = useState<PSGCLocation[]>([]);
    
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedBarangay, setSelectedBarangay] = useState('');
    
    // Loading states
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingBarangays, setLoadingBarangays] = useState(false);

    // Fetch regions on component mount
    useEffect(() => {
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        try {
            const response = await fetch('https://psgc.cloud/api/regions');
            const data = await response.json();
            setRegions(data);
        } catch (error) {
            console.error('Error fetching regions:', error);
        }
    };

    const fetchProvinces = async (regionCode: string) => {
        setLoadingProvinces(true);
        try {
            const response = await fetch(`https://psgc.cloud/api/regions/${regionCode}/provinces`);
            const data = await response.json();
            setProvinces(data);
            setCities([]);
            setBarangays([]);
            setSelectedProvince('');
            setSelectedCity('');
            setSelectedBarangay('');
        } catch (error) {
            console.error('Error fetching provinces:', error);
        } finally {
            setLoadingProvinces(false);
        }
    };

    const fetchCities = async (provinceCode: string) => {
        setLoadingCities(true);
        try {
            const response = await fetch(`https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`);
            const data = await response.json();
            setCities(data);
            setBarangays([]);
            setSelectedCity('');
            setSelectedBarangay('');
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            setLoadingCities(false);
        }
    };

    const fetchBarangays = async (cityCode: string) => {
        setLoadingBarangays(true);
        try {
            const response = await fetch(`https://psgc.cloud/api/cities-municipalities/${cityCode}/barangays`);
            const data = await response.json();
            setBarangays(data);
            setSelectedBarangay('');
        } catch (error) {
            console.error('Error fetching barangays:', error);
        } finally {
            setLoadingBarangays(false);
        }
    };

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const regionCode = e.target.value;
        setSelectedRegion(regionCode);
        if (regionCode) {
            fetchProvinces(regionCode);
        } else {
            setProvinces([]);
            setCities([]);
            setBarangays([]);
        }
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        if (provinceCode) {
            fetchCities(provinceCode);
        } else {
            setCities([]);
            setBarangays([]);
        }
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityCode = e.target.value;
        setSelectedCity(cityCode);
        if (cityCode) {
            fetchBarangays(cityCode);
        } else {
            setBarangays([]);
        }
    };

    const formatPhoneNumber = (value: string) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length >= 10) {
            return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
        } else if (digits.length >= 6) {
            return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
        } else if (digits.length >= 3) {
            return `${digits.slice(0, 3)} ${digits.slice(3)}`;
        }
        return digits;
    };
    const previewItems = items.slice(0, 3);
    const canProceedToPayment = !cartLoading && !cartError && items.length > 0;
    return(
        <>
        <div className='w-full h-screen bg-white flex flex-col items-center py-5 px-5'>
            <div className='border-b-4 border-black w-full h-[10vh] flex items-center'>
                <h1 className='text-3xl font-semibold'>CHECKOUT</h1>
            </div>
            <div className='w-full flex items-center justify-center gap-2 my-2'>
                <p className='text-lg font-semibold text-gray-400'>Cart &gt;</p>
                <p className='text-lg font-semibold '>Checkout &gt;</p>
                <p className='text-lg font-semibold text-gray-400'>Payment</p>
            </div>
            <div className="w-full h-full flex border-2">
                <div className="w-2/3 h-full flex flex-col bg-gray-200 p-2">
                    <div className='w-full h-full bg-white p-4'>
                        <div className='flex w-full border-b-2 border-black py-1'>
                            <h1 className='text-xl font-semibold'>CUSTOMER INFORMATION</h1>
                        </div>
                        <form action="">
                            <div className='grid grid-cols-2 mt-2 gap-5'>
                                <div className='name flex flex-col'>
                                    <label className='font-semibold'> First Name</label>
                                    <input 
                                        type="text" 
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder='John' 
                                        className='text-lg border-2 border-gray-300 rounded py-3 px-2 focus:outline-0'
                                    />
                                </div>
                                <div className='name flex flex-col'>
                                    <label className='font-semibold'> Last Name</label>
                                    <input 
                                        type="text" 
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder='Doe' 
                                        className='text-lg border-2 border-gray-300 rounded py-3 px-2 focus:outline-0'
                                    />
                                </div>
                                <div className='name flex flex-col'>
                                    <label className='font-semibold'> Email</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='customer@example.com' 
                                        className='text-lg border-2 border-gray-300 rounded py-3 px-2 focus:outline-0'
                                    />
                                </div>
                                <div className='name flex flex-col'>
                                    <label className='font-semibold'> Phone</label>
                                    <input 
                                        type="tel" 
                                        value={phoneNumber ? `(+63) ${formatPhoneNumber(phoneNumber)}` : ''}
                                        onChange={(e) => {
                                            const value = e.target.value.replace('(+63) ', '').replace(/\D/g, '');
                                            setPhoneNumber(value);
                                        }}
                                        placeholder='(+63) 9XX XXX XXXX' 
                                        className='text-lg border-2 border-gray-300 rounded py-3 px-2 focus:outline-0'
                                    />
                                </div>  
                            </div>
                        </form>
                         <div className='flex w-full border-b-2 border-black py-1 mt-4'>
                            <h1 className='text-xl font-semibold'>ADDRESS INFORMATION</h1>
                        </div>
                        
                        <div className='grid grid-cols-2 mt-2 gap-5'>
                            <div className='flex flex-col'>
                                <label className='font-semibold'>Street Address</label>
                                <input 
                                    type="text" 
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    placeholder='123 Street Name, Block/Lot' 
                                    className='text-lg border-2 border-gray-300 rounded py-3 px-2 focus:outline-0'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-semibold'>ZIP Code</label>
                                <input 
                                    type="text" 
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder='1234' 
                                    className='text-lg border-2 border-gray-300 rounded py-3 px-2 focus:outline-0'
                                />
                            </div>
                            
                            <div className='flex flex-col'>
                                <label className='font-semibold'>Region</label>
                                <select 
                                    value={selectedRegion}
                                    onChange={handleRegionChange}
                                    className='text-lg border-2 border-gray-300 rounded py-3 px-2 focus:outline-0'
                                >
                                    <option value="">Select Region</option>
                                    {regions.map((region) => (
                                        <option key={region.code} value={region.code}>
                                            {region.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className='flex flex-col'>
                                <label className='font-semibold'>Province</label>
                                <select 
                                    value={selectedProvince}
                                    onChange={handleProvinceChange}
                                    disabled={!selectedRegion || loadingProvinces}
                                    className='text-lg border-2 border-gray-300 rounded py-3 px-2 focus:outline-0 disabled:bg-gray-100'
                                >
                                    <option value="">
                                        {loadingProvinces ? 'Loading...' : 'Select Province'}
                                    </option>
                                    {provinces.map((province) => (
                                        <option key={province.code} value={province.code}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className='flex flex-col'>
                                <label className='font-semibold'>City/Municipality</label>
                                <select 
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                    disabled={!selectedProvince || loadingCities}
                                    className='text-lg border-2 border-gray-300 rounded py-3 px-2 focus:outline-0 disabled:bg-gray-100'
                                >
                                    <option value="">
                                        {loadingCities ? 'Loading...' : 'Select City/Municipality'}
                                    </option>
                                    {cities.map((city) => (
                                        <option key={city.code} value={city.code}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className='flex flex-col'>
                                <label className='font-semibold'>Barangay</label>
                                <select 
                                    value={selectedBarangay}
                                    onChange={(e) => setSelectedBarangay(e.target.value)}
                                    disabled={!selectedCity || loadingBarangays}
                                    className='text-lg border-2 border-gray-300 rounded py-3 px-2 focus:outline-0 disabled:bg-gray-100'
                                >
                                    <option value="">
                                        {loadingBarangays ? 'Loading...' : 'Select Barangay'}
                                    </option>
                                    {barangays.map((barangay) => (
                                        <option key={barangay.code} value={barangay.code}>
                                            {barangay.name}
                                        </option>
                                    ))}
                                </select>
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
                                        {cartLoading && (
                                            <p className='text-sm text-gray-500'>Loading cart...</p>
                                        )}
                                        {!cartLoading && cartError && (
                                            <p className='text-sm text-red-500'>Failed to load cart. Please try again.</p>
                                        )}
                                        {!cartLoading && !cartError && !previewItems.length && (
                                            <p className='text-sm text-gray-400'>Items will appear here once your cart is ready.</p>
                                        )}
                                        {!cartLoading && !cartError && previewItems.map((item) => (
                                            <div 
                                                key={item.id}
                                                className='h-[8vh] aspect-square hover:scale-102 transition-all duration-300 overflow-hidden rounded'
                                            > 
                                                <img 
                                                    src={item.product.imageUrl || testImage} 
                                                    className='w-full h-full object-top object-cover' 
                                                    alt={item.product.name}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <div className='w-full mt-2 border-t-2 border-black pt-2 flex flex-col gap-2'>   
                                    <div className='flex items-center justify-between'>
                                        <h1 className='text-md font-extrabold'>Subtotal:</h1>
                                        <p className='text-right font-semibold'>
                                            {cartLoading ? '...' : currencyFormatter.format(total)}
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-1 max-h-40 overflow-y-auto pr-1'>
                                        {!cartLoading && !cartError && items.map((item) => (
                                            <div key={item.id} className='flex justify-between text-sm text-gray-600'>
                                                <span className='max-w-[60%] truncate'>
                                                    {item.quantity} × {item.product.name}
                                                </span>
                                                <span>
                                                    {currencyFormatter.format(item.subtotal ?? item.price * item.quantity)}
                                                </span>
                                            </div>
                                        ))}
                                        {!cartLoading && !cartError && !items.length && (
                                            <p className='text-sm text-gray-500'>No items to display.</p>
                                        )}
                                    </div>
                                </div>

                                <div className='w-full flex mt-2 border-t-2 border-black py-2'>   
                                    <h1 className='font-bold '>Total:</h1>
                                    <p className='w-1/2 ml-auto min-h-10 flex flex-col items-end'>
                                        {cartLoading ? '...' : currencyFormatter.format(total)}
                                    </p>        
                                </div>
                            

                            </div>
                        <div className='w-full h-[10vh] flex p-1 bg-white'>
                            <button 
                                onClick={onPayment}
                                disabled={!canProceedToPayment}
                                className='h-full w-full bg-black text-white items-center justify-center flex
                                duration-300 hover:text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                            
                            > PROCEED </button>
                        </div>
                        {!canProceedToPayment && (
                            <p className='text-xs text-gray-500 text-center mt-1'>
                                {cartLoading && 'Fetching your cart...'}
                                {!cartLoading && cartError && 'Resolve the cart issue to continue.'}
                                {!cartLoading && !cartError && !items.length && 'Add items to your cart to proceed.'}
                            </p>
                        )}
                        {onBack && (
                            <div className='w-full h-[8vh] flex p-1 bg-white'>
                                <button 
                                    onClick={onBack}
                                    className='h-full w-full bg-gray-500 text-white items-center justify-center flex
                                    duration-300 hover:bg-gray-600 cursor-pointer'
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