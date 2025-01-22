import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Juice } from "@/types";

export default function Dashboard({ juices }: { juices: Juice[] }) {
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Shop
                </h2>
            }
        >
            <Head title="Shop"/>

            <div className="py-12">
                <ul className="grid grid-cols-3 gap-4">
                    {juices.map((juice) => <li className="p-4" key={juice.id}>
                        <Link href={route('juice.show', { juice: juice.id })}>
                            <div
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                            >
                                <div
                                    className="p-6 text-gray-900 dark:text-gray-100 flex flex-col justify-center items-center gap-4"
                                >
                                    <img
                                        src="/juice-image.jpg"
                                        alt={juice.name}
                                        className="w-48"
                                    />
                                    <p>
                                        {juice.name}
                                    </p>
                                    <p>NGN {juice.price.toLocaleString()}</p>
                                </div>
                            </div>
                        </Link>
                    </li>)}
                </ul>
            </div>
        </AppLayout>
    );
}
