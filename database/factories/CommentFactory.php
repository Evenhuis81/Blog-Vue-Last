<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use Faker\Generator as Faker;

// autoincrement gaf errors tijdens seeden dus uitgecommentariseerd / verwijderd

$factory->define(Comment::class, function (Faker $faker)  {

    return [
        'description' => $faker->text(rand(5, 75)),
        'owner_id' => rand(8, 22),
        'blog_id' => rand(1, 50),
        'created_at' => $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null),
    ];
});
