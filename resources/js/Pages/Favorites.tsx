import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import AppLayout from "@/Layouts/AppLayout";
import type { Juice, PageProps } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({ favorites }: PageProps<{ favorites: Juice[] }>) {
    const user = usePage().props.auth.user;
    console.log(user);

    const [updatingFavorites, setUpdatingFavorites] = useState(false);

    function removeFromFavorites(juiceId: number) {
        if (updatingFavorites) {
            return;
        }

        setUpdatingFavorites(true);

        return router.post(
            route("favorite.remove", { juice: juiceId }),
            {},
            { onFinish: () => setUpdatingFavorites(false) },
        );
    }

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Saved Products
                </h2>
            }
        >
            <Head title="Favorites" />

            <div className="py-12 px-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {favorites && favorites.length > 0 ? (
                    favorites.map((favorite) => (
                        <div
                            className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 flex gap-8"
                            key={favorite.id}
                        >
                            <div className="w-24">
                            <img
    src={`/juices/${favorite.image}`}
    alt={favorite.name}
    className="w-full object-cover rounded-lg"
/>

                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="text-xl font-bold text-gray-500 dark:text-gray-300">
                                    {favorite.name}
                                </p>
                                <div className="flex gap-4">
                                    <DangerButton
                                        onClick={() =>
                                            removeFromFavorites(favorite.id)
                                        }
                                    >
                                        Remove from Favorites
                                    </DangerButton>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center w-full">
                        <p className="font-semibold text-gray-500 dark:text-gray-300">
                            Nothing to see here
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
