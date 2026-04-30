<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('enquiries', function (Blueprint $table) {
             $table->id();
 
            // ── ENQUIRY BASIC INFO ──────────────────────────────
            $table->string('enquiry_no')->unique()->comment('Enquiry Number - Search/Manual');
            $table->enum('type', ['Open', 'Close'])->default('Open')->comment('Type of Enquiry');
 
            // ── NAME OF ACCUSED ─────────────────────────────────
            $table->string('accuse_name')->comment('Name of Accused');
            $table->string('department')->comment('Department - Dropdown');
            $table->string('district')->comment('District - Dropdown');
            $table->string('designation')->nullable()->comment('Designation - Dropdown');
 
            // ── PERSONAL DETAILS OF ACCUSED ─────────────────────
            $table->unsignedSmallInteger('age')->nullable();
            $table->string('aadhar_no', 20)->nullable()->comment('Aadhar Number');
            $table->text('permanent_address')->nullable();
            $table->text('current_address')->nullable();
            $table->string('personal_no', 50)->nullable()->comment('Personal Number');
            $table->string('mobile', 15)->nullable();
 
            // ── SERVICE / JOINING DETAILS ───────────────────────
            $table->date('date_of_joining')->nullable()->comment('DOJ');
            $table->string('joining_department')->nullable()->comment('Which Dept at Joining');
            $table->string('joining_designation')->nullable()->comment('Designation at Joining');
            $table->string('current_designation')->nullable();
            $table->string('id_department')->nullable()->comment('ID Department');
 
            // ── SECTOR & INVESTIGATION OFFICER ──────────────────
            $table->string('sector_name')->nullable()->comment('Name of Sector');
            $table->string('io_name')->nullable()->comment('Investigation Officer Name');
            $table->string('io_mobile', 15)->nullable()->comment('IO Mobile No');
 
            // ── WRITE-UP / COMMENT / NOTE ────────────────────────
            $table->longText('writeup')->nullable()->comment('Write-up Box / Comment / Note');
            $table->string('file_path')->nullable()->comment('Uploaded File');
 
            // ── DFO — DRAFT FINAL REPORT ─────────────────────────
            $table->date('dfo_date')->nullable()->comment('DFO Date');
            $table->longText('dfo_comment')->nullable()->comment('Comment Box / Note Box');
            $table->longText('brief_description')->nullable()->comment('Brief Description of Enquiry');
            $table->longText('supplementary_report')->nullable()->comment('Supplementary Report - Optional');
 
            // ── RESULT ───────────────────────────────────────────
            $table->string('result')->nullable()->comment('Result - Decision of Govt Order');
 
            $table->boolean('is_active')->default(1);
            $table->timestamps();
            $table->softDeletes();
 
            // ── INDEXES FOR SEARCH ───────────────────────────────
            $table->index('accuse_name');
            $table->index('department');
            $table->index('district');
            $table->index('designation');
            $table->index('type');
            $table->index('enquiry_no');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
