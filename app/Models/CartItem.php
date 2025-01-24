<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    protected $fillable = ["juice_id", "quantity"];

    /**
     * @return BelongsTo<Cart,CartItem>
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * @return BelongsTo<Juice,CartItem>
     */
    public function juice(): BelongsTo
    {
        return $this->belongsTo(Juice::class);
    }
}
