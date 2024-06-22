<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SeriesController extends Controller
{
	public function index()
	{
		return inertia('Main/Series/Index');
	}

	public function show(Request $request)
	{
		return inertia("Main/Series/Detail", [
			'series_id' => $request->id,
			'series_slug' => $request->slug
		]);
	}
}
