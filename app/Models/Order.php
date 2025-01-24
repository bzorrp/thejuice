<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = ["user_id", "address", "phonenumber", "subtotal"];

    /**
     * @return HasMany<OrderItem,Order>
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
