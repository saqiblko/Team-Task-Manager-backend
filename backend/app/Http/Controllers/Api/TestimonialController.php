<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    // GET all
    public function index()
    {
        return response()->json([
            'data' => Testimonial::latest()->get()
        ]);
    }

    // POST / Add new testimonial
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'designation' => 'required',
            'message' => 'required',
            'image' => 'nullable|image|max:2048'
        ]);

        $testimonial = new Testimonial();
        $testimonial->name = $request->name;
        $testimonial->designation = $request->designation;
        $testimonial->message = $request->message;

        if ($request->hasFile('image')) {
            $testimonial->image = $request->file('image')->store('uploads/testimonials', 'public');
        }

        $testimonial->save();

        return response()->json([
            'message' => 'Testimonial added successfully',
            'data' => $testimonial
        ]);
    }

    // GET single testimonial
    public function show($id)
    {
        $testimonial = Testimonial::findOrFail($id);

        return response()->json([
            'data' => $testimonial
        ]);
    }

    // PUT/PATCH / Update testimonial
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'designation' => 'required',
            'message' => 'required',
            'image' => 'nullable|image|max:2048'
        ]);

        $testimonial = Testimonial::findOrFail($id);

        $testimonial->name = $request->name;
        $testimonial->designation = $request->designation;
        $testimonial->message = $request->message;

        if ($request->hasFile('image')) {
            // delete old image if exists
            if (!empty($testimonial->image) && Storage::disk('public')->exists($testimonial->image)) {
                Storage::disk('public')->delete($testimonial->image);
            }

            $testimonial->image = $request->file('image')->store('uploads/testimonials', 'public');
        }

        $testimonial->save();

        return response()->json([
            'message' => 'Testimonial updated successfully',
            'data' => $testimonial
        ]);
    }

    // DELETE testimonial
    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);

        // delete image if exists
        if (!empty($testimonial->image) && Storage::disk('public')->exists($testimonial->image)) {
            Storage::disk('public')->delete($testimonial->image);
        }

        $testimonial->delete();

        return response()->json([
            'message' => 'Testimonial deleted successfully'
        ]);
    }
}