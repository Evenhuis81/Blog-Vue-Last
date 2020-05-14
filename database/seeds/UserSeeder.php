<?php

use App\User;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        // factory(User::class,6)->create();
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.nl',
            'password' => bcrypt('admin'),
            'role' => 1
        ]);
        User::create([
            'name' => 'Author',
            'email' => 'author@author.nl',
            'password' => bcrypt('author'),
            'role' => 2
        ]);
        foreach (range(3, 6) as $steps) {
            User::create([
                'name' => $faker->firstName(rand(0,1) ? 'male' : 'female').' '.$faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt($faker->password),
                'role' => 2
            ]);
        };
        User::create([
            'name' => 'Reader',
            'email' => 'reader@reader.nl',
            'password' => bcrypt('reader'),
            'role' => 3
        ]);
        foreach (range(8, 21) as $steps) {
            User::create([
                'name' => $faker->firstName(rand(0,1) ? 'male' : 'female').' '.$faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt($faker->password),
                'role' => 3
            ]);
        };
    }
}