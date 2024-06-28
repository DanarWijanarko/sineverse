<?php

namespace App\Http\Controllers\Browse;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
	public function show(Request $request)
	{
		return inertia('Browse/CompanyDetail', [
			'company_slug' => $request->slug,
			'company_id' => $request->id,
		]);
	}
}
