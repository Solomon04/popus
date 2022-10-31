import {FunctionComponent, useContext} from "react";
import CartContext from "@/Context/CartContext";
import _ from "lodash";

const OrderSummary: FunctionComponent = () => {
    const {items} = useContext(CartContext);

    const subtotal = () => {
        return _.sumBy(items, (i) => {
            return i.selectedVariant.price
        })
    }

    const shipping = () => {
        // todo copy DoubleGood shipping structure
        return 5
    }

    const taxes = () => {
        // todo get info from Stripe
        return 5
    }

    const total = () => {
        return subtotal() + shipping() + taxes();
    }

    return (
        <>
            {
                items && items.length > 0 ? (
                    <div className="w-full p-5 rounded bg-slate-100 shadow-sm">
                        <div>
                            <h2 className="font-bold text-xl md:text-3xl leading-10">Order Summary</h2>

                            <div className="mt-4">
                                <h3 className="sr-only">Items in your cart</h3>
                                {
                                    items ? (
                                        <>
                                            <ul role="list" className="divide-y divide-slate-200">
                                                {items.map((product, index) => (
                                                    <li key={index} className="flex py-6 px-4">
                                                        <div
                                                            className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200 border border-gray-200">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="h-full w-full object-contain object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div
                                                                    className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="#">{product.name}</a>
                                                                    </h3>
                                                                    <p className="ml-4">${product.selectedVariant.price}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{product.selectedVariant.name}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500">Qty 1</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <dl className="space-y-1.5 border-t border-slate-200 py-6">
                                                <div className="flex items-center justify-between px-2">
                                                    <dt className="text-sm">Subtotal</dt>
                                                    <dd className="text-sm font-medium text-gray-900">${subtotal().toFixed(2)}</dd>
                                                </div>
                                                <div className="flex items-center justify-between px-2">
                                                    <dt className="text-sm">Shipping</dt>
                                                    <dd className="text-sm font-medium text-gray-900">${shipping().toFixed(2)}</dd>
                                                </div>
                                                <div className="flex items-center justify-between px-2">
                                                    <dt className="text-sm">Taxes</dt>
                                                    <dd className="text-sm font-medium text-gray-900">${taxes().toFixed(2)}</dd>
                                                </div>
                                                <div
                                                    className="flex items-center justify-between border-t border-slate-200 pt-6 px-2">
                                                    <dt className="text-base font-medium">Total</dt>
                                                    <dd className="text-base font-medium text-gray-900">${total().toFixed(2)}</dd>
                                                </div>
                                            </dl>
                                        </>
                                    ) : null
                                }
                            </div>
                        </div>

                        <div className="mt-5">
                            <h2 className="font-bold text-xl md:text-3xl leading-10">Customer Information</h2>

                            <div className="space-y-1 mt-6">
                                <h3 className="mb-1 font-semibold text-lg text-gray-700">Contact Information</h3>
                                <p className="font-medium text-gray-600 text-sm">Solomon Antoine</p>
                                <p className="font-medium text-gray-600 text-sm">antoinesolomon5@gmail.com</p>
                                <p className="font-medium text-gray-600 text-sm">507-440-7130</p>
                            </div>

                            <div className="space-y-1 mt-6">
                                <h3 className="mb-1 font-semibold text-lg text-gray-700">Shipping Address</h3>
                                <p className="font-medium text-gray-600 text-sm">Solomon Antoine</p>
                                <p className="font-medium text-gray-600 text-sm">15300 Greenhaven Ln, Apt 214</p>
                                <p className="font-medium text-gray-600 text-sm">Burnsville, MN 55306</p>
                            </div>

                            <div className="space-y-1 mt-6">
                                <h3 className="mb-1 font-semibold text-lg text-gray-700">Payment Method</h3>
                                <p className="font-medium text-gray-600 text-sm">Visa ending in 4242</p>
                            </div>
                        </div>


                    </div>
                ) : null
            }
        </>
    );
};

export default OrderSummary;
