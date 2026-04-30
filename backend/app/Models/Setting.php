<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    //
   protected $fillable = [
    'site_name',
    'email',
    'phone',
    'address',
    'address_alt',
    'donate_text',
    'footer_about',
    'logo',
    'footer_logo',
    'favicon'
];  
}
