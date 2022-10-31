import {FunctionComponent, useState} from "react";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";
import Slideover from "@/Components/Slideover";
import {Link} from "@inertiajs/inertia-react";

type Props = {
    leaderboard: any[]
}

const Leaderboard: FunctionComponent<Props> = ({leaderboard}) => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const closeLeaderboard = () => {
        setShowLeaderboard(false)
    }

    return (
        <div className="mb-12">
            <h3 className=" pb-4 text-2xl font-bold">Fundraiser Leaderboard</h3>
            <div className="mt-6 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {
                        leaderboard.slice(0, 5).map((member, place) => (
                            <li className="py-4" key={place}>
                                <div className="flex items-center space-x-4">
                                    <h3>{place + 1}</h3>
                                    <div className="flex-shrink-0">
                                        <img className="h-8 w-8 rounded-full" src={member.image} alt={member.name} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-lg font-medium text-gray-900">{member.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">${member.total}</h3>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="mt-6">
                <button onClick={() => setShowLeaderboard(true)} className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    View Full Leaderboard
                </button>
            </div>

            <Slideover title="Leaderboard" open={showLeaderboard} setOpen={closeLeaderboard}>
                <ul role="list" className="-my-5 space-y-2">
                    {
                        leaderboard.map((member, place) => (
                            <li className="py-4 bg-gray-50 rounded p-2" key={place}>
                                <Link href={`/store/${member.name}`} className="flex items-center space-x-4">
                                    <h3>{place + 1}</h3>
                                    <div className="flex-shrink-0">
                                        <img className="h-16 w-16 rounded-full" src={member.image} alt={member.name} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-xl font-semibold text-gray-900">{member.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">${member.total}</h3>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </Slideover>
        </div>
    );
};

export default Leaderboard;
