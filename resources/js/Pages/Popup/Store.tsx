import {FunctionComponent, useState} from "react";
import ProductList from "@/Components/Partials/PopupStore/ProductList";
import Leaderboard from "@/Components/Partials/PopupStore/Leaderboard";
import Supporters from "@/Components/Partials/PopupStore/Supporters";
import Navbar from "@/Components/Navbar";
import Jumbotron from "@/Components/Partials/PopupStore/Jumbotron";
import _ from "lodash";
import CartContext, {CartContextProps} from "@/Context/CartContext";
import Cart from "@/Components/Partials/PopupStore/Cart";
import {leaderboard, products, profile, supporters} from "@/static-data";
import PopupStoreLayout from "@/Layouts/PopupStoreLayout";


const Store:FunctionComponent = () => {
    return (
        <PopupStoreLayout>
            <div className="max-w-7xl mx-auto py-4">
                {/* Profile Jumbotron */}
                <Jumbotron profile={profile}/>
                <div className="grid grid-cols-1 rounded-md md:grid-cols-3 md:gap-8 md:p-12">
                    {/* Product List */}
                    <ProductList products={products}/>

                    <div className="col-span-1 p-5 md:p-0">
                        {/* Leaderboard List + Leaderboard Slideover */}
                        <Leaderboard leaderboard={leaderboard}/>
                        {/* Supporters List + Support Slideover */}
                        <Supporters supporters={supporters}/>
                    </div>
                </div>
            </div>

            <Cart/>
        </PopupStoreLayout>
    )
}

export default Store;
