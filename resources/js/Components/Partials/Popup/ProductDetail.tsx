import {FunctionComponent, useContext, useState} from "react";
import {RadioGroup} from "@headlessui/react";
import {classNames} from "@/utils";
import CartContext from "@/Context/CartContext";

type Props = {
    product: any
}

const ProductDetail: FunctionComponent<Props> = ({product}) => {
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedVariant, setSelectedVariant] = useState(product.variants[2])

    const {add} = useContext(CartContext)

    const addToCart = (p: any) => {
        p.selectedVariant = selectedVariant
        console.log(p)
        if (add) {
            add(p)
        }
    }

    return (
        <div className="grid w-full grid-cols-1 items-center gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
            <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                <img src={product.image} alt={product.name} className="object-cover object-center" />
            </div>
            <div className="sm:col-span-8 lg:col-span-7">
                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>

                <section aria-labelledby="information-heading" className="mt-2">
                    <h3 id="information-heading" className="sr-only">
                        Product information
                    </h3>

                    <p className="text-2xl text-gray-900">${selectedVariant.price}</p>
                </section>

                <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">
                        Product options
                    </h3>

                    <div>
                        {/* Sizes */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-900">Size</h4>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Ingredients
                                </a>
                            </div>

                            <RadioGroup value={selectedVariant} onChange={setSelectedVariant} className="mt-4">
                                <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                                <div className="grid grid-cols-3 gap-4">
                                    {product.variants.map((variant: any) => (
                                        <RadioGroup.Option
                                            key={variant.name}
                                            value={variant}
                                            disabled={!variant.inStock}
                                            className={({ active }) =>
                                                classNames(
                                                    variant.inStock
                                                        ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                        : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                                    active ? 'ring-2 ring-indigo-500' : '',
                                                    'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium hover:bg-gray-50 focus:outline-none sm:flex-1'
                                                )
                                            }
                                        >
                                            {({ active, checked }) => (
                                                <>
                                                    <RadioGroup.Label as="span">{variant.name}</RadioGroup.Label>
                                                    {variant.inStock ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'border' : 'border-2',
                                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                                'pointer-events-none absolute -inset-px rounded-md'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                        >
                                            <svg
                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                stroke="currentColor"
                                            >
                                              <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                          </span>
                                                    )}
                                                </>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>

                        <button
                            onClick={e => addToCart(product)}
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Add to bag
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetail;
