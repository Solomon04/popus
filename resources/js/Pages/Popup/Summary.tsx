import {FunctionComponent} from "react";
import PopupStoreLayout from "@/Layouts/PopupStoreLayout";
import {Link} from "@inertiajs/inertia-react";
import {CheckCircleIcon, ChevronLeftIcon} from "@heroicons/react/20/solid";
import OrderSummary from "@/Components/Partials/Summary/OrderSummary";

const Summary: FunctionComponent = () => {
    return (
        <PopupStoreLayout>
            <div className="bg-gray-50">
                <div className="mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-12 xl:gap-x-16">
                        <div className="col-span-3">
                            <div className="mb-3">
                                <h3 className="text-gray-600 font-medium text-sm tracking-tight">Order Number</h3>
                                <h2 className="text-gray-600 font-semibold text-lg">cd07d1b2-af6e-4662-97d5-42ffe0c4402e</h2>
                            </div>
                            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-10">Thanks for your order!</h1>

                            {/*Arrival Card*/}
                            <div className="w-full bg-slate-100 mt-5 p-6 rounded">
                                <h3 className="text-gray-600 font-medium text-sm tracking-tight">Estimated Delivery Date</h3>
                                <h2 className="text-900 font-semibold">November 7 - November 17</h2>
                            </div>

                            {/*Popcorn Tracker Card*/}
                            <div className="w-full border rounded border-slate-200 p-5 mt-5">
                                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl leading-10">Order Tracker</h1>

                                <div className="lg:py-6 lg:pr-16">
                                    <div className="flex">
                                        <div className="flex flex-col items-center mr-4">
                                            <div>
                                                <CheckCircleIcon className="text-emerald-400 h-4 w-4"/>
                                            </div>
                                            <div className="w-px h-full bg-gray-300" />
                                        </div>
                                        <div className="pt-1 pb-3">
                                            <p className="mb-1 text-lg font-bold">Order Confirmed</p>
                                            <p className="mb-2 text-gray-900 font-medium">September 22nd</p>
                                            <p className="text-gray-700">We have received your order and will ship soon!</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 px-1 pt-4">
                                    <p className="mb-1 text-gray-600 font-bold">Tracking Number</p>
                                    <p className="mb-2 text-gray-900 font-medium">Available once shipped</p>
                                </div>
                            </div>

                            {/*Share Popup Store Card*/}
                            <div className="w-full border rounded border-slate-200 p-5 mt-5">
                                <h1 className="mb-2 font-bold text-xl md:text-2xl lg:text-3xl leading-10">Share Popup Store</h1>
                                <p className="mb-2 text-gray-600 font-medium">Sharing a popup store on Facebook can help 10x sales.</p>
                                <button
                                    className="inline-block rounded-full bg-gradient-to-r from-pink-400 via-rose-600 to-yellow-400 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                                >
                                  <span
                                      className="block rounded-full bg-white px-8 py-3 text-sm font-medium hover:bg-transparent"
                                  >
                                    Share Popup Store
                                  </span>
                                </button>
                                <button
                                    className="sm:ml-3 inline-block rounded-full bg-gradient-to-r from-pink-400 via-rose-600 to-yellow-400 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                                >
                                  <span
                                      className="block rounded-full bg-white px-8 py-3 text-sm font-medium hover:bg-transparent"
                                  >
                                    Return to Store
                                  </span>
                                </button>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <OrderSummary/>
                        </div>
                    </div>
                </div>


            </div>

        </PopupStoreLayout>
    );
};

export default Summary;
