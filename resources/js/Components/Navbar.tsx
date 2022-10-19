import {FunctionComponent} from "react";

const Navbar: FunctionComponent = () => {
    return (
        <nav className="bg-white p-2 shadow">
            <div className="max-w-7xl mx-auto flex items-center justify-between ">
                <a href="/">
                    <img src="/images/text-logo.png" alt="logo" className="h-auto w-24" />
                </a>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
              <span className="text-sm font-medium leading-none text-white">DT</span>
            </span>
            </div>
        </nav>
    );
};

export default Navbar;
