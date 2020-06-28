<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use Faker\Generator as Faker;

$autoIncrement = autoIncrement();

$factory->define(Comment::class, function (Faker $faker) use ($autoIncrement) {
    $autoIncrement->next();
    return [
        'description' => $faker->text(rand(5, 75)),
        'owner_id' => rand(8, 22),
        'blog_id' => rand(1, 50),
        'created_at' => $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null),
    ];
});

// function autoIncrement() {
//     for ($i = 0; $i < 51; $i++) {
//         yield $i;
//     }
// }
