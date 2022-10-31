import {FunctionComponent} from "react";
import {PlayCircleIcon} from "@heroicons/react/24/solid";

const Footer: FunctionComponent = () => {
    return (
        <footer className="bg-white">
            <div className="container px-6 py-8 mx-auto">
                <div className="text-center">
                    <a href="#" className="text-2xl font-bold text-gray-800 hover:text-gray-700">Popus Gives</a>
                    <p className="max-w-md mx-auto mt-2 text-gray-500">Raise funds online by selling our delicous gourmet popcorn.</p>
                    <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
                        <button className="flex items-center justify-center order-1 w-full px-2 py-2 mt-3 text-sm tracking-wide text-gray-600 capitalize transition-colors duration-300 transform border rounded-md sm:mx-2 sm:mt-0 sm:w-auto hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                            <PlayCircleIcon className="w-5 h-5 mx-1"/>
                            <span className="mx-1">View Demo</span>
                        </button>
                        <button className="w-full px-5 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-rose-600 rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-rose-500 focus:outline-none focus:ring focus:ring-rose-300 focus:ring-opacity-80">Get started</button>
                    </div>
                </div>
                <hr className="my-10 border-gray-200" />
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <p className="text-sm text-gray-400">© Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
                    <div className="flex mt-3 -mx-2 sm:mt-0">
                        <a href="#" className="mx-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-500" aria-label="Reddit"> Teams </a>
                        <a href="#" className="mx-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-500" aria-label="Reddit"> Privacy </a>
                        <a href="#" className="mx-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-500" aria-label="Reddit"> Cookies </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
