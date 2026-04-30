<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EnquiryController extends Controller
{
    // ── INDEX — Sab Records ─────────────────────────────────────
    public function index()
    {
        $enquiries = Enquiry::latest()->get();

        return response()->json([
            'success' => true,
            'data'    => $enquiries,
            'total'   => $enquiries->count(),
        ]);
    }

    // ── STORE — Naya Record ─────────────────────────────────────
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // Required fields
            'enquiry_no'   => 'required|string|unique:enquiries,enquiry_no',
            'type'         => 'required|in:Open,Close',
            'accuse_name'  => 'required|string|max:255',
            'department'   => 'required|string|max:255',
            'district'     => 'required|string|max:255',

            // Optional fields
            'designation'          => 'nullable|string|max:255',
            'age'                  => 'nullable|integer|min:18|max:70',
            'aadhar_no'            => 'nullable|string|max:20',
            'permanent_address'    => 'nullable|string',
            'current_address'      => 'nullable|string',
            'personal_no'          => 'nullable|string|max:50',
            'mobile'               => 'nullable|string|max:15',
            'date_of_joining'      => 'nullable|date',
            'joining_department'   => 'nullable|string|max:255',
            'joining_designation'  => 'nullable|string|max:255',
            'current_designation'  => 'nullable|string|max:255',
            'id_department'        => 'nullable|string|max:255',
            'sector_name'          => 'nullable|string|max:255',
            'io_name'              => 'nullable|string|max:255',
            'io_mobile'            => 'nullable|string|max:15',
            'writeup'              => 'nullable|string',
            'file_path'            => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240',
            'dfo_date'             => 'nullable|date',
            'dfo_comment'          => 'nullable|string',
            'brief_description'    => 'nullable|string',
            'supplementary_report' => 'nullable|string',
            'result'               => 'nullable|string|max:255',
        ]);

      if ($validator->fails()) {
    return response()->json([
        'success' => false,
        'message' => 'Validation failed',
        'errors'  => $validator->errors(),
    ], 422);
}

        $data = $request->except('file_path');

        // File Upload
        if ($request->hasFile('file_path')) {
            $data['file_path'] = $request->file('file_path')
                ->store('uploads/enquiries', 'public');
        }

        $enquiry = Enquiry::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Enquiry created successfully',
            'data'    => $enquiry,
        ], 201);
    }

    // ── SHOW — Single Record ────────────────────────────────────
    public function show(string $id)
    {
        $enquiry = Enquiry::find($id);

        if (!$enquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Enquiry not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $enquiry,
        ]);
    }

    // ── UPDATE — Record Edit ────────────────────────────────────
    public function update(Request $request, string $id)
    {
        $enquiry = Enquiry::find($id);

        if (!$enquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Enquiry not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'enquiry_no'           => 'sometimes|string|unique:enquiries,enquiry_no,' . $id,
            'type'                 => 'sometimes|in:Open,Close',
            'accuse_name'          => 'sometimes|string|max:255',
            'department'           => 'sometimes|string|max:255',
            'district'             => 'sometimes|string|max:255',
            'designation'          => 'nullable|string|max:255',
            'age'                  => 'nullable|integer|min:18|max:70',
            'aadhar_no'            => 'nullable|string|max:20',
            'permanent_address'    => 'nullable|string',
            'current_address'      => 'nullable|string',
            'personal_no'          => 'nullable|string|max:50',
            'mobile'               => 'nullable|string|max:15',
            'date_of_joining'      => 'nullable|date',
            'joining_department'   => 'nullable|string|max:255',
            'joining_designation'  => 'nullable|string|max:255',
            'current_designation'  => 'nullable|string|max:255',
            'id_department'        => 'nullable|string|max:255',
            'sector_name'          => 'nullable|string|max:255',
            'io_name'              => 'nullable|string|max:255',
            'io_mobile'            => 'nullable|string|max:15',
            'writeup'              => 'nullable|string',
            'file_path'            => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240',
            'dfo_date'             => 'nullable|date',
            'dfo_comment'          => 'nullable|string',
            'brief_description'    => 'nullable|string',
            'supplementary_report' => 'nullable|string',
            'result'               => 'nullable|string|max:255',
            'is_active'            => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors(),
            ], 422);
        }

        $data = $request->except('file_path');

        // File Upload — purani file delete karke nai upload karo
        if ($request->hasFile('file_path')) {
            if ($enquiry->file_path) {
                Storage::disk('public')->delete($enquiry->file_path);
            }
            $data['file_path'] = $request->file('file_path')
                ->store('uploads/enquiries', 'public');
        }

        $enquiry->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Enquiry updated successfully',
            'data'    => $enquiry->fresh(),
        ]);
    }

    // ── DESTROY — Delete Record ─────────────────────────────────
    public function destroy(string $id)
    {
        $enquiry = Enquiry::find($id);

        if (!$enquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Enquiry not found',
            ], 404);
        }

        // File bhi delete karo
        if ($enquiry->file_path) {
            Storage::disk('public')->delete($enquiry->file_path);
        }

        $enquiry->delete(); // SoftDelete

        return response()->json([
            'success' => true,
            'message' => 'Enquiry deleted successfully',
        ]);
    }

    // ── SEARCH — Filters se dhundho ─────────────────────────────
    // GET /api/enquiries/search?name=X&district=Y&department=Z
    public function search(Request $request)
    {
        $filters = $request->only([
            'name',
            'enquiry_no',
            'department',
            'district',
            'designation',
            'type',
        ]);

        $enquiries = Enquiry::search($filters)->latest()->get();

        return response()->json([
            'success' => true,
            'data'    => $enquiries,
            'total'   => $enquiries->count(),
        ]);
    }

    // ── TOGGLE STATUS — Active / Inactive ──────────────────────
    public function toggleStatus(string $id)
    {
        $enquiry = Enquiry::findOrFail($id);
        $enquiry->is_active = !$enquiry->is_active;
        $enquiry->save();

        return response()->json([
            'success'   => true,
            'message'   => 'Status updated',
            'is_active' => $enquiry->is_active,
        ]);
    }

    // ── STATS — Dashboard ke liye ───────────────────────────────
    public function stats()
    {
        return response()->json([
            'success' => true,
            'data'    => [
                'total'        => Enquiry::count(),
                'open'         => Enquiry::open()->count(),
                'closed'       => Enquiry::closed()->count(),
                'by_dept'      => Enquiry::selectRaw('department, count(*) as count')
                                    ->groupBy('department')
                                    ->orderByDesc('count')
                                    ->get(),
                'by_district'  => Enquiry::selectRaw('district, count(*) as count')
                                    ->groupBy('district')
                                    ->orderByDesc('count')
                                    ->get(),
            ],
        ]);
    }
}