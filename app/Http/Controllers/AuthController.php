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
        // $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(RegisterUser $request)
    {
        $validated = $request->validated();
        if (User::create($validated)) {
            return response()->json([
                'message' => 'User created successfully',
                'status_code' => 201
            ], 201);
        } else {
            return response()->json([
                'message' => 'Some error occurred, Please try again',
                'status_code' => 500
            ], 500);
        }
    }

    public function login(LoginUser $request)
    {
        $emailCheck = User::where('email', $request->email)->get();
        if(sizeof($emailCheck) === 0) {
            return response()->json([
                'error' => 'Email not found'
            ], 401);
        }

        $credentials = $request->only('email', 'password');   
        if (!Auth::attempt($credentials)) {
            return response()->json([
                // Email checked above and exists, but attempt failed, so password is not correct
                'error' => 'Password incorrect'
            ], 401);
        }
        $user = auth()->user();

        if ($user->role == 'admin') {
            $tokenData = $user->createToken('Personal Access Token', ['do_anything']);
        } elseif ($user->role == 'author') {
            $tokenData = $user->createToken('Personal Access Token', ['can_create']);
        }
        $token = $tokenData->token;

        if (!$request->remember) {
            $token->expires_at = Carbon::now()->addHours(12);
        }

        if ($token->save()) {
            return response()->json([
                'user' => $user,
                'access_token' => $tokenData->accessToken,
                'token_type' => 'Bearer',
                'token_scope' => $tokenData->token->scopes[0],
                'expires_at' => Carbon::parse($tokenData->token->expires_at)->toDateTimeString(),
                'status_code' => 200
            ], 200);
        } else {
            return response()->json([
                'message' => 'Some error occurred, Please try again',
                'status_code' => 500
            ], 500);
        }
    }

    public function logout()
    {
        auth()->user()->token()->revoke();
        return response()->json([
            'message' => 'Logout successfully',
            'status_code' => 200
        ], 200);
    }

    public function details()
    {
        return response()->json(auth()->user());
    }

    

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function login(LoginUser $request)
    // {
    //     $validated = $request->validated();

    //     // $credentials = request(['email', 'password']);

    //     if (! $token = auth()->attempt($validated)) {
    //         return response()->json(['error' => 'login failed'], 401);
    //     }

    //     return $this->respondWithToken($token);
    // }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function me()
    // {
    //     return response()->json(auth()->user());
    // }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function logout()
    // {
    //     auth()->logout();

    //     return response()->json(['message' => 'Successfully logged out']);
    // }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function refresh()
    // {
    //     return $this->respondWithToken(auth()->refresh());
    // }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // protected function respondWithToken($token)
    // {
    //     return response()->json([
    //         'access_token' => $token,
    //         'token_type' => 'bearer',
    //         'expires_in' => auth()->factory()->getTTL() * 60
    //     ]);
    // }
}
