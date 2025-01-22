import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Show() {
    const user = usePage().props.auth.user;
    const { items } = usePage().props.cart;

    const [updatingCart, setUpdatingCart] = useState(false)

    function updateCart(juiceId: number, quantity: number) {
        if (updatingCart) {
            return;
        }

        setUpdatingCart(true)

        if (quantity === 0) {
            return router.post(
                route('cart.remove', { juice: juiceId }),
                {},
                { onFinish: () => setUpdatingCart(false) }
            )
        }

        router.post(
            route('cart.add', { juice: juiceId }),
            { quantity },
            {
                onError: (error) => console.log(error),
                onFinish: () => setUpdatingCart(false),
            }
        )
    }

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Cart
                </h2>
            }
        >
            <Head title="Cart"/>

            <div>
                {
                    items?.map((item) =>
                        <div className="py-4">
                            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                                <div
                                    className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 flex gap-4">
                                    <div className="w-24">
                                        <img
                                            src="/juice-image.jpg"
                                            alt="avatar"
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <p className="text-xl font-bold text-gray-500 dark:text-gray-300">{item.juice.name}</p>
                                        <div className="flex gap-4">
                                            <input type="number" min={0} max={100}
                                                   defaultValue={item.quantity}
                                                   readOnly={updatingCart}
                                                   onChange={(event) => updateCart(item.juice.id, event.target.valueAsNumber)}/>
                                            <PrimaryButton>Save To Favorites</PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </AppLayout>
    );
}
