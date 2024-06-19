<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;

class LoginController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function authenticate(LoginRequest $request)
    {
        $request->validated();

        if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            return back()->with('status', (object) [
                'type' => 'error',
                'message' => 'The Provided Credentials do not match our records!',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->back()->with('status', (object) [
            'type' => 'success',
            'message' => 'Successfully Signed In.'
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->back()->with('status', (object) [
            'type' => 'success',
            'message' => 'Successfully Signed Out.'
        ]);
    }
}
