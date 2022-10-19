import {FunctionComponent, useState} from "react";
import ProductList from "@/Components/Partials/Popup/ProductList";
import Leaderboard from "@/Components/Partials/Popup/Leaderboard";
import Supporters from "@/Components/Partials/Popup/Supporters";
import Navbar from "@/Components/Navbar";
import Jumbotron from "@/Components/Partials/Popup/Jumbotron";
import _ from "lodash";
import CartContext, {CartContextProps} from "@/Context/CartContext";
import Cart from "@/Components/Partials/Popup/Cart";

const profile = {
    name: 'Matthew Hurt',
    fundraiser: 'John Marshall Boys Basketball',
    description: 'Hey! Its that time of year! Your favorite JM player is asking for your support! Our fundraiser this fall is Popus popcorn! Thanks for your support!',
    total: 1340,
    goal: 2000,
    timeLeft: '21 hours to go'
}

const products = [
    {
        name: 'Caramel Apple',
        tagline: 'Taste like Candy 🍭',
        image: 'https://orangerosedistrpopup.com/storage/6/carmel-apple-bag-preview.png',
        price: 12.99,
        variants: [
            { name: '1 Pack', inStock: true, price: 9.99 },
            { name: 'M', inStock: true, price: 19.99 },
            { name: 'L', inStock: false, price: 24.99 },
            { name: 'XL', inStock: true, price: 32.99 },
        ],
        colors: [
            { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
            { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
            { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        ],
    },
    {
        name: 'Banana Pudding',
        tagline: 'Sweet Banana 🍌',
        image: 'https://orangerosedistrpopup.com/storage/10/banana-pudding-bag-preview.png',
        price: 12.99,
        variants: [
            { name: '1 Pack', inStock: true, price: 10 },
            { name: '3 Pack', inStock: true, price: 27 },
            { name: '6 Pack', inStock: true, price: 54 },
        ],
        colors: [
            { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
            { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
            { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        ],
    },
    {
        name: 'Simply Blazin\'',
        tagline: 'Hot and spicy 🌶',
        image: 'https://orangerosedistrpopup.com/storage/2/simply-blazin-bag-preview.png',
        price: 12.99,
        variants: [
            { name: '1 Pack', inStock: true, price: 10 },
            { name: '3 Pack', inStock: true, price: 27 },
            { name: '6 Pack', inStock: true, price: 54 },
        ],
        colors: [
            { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
            { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
            { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        ],
    },
    {
        name: 'Sriracha',
        tagline: 'Sweet and spicy 🌶',
        image: 'https://orangerosedistrpopup.com/storage/13/sriracha-bag-preview.png',
        price: 12.99,
        variants: [
            { name: '1 Pack', inStock: true, price: 10 },
            { name: '3 Pack', inStock: true, price: 27 },
            { name: '6 Pack', inStock: true, price: 54 },
        ],
        colors: [
            { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
            { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
            { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        ],
    },
    {
        name: 'Cheesy Caramel',
        tagline: 'Tasty Cheesy 🧀',
        image: 'https://orangerosedistrpopup.com/storage/19/cheesy-caramel-bag-preview.png',
        price: 12.99,
        variants: [
            { name: '1 Pack', inStock: true, price: 10 },
            { name: '3 Pack', inStock: true, price: 27 },
            { name: '6 Pack', inStock: true, price: 54 },
        ],
        colors: [
            { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
            { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
            { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        ],
    },
    {
        name: 'Jalapeno',
        tagline: 'Hot and spicy 🌶',
        image: 'https://orangerosedistrpopup.com/storage/17/jalepeno-bag-preview.png',
        price: 12.99,
        variants: [
            { name: '1 Pack', inStock: true, price: 10 },
            { name: '3 Pack', inStock: true, price: 27 },
            { name: '6 Pack', inStock: true, price: 54 },
        ],
        colors: [
            { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
            { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
            { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        ],
    },
]

const leaderboard = [
    {
        name: 'Matthew Hurt',
        image: 'https://cdn1.sportngin.com/attachments/photo/ee0f-121282811/Matthew_Hurt_large.JPG',
        total: 1304
    },
    {
        name: 'Michael Hurt',
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4066389.png',
        total: 1210
    },
    {
        name: 'Dedoch Chan',
        image: 'https://d1mnbasketball.com/wp-content/uploads/2020/01/Dedoch-Chan-600-x-22-350x263.png',
        total: 1103
    },
    {
        name: 'Isaiah Walden',
        image: 'https://winonastatewarriors.com/images/2017/9/15/IWalden.jpg',
        total: 1021
    },
    {
        name: 'Ray Adams',
        image: 'https://static.hudl.com/users/prod/6894199_450a6a6a0449446491423f5cc0a9862c.jpg',
        total: 1001
    },
    {
        name: 'DAngelo Tines',
        image: 'https://www.austindailyherald.com/wp-content/uploads/sites/15/2015/12/1213.AustinBoysBasketball-4.jpg',
        total: 974
    },
    {
        name: 'Emerson Gonyea',
        image: 'https://pbs.twimg.com/media/CyOVvBVUcAAT5jd?format=jpg&name=large',
        total: 852
    },
    {
        name: 'Brandon Kriegel',
        image: 'https://cdn2.sportngin.com/attachments/roster_player_info/3458/7893/JM_BB_2014--028_medium.jpg',
        total: 757
    },
    {
        name: 'Eric Stai',
        image: 'https://pbs.twimg.com/profile_images/871589415088525312/gnk4i1rF_400x400.jpg',
        total: 696
    },
    {
        name: 'Solomon Antoine',
        image: 'https://static.hudl.com/users/temp/5605422_761e6c1caab64c34898d359493feaf8d.PNG',
        total: 621
    },
]

const supporters = [
    {
        customer: 'Tatiana',
        total: 14,
        location: 'Minnesota',
        time: '4 hours ago'
    },
    {
        customer: 'Jonathan',
        total: 51,
        location: 'Illinois',
        time: '9 hours ago'
    },
    {
        customer: 'Matthew',
        total: 19,
        location: 'Iowa',
        time: '13 hours ago'
    },
    {
        customer: 'Doug',
        total: 42,
        location: 'Wisconsin',
        time: '16 hours ago'
    },
    {
        customer: 'Jackson',
        total: 29,
        location: 'Ohio',
        time: '21 hours ago'
    },
    {
        customer: 'Jonathan',
        total: 51,
        location: 'Illinois',
        time: '9 hours ago'
    },
    {
        customer: 'Matthew',
        total: 19,
        location: 'Iowa',
        time: '13 hours ago'
    },
    {
        customer: 'Doug',
        total: 42,
        location: 'Wisconsin',
        time: '16 hours ago'
    },
    {
        customer: 'Jackson',
        total: 29,
        location: 'Ohio',
        time: '21 hours ago'
    },
]

const Store:FunctionComponent = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    const remove = (priceID: string) => {
        let i = _.reject(cartItems, function (item: any) {
            return item.id === priceID;
        });
        setCartItems(i)
    }

    const add = (product: any) => {
        let i = _.union(cartItems, [product]);
        setCartItems(i)
    }

    const cartContext: CartContextProps = {
        items: cartItems,
        add: add,
        remove: remove
    }


    return (
        <CartContext.Provider value={cartContext}>
            <main>
                {/* Nav */}
                <Navbar/>
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
            </main>
        </CartContext.Provider>
    )
}

export default Store;
