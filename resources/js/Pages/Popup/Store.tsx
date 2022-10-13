import {FunctionComponent} from "react";

const profile = {
    name: 'Matthew Hurt',
    fundraiser: 'John Marshall Boys Basketball',
    description: 'Hey! Its that time of year! Your favorite JM player is asking for your support! Our fundraiser this fall is Popus popcorn! Thanks for your support!',
    total: 1340,
    goal: 2000,
    timeLeft: '21 hours to go'
}

const products = [

]

const leaderboard = [

]

const supporters = [

]

const Store:FunctionComponent = () => {
    return (
        <>
            <main>
                {/* Nav */}
                <nav className="bg-white p-2">
                    <div className="container mx-auto flex items-center justify-between">
                        <a href="#">
                            <img src="https://cdn.shopify.com/s/files/1/0447/5925/3150/files/popus-inline-450_500x.png?v=1614311570" className="h-12 w-auto" />
                        </a>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
              <span className="text-sm font-medium leading-none text-white">TW</span>
            </span>
                    </div>
                </nav>
                <div className="container mx-auto">
                    {/* Profile Jumbotron */}
                    <div className="grid grid-cols-1 rounded-md bg-gray-50 md:grid-cols-3 md:gap-5 md:p-12">
                        <div className="md:order-2">
                            <img src="https://cdn1.sportngin.com/attachments/photo/ee0f-121282811/Matthew_Hurt_large.JPG" className="max-w-96 h-auto rounded-md" />
                        </div>
                        <div className="col-span-2 p-5 md:order-1 md:p-0">
                            <h3 className="text-gray-600 md:text-xl">{profile.fundraiser}</h3>
                            <h1 className="mb-3 text-3xl font-bold text-gray-900 md:mb-8 md:text-4xl lg:text-6xl">{profile.name} Pop-Up Store</h1>
                            <p className="mb-5 leading-relaxed text-gray-900 md:text-xl">{profile.description}</p>
                            <p className="mb-8 leading-relaxed text-gray-900 md:text-xl">50% of each purchase benefits this fundraiser.</p>
                            <div className="mb-5 w-full rounded-full bg-gray-200">
                                <div className="rounded-l-full bg-green-600 p-0.5 text-center text-xs font-medium leading-none text-green-100" style={{width: `${profile.total/profile.goal * 100}%`}}>${profile.total}</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-gray-700"><span className="text-2xl font-semibold text-gray-900">${profile.total}</span> sold of ${profile.goal} goal</h3>
                                <h3 className="text-gray-700">{profile.timeLeft}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 rounded-md md:grid-cols-3 md:gap-8 md:p-12">
                        {/* Product List */}
                        <div className="col-span-2 p-5 md:p-0">
                            <h3 className="border-b border-gray-100 pb-4 text-2xl font-bold">Shop Products</h3>
                            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                <div>
                                    <div className="relative">
                                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                            <img src="https://cdn.shopify.com/s/files/1/0447/5925/3150/files/Caramel_3x2_5f63233f-d504-4ea4-a474-8dbf613c2bbe_460x.png?v=1646922707" alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls." className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="relative mt-2">
                                            <h3 className="text-lg font-medium text-gray-900">Delicious Caramel</h3>
                                        </div>
                                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                                            <p className="relative text-lg font-semibold text-white">$12.99</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <a href="#" className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">Add to bag<span className="sr-only">, Zip Tote Basket</span></a>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                            <img src="https://cdn.shopify.com/s/files/1/0447/5925/3150/files/Caramel_3x2_5f63233f-d504-4ea4-a474-8dbf613c2bbe_460x.png?v=1646922707" alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls." className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="relative mt-2">
                                            <h3 className="text-lg font-medium text-gray-900">Delicious Caramel</h3>
                                        </div>
                                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                                            <p className="relative text-lg font-semibold text-white">$12.99</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <a href="#" className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">Add to bag<span className="sr-only">, Zip Tote Basket</span></a>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                            <img src="https://cdn.shopify.com/s/files/1/0447/5925/3150/files/Caramel_3x2_5f63233f-d504-4ea4-a474-8dbf613c2bbe_460x.png?v=1646922707" alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls." className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="relative mt-2">
                                            <h3 className="text-lg font-medium text-gray-900">Delicious Caramel</h3>
                                        </div>
                                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                                            <p className="relative text-lg font-semibold text-white">$12.99</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <a href="#" className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">Add to bag<span className="sr-only">, Zip Tote Basket</span></a>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                            <img src="https://cdn.shopify.com/s/files/1/0447/5925/3150/files/Caramel_3x2_5f63233f-d504-4ea4-a474-8dbf613c2bbe_460x.png?v=1646922707" alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls." className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="relative mt-2">
                                            <h3 className="text-lg font-medium text-gray-900">Delicious Caramel</h3>
                                        </div>
                                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                                            <p className="relative text-lg font-semibold text-white">$12.99</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <a href="#" className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">Add to bag<span className="sr-only">, Zip Tote Basket</span></a>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                            <img src="https://cdn.shopify.com/s/files/1/0447/5925/3150/files/Caramel_3x2_5f63233f-d504-4ea4-a474-8dbf613c2bbe_460x.png?v=1646922707" alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls." className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="relative mt-2">
                                            <h3 className="text-lg font-medium text-gray-900">Delicious Caramel</h3>
                                        </div>
                                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                                            <p className="relative text-lg font-semibold text-white">$12.99</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <a href="#" className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">Add to bag<span className="sr-only">, Zip Tote Basket</span></a>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                            <img src="https://cdn.shopify.com/s/files/1/0447/5925/3150/files/Caramel_3x2_5f63233f-d504-4ea4-a474-8dbf613c2bbe_460x.png?v=1646922707" alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls." className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="relative mt-2">
                                            <h3 className="text-lg font-medium text-gray-900">Delicious Caramel</h3>
                                        </div>
                                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                                            <p className="relative text-lg font-semibold text-white">$12.99</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <a href="#" className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">Add to bag<span className="sr-only">, Zip Tote Basket</span></a>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                            <img src="https://cdn.shopify.com/s/files/1/0447/5925/3150/files/Caramel_3x2_5f63233f-d504-4ea4-a474-8dbf613c2bbe_460x.png?v=1646922707" alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls." className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="relative mt-2">
                                            <h3 className="text-lg font-medium text-gray-900">Delicious Caramel</h3>
                                        </div>
                                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                                            <p className="relative text-lg font-semibold text-white">$12.99</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <a href="#" className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">Add to bag<span className="sr-only">, Zip Tote Basket</span></a>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                            <img src="https://cdn.shopify.com/s/files/1/0447/5925/3150/files/Caramel_3x2_5f63233f-d504-4ea4-a474-8dbf613c2bbe_460x.png?v=1646922707" alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls." className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="relative mt-2">
                                            <h3 className="text-lg font-medium text-gray-900">Delicious Caramel</h3>
                                        </div>
                                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                                            <p className="relative text-lg font-semibold text-white">$12.99</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <a href="#" className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">Add to bag<span className="sr-only">, Zip Tote Basket</span></a>
                                    </div>
                                </div>
                                {/* More products... */}
                            </div>
                        </div>
                        <div className="col-span-1 p-5 md:p-0">
                            {/* Leaderboard List + Leaderboard Slideover */}
                            <div className="mb-12">
                                <h3 className=" pb-4 text-2xl font-bold">Fundraiser Leaderboard</h3>
                                <div className="mt-6 flow-root">
                                    <ul role="list" className="-my-5 divide-y divide-gray-200">
                                        <li className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <h3>1</h3>
                                                <div className="flex-shrink-0">
                                                    <img className="h-8 w-8 rounded-full" src="https://cdn1.sportngin.com/attachments/photo/ee0f-121282811/Matthew_Hurt_large.JPG" alt="" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-lg font-medium text-gray-900">Matthew Hurt</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">$1,340</h3>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <h3>2</h3>
                                                <div className="flex-shrink-0">
                                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900">Leonard Krasner</p>
                                                    <p className="truncate text-sm text-gray-500">@leonardkrasner</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">$1,278</h3>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <h3>3</h3>
                                                <div className="flex-shrink-0">
                                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900">Leonard Krasner</p>
                                                    <p className="truncate text-sm text-gray-500">@leonardkrasner</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">$1,223</h3>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <h3>4</h3>
                                                <div className="flex-shrink-0">
                                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900">Leonard Krasner</p>
                                                    <p className="truncate text-sm text-gray-500">@leonardkrasner</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">$1,112</h3>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <h3>5</h3>
                                                <div className="flex-shrink-0">
                                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900">Leonard Krasner</p>
                                                    <p className="truncate text-sm text-gray-500">@leonardkrasner</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">$1,001</h3>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <a href="#" className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">View Full Leaderboard</a>
                                </div>
                            </div>
                            {/* Supporters List + Support Slideover */}
                            <div>
                                <h3 className="pb-4 text-2xl font-bold">12 Supporters</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Store;
