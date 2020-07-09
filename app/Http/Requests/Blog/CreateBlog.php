<?php

namespace App\Http\Requests\Blog;

use Illuminate\Foundation\Http\FormRequest;

class CreateBlog extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return request()->header('Authorization') ? true : false;
    }

    protected function prepareForValidation()
    {
        $requestParsed = json_decode($this->get('props'));
        // remove props? error handling?
        $this->request->remove('props');
        foreach ($requestParsed as $key => $value) {
            $this->merge([ $key => $value ]);
        };
        $this->merge([
            'owner_id' => auth()->id(),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|min:5',
            'description' => 'required|string|min:10',
            'category_ids' => 'array|min:1|max:3',
            'category_ids.*' => 'integer',
            'premium' => 'required|boolean',
            'image' => 'required|image|max:2048',
            'owner_id' => 'required|integer'
        ];
    }
}
