<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Blog;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Storage;

$autoIncrement = autoIncrement();

$factory->define(Blog::class, function (Faker $faker) use ($autoIncrement) {
    $autoIncrement->next();
    // dd($faker->image('c:\laragon\www\blog-vue-last\public\storage\blogimages',640,480, null, false));
    // $imageFile = new File($image);
    // Storage::disk('local')->put('image'.$autoIncrement->current, $imageFile);
    return [
        'title' => $faker->text(rand(40,60)),
        'description' => $faker->text(rand(1200,1500)),
        // 'owner_id' => floor(($autoIncrement->current()-1) / 10) + 2,
        'owner_id' => rand(4, 7),
        'created_at' => $faker->dateTimeBetween($startDate = '-5 years', $endDate = 'now', $timezone = null),
        // make non-hardcoded, random ...
        'category_id' => rand(1, 10),
        'premium' => $autoIncrement->current() % 4 === 0 ? true : false
        // updated_at => append in BlogSeeder, created_at + random time, for some of them ....
        // 'image' => $faker->image('c:\laragon\www\blog-vue-last\public\storage\blogimages',640,480, null, false),
    ];
});

function autoIncrement() {
    for ($i = 0; $i < 51; $i++) {
        yield $i;
    }
}
