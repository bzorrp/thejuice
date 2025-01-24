<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        // Juice types
        $juice_types = [
            "Orange Juice",
            "Apple Juice",
            "Mango Juice",
            "Carrot Juice",
            "Watermelon Juice",
            "Pineapple Juice",
            "Grape Juice",
            "Cranberry Juice",
            "Tomato Juice",
            "Pomegranate Juice",
            "Guava Juice",
            "Lychee Juice",
            "Coconut Water",
            "Blackberry Juice",
            "Blackberry Juice",
            "Kiwi Juice",
            "Cucumber-Mint Juice",
            "Dragon Fruit Juice",
            "Fig Juice",
            "Starfruit Juice",
            "Pear-Ginger Juice",
            "Lemon-mint Juice",
        ];

        $juices = collect([]);
        foreach ($juice_types as $juice_type) {
            $juices->push([
                "name" => $juice_type,
                "price" => fake()->unique()->numberBetween(100, 500),
                "description" => fake()->paragraph(20),
            ]);
        }

        DB::table("juices")->insertOrIgnore($juices->toArray());
    }
}
