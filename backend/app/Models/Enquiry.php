<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Enquiry extends Model
{
    //

    use SoftDeletes;

    protected $table = 'enquiries';

    protected $fillable = [
        // Enquiry Basic
        'enquiry_no',
        'type',

        // Accused Info
        'accuse_name',
        'department',
        'district',
        'designation',

        // Personal Details
        'age',
        'aadhar_no',
        'permanent_address',
        'current_address',
        'personal_no',
        'mobile',

        // Service Details
        'date_of_joining',
        'joining_department',
        'joining_designation',
        'current_designation',
        'id_department',

        // Sector & IO
        'sector_name',
        'io_name',
        'io_mobile',

        // Write-up
        'writeup',
        'file_path',

        // DFO
        'dfo_date',
        'dfo_comment',
        'brief_description',
        'supplementary_report',

        // Result
        'result',

        'is_active',
    ];

    protected $casts = [
        'date_of_joining' => 'date',
        'dfo_date'        => 'date',
        'is_active'       => 'boolean',
        'age'             => 'integer',
    ];

    // ── SCOPES ──────────────────────────────────────────────────

    // Only active records
    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }

    // Only Open enquiries
    public function scopeOpen($query)
    {
        return $query->where('type', 'Open');
    }

    // Only Closed enquiries
    public function scopeClosed($query)
    {
        return $query->where('type', 'Close');
    }

    // Search scope — name, enquiry_no, designation, department, district
    public function scopeSearch($query, array $filters)
    {
        if (!empty($filters['name'])) {
            $query->where('accuse_name', 'like', '%' . $filters['name'] . '%');
        }
        if (!empty($filters['enquiry_no'])) {
            $query->where('enquiry_no', 'like', '%' . $filters['enquiry_no'] . '%');
        }
        if (!empty($filters['department'])) {
            $query->where('department', $filters['department']);
        }
        if (!empty($filters['district'])) {
            $query->where('district', $filters['district']);
        }
        if (!empty($filters['designation'])) {
            $query->where('designation', $filters['designation']);
        }
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }
        return $query;
    }
}
