<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes(function ($router) {
            $router->forAccessTokens();
        });

        Passport::tokensExpireIn(now()->addMinutes(5));

        Passport::refreshTokensExpireIn(now()->addDays(30));

        Passport::tokensCan([
            'test' => 'restricted',
            'admin_access' => 'Administrator',
            'author_access' => 'Author',
            'reader_access' => 'Reader'
        ]);

        Passport::setDefaultScope(['reader_access']);
    }
}
