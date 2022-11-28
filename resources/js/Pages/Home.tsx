import {FunctionComponent, useState} from "react";
import Navbar from "@/Components/Navbar";
import PopupStoreCard from "@/Components/PopupStoreCard";
import {profile} from "@/static-data";
import LivePopupStoresSection from "@/Components/Partials/Home/LivePopupStoresSection";
import PopupExplainerSection from "@/Components/Partials/Home/PopupExplainerSection";
import Footer from "@/Components/Footer";

const stores = [
    profile,
    profile,
    profile,
    profile
]

const Home: FunctionComponent = () => {
        // stats, feed,
        return (
            <>
                <main>
                    <Navbar/>
                    <section className="pt-24 pb-12 mx-auto max-w-7xl">
                        <div className="px-12">
                            <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                                <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                                    <span>Start a</span> <span
                                    className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-rose-600 via-orange-400 to-pink-500 lg:inline">fundraiser selling </span>
                                    <span>delicious gourmet popcorn</span>
                                </h1>
                                <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
                                    We help people save time, create opportunities, and make fundraising easy all through
                                    the power of our gourmet popcorn..
                                </p>
                                <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                                    <a href="#_"
                                       className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-rose-600 rounded-2xl sm:w-auto sm:mb-0">
                                        Get Started
                                    </a>
                                    <a href="#learn"
                                       className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                            <div className="w-full mx-auto mt-20 text-center md:w-10/12">
                                <div className="relative z-0 w-full mt-8">
                                    <div className="relative overflow-hidden shadow-2xl">
                                        <div
                                            className="flex items-center flex-none px-4 bg-rose-600 rounded-b-none h-11 rounded-xl">
                                            <div className="flex space-x-1.5">
                                                <div className="w-3 h-3 border-2 border-white rounded-full"/>
                                                <div className="w-3 h-3 border-2 border-white rounded-full"/>
                                                <div className="w-3 h-3 border-2 border-white rounded-full"/>
                                            </div>
                                        </div>
                                        <img src="/images/dashboard-preview.png"/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                    <LivePopupStoresSection stores={stores}/>
                    <PopupExplainerSection/>
                </main>
                <Footer/>
            </>
        )
    }
;

export default Home;
