<?php

namespace App\Http\Controllers\Browse;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PersonController extends Controller
{
	public function show(Request $request)
	{
		return inertia('Browse/PersonDetail', [
			'person_slug' => $request->slug,
			'person_id' => $request->id,
		]);
	}
}
