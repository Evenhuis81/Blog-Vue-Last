<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    // One to Many relation
    public function blogs() {
        return $this->hasMany('App/Blog');
    }
}
