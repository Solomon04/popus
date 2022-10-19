import {FunctionComponent, useState} from "react";
import Modal from "@/Components/Modal";
import {RadioGroup} from "@headlessui/react";
import ProductDetail from "@/Components/Partials/Popup/ProductDetail";

type Props = {
    products: any[]
}

const ProductList: FunctionComponent<Props> = ({products}) => {
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const closeProductModal = () => {
        setSelectedProduct(null);
        setShowProductModal(false);
    }

    const selectProduct = (product: any) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    }

    return (
        <div className="col-span-2 p-5 md:p-0">
            <h3 className="border-b border-gray-100 pb-4 text-2xl font-bold">Shop Products</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products.map((product, id) => (
                    <div key={id} className="group relative" onClick={() => selectProduct(product)}>
                        <div
                            className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-contain object-center py-2 lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{product.tagline}</p>
                                <h3 className="mt-1 text-lg font-medium text-gray-700">
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0"/>
                                        {product.name}
                                    </a>
                                </h3>
                            </div>
                            <p className="font-medium text-gray-900">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {
                selectedProduct ? (
                    <Modal open={showProductModal} setOpen={closeProductModal}>
                       <ProductDetail product={selectedProduct}/>
                    </Modal>
                ): null
            }
        </div>
    );
};

export default ProductList;
