<?php

use App\Blog;
use App\Category;
use Illuminate\Database\Seeder;

class BlogCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get all the categories attaching up to 3 random categories to each blog
        $categories = Category::all();

        // Populate the pivot table
        Blog::all()->each(function ($blog) use ($categories) { 
            $blog->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            ); 
        });
    }
}
