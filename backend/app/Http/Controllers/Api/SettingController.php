<?php

namespace App\Http\Controllers\Api; // ✅ correct namespace

use App\Http\Controllers\Controller; // ✅ Controller import
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Setting;

class SettingController extends Controller
{
    // 🔹 Show current settings (for edit form)
    public function index()
    {
        $setting = Setting::first();

        return response()->json([
            'status' => true,
            'data' => $setting
        ]);
    }

    // 🔹 Create / Update settings
    public function store(Request $request)
    {
        // 1️⃣ Validation
        $request->validate([
            'site_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'address_alt' => 'nullable|string',
            'donate_text' => 'nullable|string',
            'footer_about' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240', // 10MB
            'footer_logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'favicon' => 'nullable|image|mimes:jpg,jpeg,png,ico|max:10240',
        ]);

        try {
            // 2️⃣ Get existing setting or create new
            $setting = Setting::firstOrNew();

            // 3️⃣ Fill the basic fields
            $setting->fill([
                'site_name' => $request->site_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'address_alt' => $request->address_alt,
                'donate_text' => $request->donate_text,
                'footer_about' => $request->footer_about,
            ]);

            // 4️⃣ Handle logo image
            if ($request->hasFile('logo')) {
                if ($setting->logo && Storage::disk('public')->exists($setting->logo)) {
                    Storage::disk('public')->delete($setting->logo);
                }
                $setting->logo = $request->file('logo')->store('uploads/settings', 'public');
            }

            // 5️⃣ Handle footer logo image
            if ($request->hasFile('footer_logo')) {
                if ($setting->footer_logo && Storage::disk('public')->exists($setting->footer_logo)) {
                    Storage::disk('public')->delete($setting->footer_logo);
                }
                $setting->footer_logo = $request->file('footer_logo')->store('uploads/settings', 'public');
            }

            // 6️⃣ Handle favicon
            if ($request->hasFile('favicon')) {
                if ($setting->favicon && Storage::disk('public')->exists($setting->favicon)) {
                    Storage::disk('public')->delete($setting->favicon);
                }
                $setting->favicon = $request->file('favicon')->store('uploads/settings', 'public');
            }

            // 7️⃣ Save record
            $setting->save();

            // 8️⃣ Success response
            return response()->json([
                'status' => true,
                'message' => 'Settings successfully saved',
                'data' => $setting
            ]);
        } catch (\Exception $e) {
            // 🔴 Error response
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong: ' . $e->getMessage()
            ], 500);
        }
    }
}
