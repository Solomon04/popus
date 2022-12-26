<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Shippo API Key
    |--------------------------------------------------------------------------
    |
    | The Shippo API key for being able to make requests to the API.
    |
    */
    'key' => env('SHIPPO_API_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Shippo Mass Unit
    |--------------------------------------------------------------------------
    |
    | The default mass units for the Shippo API are set to pounds (lb).
    |
    */
    'mass_unit' => 'lb',

    /*
    |--------------------------------------------------------------------------
    | Shippo Distance Unit
    |--------------------------------------------------------------------------
    |
    | The default distance units for the Shippo API are set to inches (in).
    |
    */
    'distance_unit' => 'in',

    /*
    |--------------------------------------------------------------------------
    | Shippo Shipping Address
    |--------------------------------------------------------------------------
    |
    | The default ship from address for Orange Rose
    |
    */
    'address_from' => [
        'name' => 'Popus',
        'company' => 'Popus Gourmet Popcorn (Rochester MN)',
        'street1' => '25 2nd St SW,',
        'city' => 'Rochester',
        'state' => 'MN',
        'zip' => '55902',
        'country' => 'US',
        'phone' => '15072268299',
        'email' => 'tines@popus2.com',
    ],
];
