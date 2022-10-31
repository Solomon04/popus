import {FunctionComponent} from "react";
import PopupStoreCard from "@/Components/PopupStoreCard";

type Props = {
    stores: any[]
}

const LivePopupStoresSection: FunctionComponent<Props> = ({stores}) => {
    return (
        <section className="bg-gradient-to-r from-rose-300 via-orange-100 to-pink-200 py-8 mt-5">
            <div className="mx-auto max-w-7xl">
                <div className="py-12">
                    <h1 className="mb-8 mt-2 text-2xl text-center font-extrabold leading-none tracking-normal text-gray-900 md:text-4xl md:tracking-tight">
                        Live online popup stores
                    </h1>
                    <div className="grid grid-cols-4 gap-8 max-w-6xl mt-5">
                        {
                            stores.map(store => (
                                <PopupStoreCard store={store}/>
                            ))
                        }
                    </div>

                </div>
            </div>
        </section>
    )
};

export default LivePopupStoresSection;
