import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Edit() {
    const user = usePage().props.auth.user;
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Profile
                </h2>
            }
        >
            <Head title="Profile"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 flex flex-col justify-items-center items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden gap-4">
                            <img
                                src="/avatar.jpg"
                                alt="avatar"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-gray-900 dark:text-gray-100">{user.username}</p>
                            <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
                        </div>
                        <div className="p-6 flex flex-col items-center">
                            <p className="text-gray-900 dark:text-gray-100">Total Orders: 0</p>
                            <p className="text-gray-900 dark:text-gray-100">Wallet Balance:
                                NGN{(parseFloat(user.wallet_balance.toString())).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h1 className='bold text-2xl text-gray-900 dark:text-gray-100'>Saved Items</h1>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
