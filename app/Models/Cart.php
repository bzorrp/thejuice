<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Cart extends Model
{
    /**
     * @return HasMany<CartItem,Cart>
     */
    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * @return BelongsTo<User,Cart>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
