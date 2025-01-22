<?php

namespace App\Http\Controllers;

use App\Models\Juice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JuiceController extends Controller
{
    public function show(Juice $juice){
        return Inertia::render('Juice/Show', [
            'juice' => $juice
        ]);
    }
}
