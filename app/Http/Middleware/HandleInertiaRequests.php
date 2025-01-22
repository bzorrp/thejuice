<?php

namespace App\Http\Middleware;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'cart' => function () use ($request) {
                /* @var User $user */
                $user = $request->user();
                if ($user === null) {
                    return null;
                }

                $cart = $user->cart()->with('items.juice')->first();
                if ($cart === null) {
                    $cart = Cart::query()->create();
                }

                return $cart;
            }
        ];
    }
}
