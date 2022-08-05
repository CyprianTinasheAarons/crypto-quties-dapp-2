export function  About() {
    return (
        <div className="px-8 py-16 mx-auto text-[#EC6F35] sm:px-32 bg font min-h-screen">
            <div>
                <h1 className="mb-4 text-3xl font-bold text-center uppercase font">About NFT</h1>
                <section >
                    <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
                        <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/3 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
                            <img className="w-full md:w-1/2 md:h-auto" src="./bannerimg.png" alt="NFT" />
                            <p className="mb-8 leading-relaxed">The Crypto Quties are 999 cute & unique collectible NFT characters, each pixel hand made with love!</p>
                            <p className="mb-8 leading-relaxed">No two are exactly alike, each one with proof of ownership & stored on the Binance Smart Chain Blockchain!</p>
                            <div className="flex justify-center">
                                <a href="https://t.me/CryptoQuties"  target="_blank" className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600 pixel-btn">Join Telegram</a>
                                <a href="/" className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 pixel-btn">Mint</a>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <img className="object-cover object-center rounded" alt="hero" src="./Collage_Random.png"/>
                        </div>
                    </div>
                </section>

                </div>

        </div>

    )
}