import {FunctionComponent} from "react";
import Navbar from "@/Components/Navbar";
import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const positions = [
    {
        id: 1,
        title: 'John Marshall Basketball',
        department: 'Engineering',
        closeDate: '2020-01-07',
        closeDateFull: 'January 7, 2020',
        applicants: [
            {
                name: 'Dries Vincent',
                email: 'dries.vincent@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Lindsay Walton',
                email: 'lindsay.walton@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Courtney Henry',
                email: 'courtney.henry@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Tom Cook',
                email: 'tom.cook@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        ],
    },
    {
        id: 2,
        title: 'MN Lace Up Basketball',
        department: 'Engineering',
        closeDate: '2020-01-07',
        closeDateFull: 'January 7, 2020',
        applicants: [
            {
                name: 'Whitney Francis',
                email: 'whitney.francis@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Leonard Krasner',
                email: 'leonard.krasner@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Floyd Miles',
                email: 'floy.dmiles@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        ],
    },
    {
        id: 3,
        title: 'User Interface Designer',
        department: 'Design',
        closeDate: '2020-01-14',
        closeDateFull: 'January 14, 2020',
        applicants: [
            {
                name: 'Emily Selman',
                email: 'emily.selman@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Kristin Watson',
                email: 'kristin.watson@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Emma Dorsey',
                email: 'emma.dorsey@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        ],
    },
]

const Dashboard: FunctionComponent = () => {
    return (
        <>
            <main className="bg-gray-50 min-h-screen">
                {/* Nav */}
                <Navbar/>
                <div className="max-w-6xl mx-auto py-8">
                    <div className="py-16 md:flex md:items-start md:justify-between">
                        <div className="min-w-0 flex-1">
                            <h2 className="text-4xl font-extrabold leading-10">
                                Hi, D'Angelo!
                            </h2>
                        </div>
                        <div className="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
                            <button
                                type="button"
                                className="ml-3 inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-lg font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                            >
                                Organize Event
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {positions.map((position) => (
                                <li key={position.id}>
                                    <a href="#" className="block hover:bg-gray-50">
                                        <div className="flex items-center px-4 py-4 sm:px-6">
                                            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                                <div className="truncate">
                                                    <div className="flex text-sm">
                                                        <p className="truncate font-medium text-indigo-600">{position.title}</p>
                                                        <p className="ml-1 flex-shrink-0 font-normal text-gray-500">in {position.department}</p>
                                                    </div>
                                                    <div className="mt-2 flex">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                            <p>
                                                                Ending on <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                                                    <div className="flex -space-x-1 overflow-hidden">
                                                        {position.applicants.map((applicant) => (
                                                            <img
                                                                key={applicant.email}
                                                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                                                src={applicant.imageUrl}
                                                                alt={applicant.name}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-5 flex-shrink-0">
                                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;
