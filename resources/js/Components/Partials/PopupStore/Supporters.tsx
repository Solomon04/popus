import {FunctionComponent, useState} from "react";
import Slideover from "@/Components/Slideover";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";

type Props = {
    supporters: any[]
}
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


const Supporters: FunctionComponent<Props> = ({supporters}) => {
    const [showSupportersSlideOver, setShowSupportersSlideOver] = useState(false);

    const closeSupportersSlideover = () => {
        setShowSupportersSlideOver(false);
    };

    return (
        <div>
            <h3 className="pb-4 text-2xl font-bold">12 Supporters</h3>
            <div className="mt-6 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {
                        supporters.slice(0, 4).map((supporter, index) => (
                            <li className="py-4" key={index}>
                                <div className="flex items-center justify-between space-x-4">
                                    <div>
                                        <h3 className="font-medium text-lg">{supporter.customer}</h3>
                                        <p className="text-gray-600 text-sm">{supporter.time} - {supporter.location}</p>
                                    </div>
                                    <h3 className="font-medium text-lg">${supporter.total}</h3>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="mt-6">
                    <button onClick={() => setShowSupportersSlideOver(true)} className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        View All Supporters
                    </button>
                </div>
            </div>

            <Slideover title="Supporters" setOpen={closeSupportersSlideover} open={showSupportersSlideOver}>
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {
                        supporters.map((supporter, index) => (
                            <li className="py-4" key={index}>
                                <div className="flex items-center justify-between space-x-4">
                                    <div>
                                        <h3 className="font-medium text-lg">{supporter.customer}</h3>
                                        <p className="text-gray-600 text-sm">{supporter.time} - {supporter.location}</p>
                                    </div>
                                    <h3 className="font-medium text-lg">${supporter.total}</h3>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </Slideover>
        </div>
    );
};

export default Supporters;
