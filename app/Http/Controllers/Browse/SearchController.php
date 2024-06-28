<?php

namespace App\Http\Controllers\Browse;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SearchController extends Controller
{
	public function show(Request $request)
	{
		return inertia('Browse/Search', [
			'query' => $request->only('query')['query']
		]);
	}
}
