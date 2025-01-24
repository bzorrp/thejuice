<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\User;
use Closure;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            "address" => ["string", "required"],
            "phonenumber" => [
                "string",
                "required",
                function (string $attribute, mixed $value, Closure $fail) {
                    $isValidNumber = preg_match(
                        '/^(\+234|234|0)(7[0-9]|8[0-9]|9[0-9])[0-9]{8}$/',
                        $value
                    );
                    Log::info($value);
                    Log::info($isValidNumber);
                    if (!$isValidNumber) {
                        $fail(
                            "{$attribute} is not a valid nigerian phone number"
                        );
                    }
                },
            ],
        ]);

        /* @var User $user */
        $user = $request->user();

        /* @var Cart|null $cart  */
        $cart = $user->cart()->sole();

        /* @var Collection<int, CartItem> $cart_items */
        $cart_items = $cart->items()->with("juice")->get();

        $cartValue = $cart_items
            ->map(function ($item) {
                return $item->quantity * $item->juice->price;
            })
            ->sum();

        Log::info($cartValue);

        if ($user->wallet_balance < $cartValue) {
            return back()->withErrors([
                "error" => "Insufficient wallet balance",
            ]);
        }

        $order_items = collect();
        foreach ($cart_items as $item) {
            Log::info($item->juice->id);
            $order_items->push([
                "juice_id" => $item->juice->id,
                "quantity" => $item->quantity,
                "price" => $item->juice->price,
                "total" => $item->quantity * $item->juice->price,
            ]);
        }

        DB::transaction(function () use (
            $user,
            $data,
            $cartValue,
            $order_items,
            $cart
        ) {
            Log::info($order_items->toArray());

            $order = $user->orders()->create([
                "address" => $data["address"],
                "phonenumber" => $data["phonenumber"],
                "subtotal" => $cartValue,
            ]);

            $order->items()->createMany($order_items->toArray());
            Log::info("created order");

            $cart->items()->delete();
            Log::info("deleted cart items");

            $user->wallet_balance -= $cartValue;
            $user->save();
        });

        Log::info("redirecting home");
        return response()->redirectToRoute("home");
    }
}
