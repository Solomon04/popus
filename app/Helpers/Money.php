<?php

namespace App\Helpers;

class Money
{
    public static function centsToDollars(int $cents): float
    {
        return round($cents / 100, 2);
    }

    public static function dollarsToCents(float $dollars): int
    {
        return (int) round($dollars * 100);
    }
}
