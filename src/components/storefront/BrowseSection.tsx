import browseBg from '../../assets/storefront_assets/patterns.png';

export default function BrowseSection() {
    return (
        <div className='relative w-full h-[100vh] flex flex-col items-center'
            style={{ backgroundImage: `url(${browseBg})`, backgroundRepeat: 'repeat', backgroundPosition: 'center', backgroundSize: '160px' }}>
            <div className='w-full h-full bg-black opacity-85 absolute ponter-events-none'></div>
            <div className='relative w-full h-auto flex items-center'>
                <h1 className='text-7xl text-white font-bold px-12 py-10'>
                    BROWSE
                </h1>
                <p className='text-2xl font-extralight'
                   style={{color: 'rgb(232, 204, 72)'}}>
                    It's as simple as that.
                </p>
            </div>
        </div>
    );
}