import {FunctionComponent, PropsWithChildren, useState} from "react";
import _ from "lodash";
import CartContext, {CartContextProps} from "@/Context/CartContext";
import Cookies from 'js-cookie'
import Navbar from "@/Components/Navbar";

const PopupStoreLayout: FunctionComponent<PropsWithChildren> = ({children}) => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    const remove = (priceID: string) => {
        let i = _.reject(cartItems, function (item: any) {
            return item.id === priceID;
        });
        setCartItems(i)
        Cookies.set('items', JSON.stringify(i))
    }

    const add = (product: any) => {
        let i = _.union(cartItems, [product]);
        setCartItems(i)
        Cookies.set('items', JSON.stringify(i))
    }

    const get = () => {
        return JSON.parse(Cookies.get('items') as string);
    }

    const cartContext: CartContextProps = {
        items: get(),
        add: add,
        remove: remove
    }

    return (
        <CartContext.Provider value={cartContext}>
            <main>
                {/* Nav */}
                <Navbar/>
                {/*Body*/}
                {children}
            </main>
        </CartContext.Provider>
    );
};

export default PopupStoreLayout;
