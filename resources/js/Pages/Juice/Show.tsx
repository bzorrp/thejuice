import AppLayout from "@/Layouts/AppLayout";
import { Head, router, usePage } from "@inertiajs/react";
import type { Juice } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import DangerButton from "@/Components/DangerButton";

export default function Show({ juice }: { juice: Juice }) {
    const user = usePage().props.auth.user;
    const cart = usePage().props.cart;

    const juiceInCart = cart?.items?.find((item) => item.juice.id === juice.id);
    const juiceInFavorites = user?.favorites?.find(
        (favorite) => favorite.id === juice.id,
    );

    console.log(juiceInCart, juiceInFavorites);

    const [updatingCart, setUpdatingCart] = useState(false);
    const [updatingFavorites, setUpdatingFavorites] = useState(false);

    function updateCart(quantity: number) {
        if (updatingCart) {
            return;
        }

        setUpdatingCart(true);

        if (quantity === 0) {
            return router.post(
                route("cart.remove", { juice: juice.id }),
                {},
                { onFinish: () => setUpdatingCart(false) },
            );
        }

        router.post(
            route("cart.add", { juice: juice.id }),
            { quantity },
            {
                onError: (error) => console.log(error),
                onFinish: () => setUpdatingCart(false),
            },
        );
    }

    function addToFavorites() {
        if (updatingFavorites) {
            return;
        }

        setUpdatingFavorites(true);

        console.log("adding ", juice.name, "to favorites");
        return router.post(
            route("favorite.add", { juice: juice.id }),
            {},
            { onFinish: () => setUpdatingFavorites(false) },
        );
    }

    function removeFromFavorites() {
        if (updatingFavorites) {
            return;
        }

        setUpdatingFavorites(true);

        return router.post(
            route("favorite.remove", { juice: juice.id }),
            {},
            { onFinish: () => setUpdatingFavorites(false) },
        );
    }

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {juice.name}
                </h2>
            }
        >
            <Head title={`Juice - ${juice.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 flex gap-4">
                        <div className="w-64">
                            <img
                                src="/juice-image.jpg"
                                alt="avatar"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl text-gray-900 dark:text-gray-100">
                                {juice.name}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                NGN {juice.price.toLocaleString()}
                            </p>
                            <div className="py-8 flex flex-col">
                                <h1 className="font-bold text-gray-900 dark:text-gray-100">
                                    Nutritional Information
                                </h1>
                                <div className="text-sm text-gray-500 dark:text-gray-300">
                                    <ul className="list-disc px-4 font-semibold">
                                        <li>
                                            Calories (per 1 cup, 240ml): 110
                                            kcal
                                        </li>
                                        <li>Carbohydrates: 26g</li>
                                        <li>Sugars: 21g</li>
                                        <li>Protein: 1.5g</li>
                                        <li>Fat: 0.5g</li>
                                        <li>Fiber: 0.5g</li>
                                        <li>
                                            Vitamins/Minerals: High in Vitamin C
                                            (124% of daily value) Contains small
                                            amounts of folate, potassium, and
                                            thiamine.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {juiceInCart ? (
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        defaultValue={juiceInCart.quantity}
                                        readOnly={updatingCart}
                                        onChange={(event) =>
                                            updateCart(
                                                event.target.valueAsNumber,
                                            )
                                        }
                                    />
                                ) : (
                                    cart && (
                                        <PrimaryButton
                                            onClick={() => updateCart(1)}
                                        >
                                            Add to cart
                                        </PrimaryButton>
                                    )
                                )}

                                {juiceInFavorites ? (
                                    <DangerButton onClick={removeFromFavorites}>
                                        Remove from favorites
                                    </DangerButton>
                                ) : (
                                    cart && (
                                        <PrimaryButton onClick={addToFavorites}>
                                            Save To Favorites
                                        </PrimaryButton>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
