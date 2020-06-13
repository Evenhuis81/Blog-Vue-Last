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
    public function register(RegisterUser $request)
    {
        if ($request->header('Authorization')) {
            abort(403, "You are already registered and logged in!");
        }
        $validated = $request->validated();
        if (User::create($validated)) {
            return response()->json('User created', 201);
        } else {
            return response()->json(['errors' => ['server' => ['Internal Server Error']]], 500);
        }
    }

    public function loginpg(LoginUser $request)
    {
        $req = Request::create(route('passport.token'), 'POST', [
            'grant_type' => 'password',
            'client_id' => config('passport.password_grant_client.id'),
            'client_secret' => config('passport.password_grant_client.secret'),
            'username' => $request->email,
            'password' => $request->password,
            'scope' => '*'
        ]);
  
        
        return app()->handle($req);
    }

    public function login(LoginUser $request)
    {
        if ($request->header('Authorization')) {
            abort(403, "You are already logged in!");
        }
        $credentials = $request->only('email', 'password');   
        if (!Auth::attempt($credentials)) {
            return response()->json(['errors' => ['credentials' => ['Email or Password incorrect']]], 401);
        }
        $user = auth()->user();

        $role = $user->role;
        $tokenData = $user->createToken('Personal Access Token', [$role.'_access']);
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
    
    public function details()
    {
        // Check personal access token for expiration and refresh if needed
        return response()->json(auth()->user());
    }
    
    public function logout()
    {
        auth()->user()->token()->revoke();
        return response()->json([
            'message' => 'Logout successfully',
        ], 200);
    }
}
