<?php

namespace App\Http\Controllers\Browse;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NetworkController extends Controller
{
	public function show(Request $request)
	{
		return inertia('Browse/NetworkDetail', [
			'network_slug' => $request->slug,
			'network_id' => $request->id,
		]);
	}
}
