<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginUser;
use App\Http\Requests\Auth\RegisterUser;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function register(RegisterUser $request)
    {
        $validated = $request->validated();
        if (User::create($validated)) {
            return response()->json('User created', 201);
        } else {
            return response()->json(['errors' => ['server' => ['Internal Server Error']]], 500);
        }
    }

    public function login(LoginUser $request)
    {
        $credentials = $request->only('email', 'password');   
        if (!Auth::attempt($credentials)) {
            return response()->json(['errors' => ['credentials' => ['Email or Password incorrect']]], 401);
        }
        $user = auth()->user();

        $role = $user->role;
        // if ($user->role === 'admin') {
            $tokenData = $user->createToken('Personal Access Token', [$role.'_access']);
        // } elseif ($user->role === 'author') {
            // $tokenData = $user->createToken('Personal Access Token', ['author_access']);
        // } else {
            // $tokenData = $user->createToken('Personal Access Token', ['author_access']);
        // }
        $token = $tokenData->token;

        if (!$request->remember) {
            $token->expires_at = Carbon::now()->addHours(1);
        }

        if ($token->save()) {
            return response()->json([
                'user' => $user,
                'access_token' => $tokenData->accessToken,
                'token_type' => 'Bearer',
                'token_scope' => $tokenData->token->scopes[0],
                'expires_at' => Carbon::parse($tokenData->token->expires_at)->toDateTimeString(),
            ], 200);
        } else {
            return response()->json(['errors' => ['server' => ['Internal Server Error']]], 500);
        }
    }

    public function logout()
    {
        auth()->user()->token()->revoke();
        return response()->json([
            'message' => 'Logout successfully',
        ], 200);
    }

    public function details()
    {
        return response()->json(auth()->user());
    }
}
