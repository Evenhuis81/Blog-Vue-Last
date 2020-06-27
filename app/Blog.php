<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title', 'description', 'owner_id', 'category_id', 'premium'
    ];

    // 2 times a One to Many relation (inverse)
    public function owner()
    {
        return $this->belongsTo('App\User');
    }

    public function category() {
        return $this->belongsTo('App\Category');
    }
}
