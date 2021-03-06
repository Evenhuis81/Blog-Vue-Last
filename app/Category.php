<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable =['name', 'subheader'];

    // Many to Many relation
    public function blogs() {
        return $this->belongsToMany('App/Blog');
    }
}
