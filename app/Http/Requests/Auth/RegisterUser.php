<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:10',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:5|confirmed'
        ];
    }
    public function validated()
    {
            // dd($this->validated());
            $validated = parent::validated();
            $validated['password'] = bcrypt($validated['password']);
            return $validated;
    }
}
