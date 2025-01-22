<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Juice;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Cart/Show');
    }

    public function addToCart(Request $request, Juice $juice): RedirectResponse
    {
        $data = $request->validate([
            'quantity' => ['required', 'numeric', 'min:1'],
        ]);

        /* @var User $user */
        $user = $request->user();

        /* @var Cart $cart */
        $cart = $user->cart()->with('items')->first();
        if ($cart === null) {
            Log::info('creating cart for user ' . $user->email);
            $cart = $user->cart()->create();
        }

        /* @var CartItem $item */
        $item = $cart->items->where('juice_id', '=', $juice->id)->first();
        if ($item === null) {
            Log::info('no juice with id ' . $juice->id . ' in cart');
            $item = $cart->items()->create([
                'juice_id' => $juice->id,
                'quantity' => $data['quantity'],
            ]);
        }

        $item->quantity = $data['quantity'];
        $item->save();

        return back();
    }

    public function removeFromCart(Request $request, Juice $juice)
    {
        /* @var User $user */
        $user = $request->user();

        /* @var Cart $cart */
        $cart = $user->cart()->with('items')->first();
        if ($cart === null) {
            $user->cart()->create();
            return back()->withErrors(['cart' => 'nothing in cart']);
        }

        /* @var Collection<CartItem> $items */
        $items = $cart->items;

        /* @var CartItem $item */
        $item = $items->where('juice_id', '=', $juice->id)->first();
        if ($item === null) {
            return back()->withErrors(['cart' => 'item not in cart']);
        }

        $item->delete();

        return back();
    }
}
