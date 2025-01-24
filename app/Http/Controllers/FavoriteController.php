<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Juice;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class FavoriteController extends Controller
{
    /**
     * @return Response
     */
    public function show(Request $request): Response
    {
        $favorites = $request->user()->favorites()->get();
        return Inertia::render("Favorites", [
            "favorites" => $favorites,
        ]);
    }

    /**
     * @return RedirectResponse
     */
    public function addToFavorites(
        Request $request,
        Juice $juice
    ): RedirectResponse {
        Log::info("hello");
        /* @var User $user */
        $user = $request->user();

        $user->favorites()->attach($juice);

        return back();
    }

    /**
     * @return RedirectResponse
     */
    public function removeFromFavorites(
        Request $request,
        Juice $juice
    ): RedirectResponse {
        /* @var User $user */
        $user = $request->user();

        $user->favorites()->detach($juice);

        return back();
    }
}
