<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $admin = \App\Models\User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
        ]);

        $fundraiser = $admin->fundraisers()->create([
            'name' => 'John Marshall Boys Basketball',
            'start_date' => now(),
            'end_date' => now()->addWeek()->toDateString(),
            'activity' => 'Basketball',
            'affiliation' => 'High School',
            'goal' => 900,
            'participant_count' => 9,
            'code' => Str::random(6),
            'city' => 'Rochester',
            'state' => 'MN',
            'postal_code' => '55901',
        ]);

        // Update Products from Shopify API
        Artisan::call('app:update-products');

        $users = collect(json_decode(file_get_contents(database_path('data/popup-stores.json')), true));
        $users->each(function ($u) use ($fundraiser) {
            $email = "{$u['first_name']}_{$u['first_name']}@example.com";
            /** @var User $user */
            $user = User::factory()->create([
                'first_name' => $u['first_name'],
                'last_name' => $u['last_name'],
                'avatar' => asset($u['image']),
                'email' => $email,
            ]);

            $user->stores()->create([
                'fundraiser_id' => $fundraiser->id,
            ]);
        });
    }
}
