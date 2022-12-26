<?php

namespace App\Enums;

enum OrderStatus
{
    case PENDING;
    case PAID;
    case CONFIRMED;
    case REFUNDED;
    case SHIPPED;
    case DELIVERED;
}
