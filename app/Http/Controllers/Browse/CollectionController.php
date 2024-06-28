<?php

namespace App\Http\Controllers\Browse;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CollectionController extends Controller
{
	public function show(Request $request)
	{
		return inertia("Browse/CollectionDetail", [
			'collection_id' => $request->id
		]);
	}
}
