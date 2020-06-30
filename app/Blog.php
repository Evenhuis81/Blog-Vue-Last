<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['title', 'description', 'owner_id', 'premium'];

    // One to Many relation (inverse) x2
    public function owner()
    {
        return $this->belongsTo('App\User');
    }

    public function categories()
    {
        return $this->belongsToMany('App\Category');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
}
