<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use App\Category;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $color = ['white--text', 'black--text', 'blue--text text--darken-2', 'white--text', 'white--text', 'black--text', 'black--text', 'blue--text text--darken-2', 'white--text', 'black--text'];
        // gebuirk camelCase, dus subHeader
        $subheader = ['Dare to take risks', 'New ways to find a partner', 'How to make your website even more popular', 'What\'s new in the world of mobile phones', 'Find out what\'s in theatres now', 'The latest releases', 'Check out the latest inventions', 'Keeping up with appearances', 'Hot and not in the world of trends', 'What to expect from the future'];
        $arr_names = [];
        $image_names = [];
        $fullpath_image_names = Storage::files('/public/categoryimages');
        // try strreplacemethod

        // cryptische code, kan dit eenvoudiger?
        foreach ($fullpath_image_names as $element) {
            array_push($arr_names, '/storage/'.explode('/', $element, 2)[1]);
        };
        foreach ($arr_names as $element) {
            array_push($image_names, str_split($element, 24)[1]);
        }
        foreach ($arr_names as $key => $element) {
            Category::create([
                'name' => explode("-", explode("/", $element)[3])[0],
                'subheader' => $subheader[$key],
            ]);
        }
    }
}
