<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = [
        "order_id",
        "juice_id",
        "quantity",
        "price",
        "total",
    ];

    /**
     * @return BelongsTo<Order,OrderItem>
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * @return BelongsTo<Juice,OrderItem>
     */
    public function juice(): BelongsTo
    {
        return $this->belongsTo(Juice::class);
    }
}
