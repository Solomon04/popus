import {FunctionComponent} from "react";
import {CurrencyDollarIcon} from "@heroicons/react/20/solid";
import {CalendarIcon} from "@heroicons/react/24/solid";
import {Link} from "@inertiajs/inertia-react";

type Props = {
    store: any
}

const PopupStoreCard: FunctionComponent<Props> = ({store}) => {
    return (
        <Link href="/store" className="relative block overflow-hidden rounded-xl bg-[url(https://cdn1.sportngin.com/attachments/photo/ee0f-121282811/Matthew_Hurt_large.JPG)] bg-cover bg-center bg-no-repeat">
        <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
            <CalendarIcon className="mr-1.5 h-4 w-4 text-yellow-300"/>
            {store.timeLeft}
        </span>
            <div className="relative bg-black bg-opacity-40 p-8 pt-40 text-white">
                <h3 className="text-2xl font-bold">{store.name}</h3>
                <p className="text-sm">Raised <strong>${store.total}</strong> of <strong>${store.goal}</strong></p>
            </div>
        </Link>
    )
}

export default PopupStoreCard;
