import { Head, router, useForm, usePage } from "@inertiajs/react";
import { type FormEvent, useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import type { Juice } from "@/types";
import DangerButton from "@/Components/DangerButton";

export default function Show() {
    const user = usePage().props.auth.user;
    const cart = usePage().props.cart;

    const items = cart?.items;

    function juiceInFavorites(juiceId: number) {
        return user?.favorites?.find((fav) => fav.id === juiceId);
    }

    const [updatingCart, setUpdatingCart] = useState(false);
    const [updatingFavorites, setUpdatingFavorites] = useState(false);
    const [error, setBalanceError] = useState("");

    const form = useForm({
        address: "",
        phonenumber: "",
    });

    function updateCart(juiceId: number, quantity: number) {
        if (updatingCart) {
            return;
        }

        setUpdatingCart(true);

        if (quantity === 0) {
            return router.post(
                route("cart.remove", { juice: juiceId }),
                {},
                { onFinish: () => setUpdatingCart(false) },
            );
        }

        router.post(
            route("cart.add", { juice: juiceId }),
            { quantity },
            {
                onError: (error) => console.log(error),
                onFinish: () => setUpdatingCart(false),
            },
        );
    }

    function submit(e: FormEvent<Element>) {
        e.preventDefault();

        console.log(form.data);
        form.post(route("checkout"), {
            onError: (errors) => {
                setBalanceError(errors.error);
                console.log(errors);
            },
        });
    }

    function addToFavorites(favId: number) {
        if (updatingFavorites) {
            return;
        }

        setUpdatingFavorites(true);

        return router.post(
            route("favorite.add", { juice: favId }),
            {},
            { onFinish: () => setUpdatingFavorites(false) },
        );
    }

    function removeFromFavorites(favId: number) {
        if (updatingFavorites) {
            return;
        }

        setUpdatingFavorites(true);

        return router.post(
            route("favorite.remove", { juice: favId }),
            {},
            { onFinish: () => setUpdatingFavorites(false) },
        );
    }

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Cart
                </h2>
            }
        >
            <Head title="Cart" />

            {items && items.length > 0 ? (
                <div className="flex flex-col md:flex-row w-full items-start justify-between p-8">
                    <div className="min-w-1/2 w-full">
                        {items?.map((item) => (
                            <div className="py-4" key={item.id}>
                                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 flex gap-4">
                                        <div className="w-24">
                                            <img
                                                src={item.juice.image ? `/juices/${item.juice.image}` : "/default-juice.jpg"}
                                                alt={item.juice.name}
                                                className="w-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <p className="text-xl font-bold text-gray-500 dark:text-gray-300">
                                                {item.juice.name}
                                            </p>
                                            <div className="flex flex-wrap gap-4">
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={100}
                                                    defaultValue={item.quantity}
                                                    readOnly={updatingCart}
                                                    onChange={(event) =>
                                                        updateCart(
                                                            item.juice.id,
                                                            event.target.valueAsNumber
                                                        )
                                                    }
                                                    className="border px-2 py-1 rounded"
                                                />
                                                <DangerButton
                                                    onClick={() =>
                                                        updateCart(item.juice.id, 0)
                                                    }
                                                >
                                                    Remove from Cart
                                                </DangerButton>
                                                {juiceInFavorites(item.juice.id) ? (
                                                    <DangerButton
                                                        onClick={() =>
                                                            removeFromFavorites(item.juice.id)
                                                        }
                                                    >
                                                        Remove from Favorites
                                                    </DangerButton>
                                                ) : (
                                                    <PrimaryButton
                                                        onClick={() =>
                                                            addToFavorites(item.juice.id)
                                                        }
                                                    >
                                                        Save To Favorites
                                                    </PrimaryButton>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="py-4">
                        <div className="mx-auto w-full md:min-w-[500px] min-h-full spac-y-6 sm:px-6 lg:px-8">
                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 flex flex-col gap-4 justify-center">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-500 dark:text-gray-300 text-left">
                                        SubTotal:&nbsp; NGN
                                        {items
                                            .map(
                                                (item) =>
                                                    item.juice.price * item.quantity
                                            )
                                            .reduce((a, b) => a + b)
                                            .toLocaleString()}
                                    </p>
                                    <p className="font-semibold text-gray-500 dark:text-gray-300 text-left">
                                        Wallet:&nbsp; NGN
                                        {user?.wallet_balance}
                                    </p>
                                </div>
                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-6 w-full"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="address"
                                            value="Address"
                                        />
                                        <TextInput
                                            id="address"
                                            className="mt-1 block w-full"
                                            value={form.data.address}
                                            onChange={(e) =>
                                                form.setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="address"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={form.errors.address}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="phonenumber"
                                            value="Phonenumber"
                                        />
                                        <TextInput
                                            id="phonenumber"
                                            className="mt-1 block w-full"
                                            value={form.data.phonenumber}
                                            onChange={(e) =>
                                                form.setData(
                                                    "phonenumber",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="phonenumber"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={form.errors.phonenumber}
                                        />
                                    </div>
                                    <PrimaryButton disabled={form.processing}>
                                        Checkout
                                    </PrimaryButton>
                                    <p className="font-semibold text-red-600 text-center">
                                        {error ? error : ""}
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
<div className="w-full flex flex-col justify-center items-center py-12">
    <img
        src="https://media.giphy.com/media/jWexOOlYe241y/giphy.gif"
        alt="Sad cat"
        className="w-48 h-48 object-cover rounded-lg"
    />
    <p className="font-bold text-gray-500 dark:text-gray-300 text-lg mt-4">
        Oh no! Your cart is empty... even the cat is sad 😿
    </p>

</div>

            )}
        </AppLayout>
    );
}
