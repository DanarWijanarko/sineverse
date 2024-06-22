<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MovieController extends Controller
{
	public function index()
	{
		return inertia('Main/Movies/Index');
	}

	public function show(Request $request)
	{
		return inertia('Main/Movies/Detail', [
			'movies_id' => $request->id,
			'movies_slug' => $request->slug,
		]);
	}
}
