import AppLayout from "@/Layouts/AppLayout";
import { Head, router, usePage } from "@inertiajs/react";
import type { Juice } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import DangerButton from "@/Components/DangerButton";

const nutritionFacts: Record<string, any> = {
    "Orange Juice": { calories: 112, carbs: 26, sugars: 21, protein: 2, fat: 0.5, fiber: 0.5, vitamins: "High in Vitamin C, folate, potassium" },
    "Apple Juice": { calories: 114, carbs: 28, sugars: 24, protein: 0.5, fat: 0.3, fiber: 0.5, vitamins: "Contains Vitamin C, potassium" },
    "Mango Juice": { calories: 110, carbs: 26, sugars: 21, protein: 1.5, fat: 0.5, fiber: 0.5, vitamins: "High in Vitamin C, small amounts of folate, potassium, thiamine" },
    "Carrot Juice": { calories: 94, carbs: 22, sugars: 19, protein: 2, fat: 0.3, fiber: 2.2, vitamins: "High in Vitamin A, beta-carotene, potassium" },
    "Watermelon Juice": { calories: 80, carbs: 21, sugars: 20, protein: 1, fat: 0.2, fiber: 0.5, vitamins: "High in Vitamin C, lycopene" },
    "Pineapple Juice": { calories: 132, carbs: 32, sugars: 25, protein: 1, fat: 0.3, fiber: 1, vitamins: "High in Vitamin C, manganese" },
    "Grape Juice": { calories: 150, carbs: 38, sugars: 36, protein: 1, fat: 0.2, fiber: 0.3, vitamins: "Contains Vitamin C, potassium, resveratrol" },
    "Cranberry Juice": { calories: 116, carbs: 31, sugars: 12, protein: 0.3, fat: 0.1, fiber: 0.3, vitamins: "High in Vitamin C, antioxidants" },
    "Tomato Juice": { calories: 40, carbs: 9, sugars: 6, protein: 2, fat: 0.2, fiber: 1, vitamins: "High in Vitamin C, lycopene" },
    "Pomegranate Juice": { calories: 134, carbs: 33, sugars: 31, protein: 0.4, fat: 0.3, fiber: 0.2, vitamins: "High in Vitamin C, antioxidants" },
    "Guava Juice": { calories: 112, carbs: 28, sugars: 18, protein: 2.4, fat: 0.7, fiber: 3, vitamins: "Very high in Vitamin C, folate, potassium" },
    "Lychee Juice": { calories: 125, carbs: 31, sugars: 29, protein: 0.8, fat: 0.3, fiber: 0.4, vitamins: "High in Vitamin C, antioxidants" },
    "Blackberry Juice": { calories: 90, carbs: 25, sugars: 12, protein: 2, fat: 0.5, fiber: 8, vitamins: "High in Vitamin C, manganese" },
    "Kiwi Juice": { calories: 110, carbs: 27, sugars: 20, protein: 1.2, fat: 0.4, fiber: 5, vitamins: "High in Vitamin C, Vitamin K" },
    "Cucumber-Mint Juice": { calories: 30, carbs: 7, sugars: 4, protein: 1, fat: 0.1, fiber: 0.8, vitamins: "Hydrating, contains Vitamin K and antioxidants" },
    "Dragon Fruit Juice": { calories: 102, carbs: 25, sugars: 18, protein: 2, fat: 0.5, fiber: 3, vitamins: "High in Vitamin C, magnesium" },
    "Fig Juice": { calories: 140, carbs: 36, sugars: 32, protein: 1, fat: 0.3, fiber: 2.5, vitamins: "Rich in fiber, iron, and antioxidants" },
    "Starfruit Juice": { calories: 60, carbs: 14, sugars: 10, protein: 1, fat: 0.3, fiber: 3, vitamins: "High in Vitamin C, fiber" },
    "Pear-Ginger Juice": { calories: 120, carbs: 30, sugars: 25, protein: 1, fat: 0.3, fiber: 2, vitamins: "Contains Vitamin C, fiber, antioxidants from ginger" },
    "Lemon-mint Juice": { calories: 35, carbs: 9, sugars: 5, protein: 0.4, fat: 0.1, fiber: 1, vitamins: "High in Vitamin C, refreshing with antioxidants" },
    "Coconut Water": { calories: 45, carbs: 10, sugars: 7, protein: 0.5, fat: 0, fiber: 0, vitamins: "High in potassium, hydrating electrolytes" }
};


export default function Show({ juice }: { juice: Juice }) {
    const user = usePage().props.auth.user;
    const cart = usePage().props.cart;

    const nutrition = nutritionFacts[juice.name.trim()] || {
        calories: "N/A",
        carbs: "N/A",
        sugars: "N/A",
        protein: "N/A",
        fat: "N/A",
        fiber: "N/A",
        vitamins: "N/A",
    };
    

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
    src={`/juices/${juice.image}`}
    alt={juice.name}
    className="w-full object-cover rounded-lg"
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
                                        <li>Calories: {nutrition.calories} kcal</li>
                                        <li>Carbohydrates: {nutrition.carbs}g</li>
                                        <li>Sugars: {nutrition.sugars}g</li>
                                        <li>Protein: {nutrition.protein}g</li>
                                        <li>Fat: {nutrition.fat}g</li>
                                        <li>Fiber: {nutrition.fiber}g</li>
                                        <li>Vitamins/Minerals: {nutrition.vitamins}</li>
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
