<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['description', 'owner_id', 'blog_id'];

    // One to Many relation (inverse) x2
    public function owner()
    {
        return $this->belongsTo('App\User');
    }
    public function blog()
    {
        return $this->belongsTo('App\Blog');
    }
}
