<?php

namespace App\Http\Controllers;

use App\Blog;
use Illuminate\Http\Request;
use App\Http\Requests\Blog\CreateBlog;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api')->except('index');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $blogs = Blog::with('comments', 'owner', 'categories')->get();
        return response()->json($blogs);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request)
    public function store(CreateBlog $request)
    {
        $validated = $request->validated();
        $file_name = $this->storeImage($validated['image']);
        $validated['imagepath'] = $file_name;
        if ($blog = Blog::create($validated)) {
            if ($blog->categories()->sync($validated["category_ids"])) {
                $blog->load('owner', 'categories');
                return response()->json($blog, 201);
            } else {
                // this needs action for removing the just created blog, but it's a bit overdone
                return response()->json(['errors' => ['server' => ['Error creating Categories for Blog']]], 500);
            }
        } else {
            return response()->json(['errors' => ['server' => ['Error creating Blog']]], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'min:5'],
            'description' => ['required', 'string', 'min:10'],
            'category_ids' => ['array', 'min:1'],
            'premium' => ['required', 'boolean']
        ]);
        $index_key = array_search("category_ids", array_keys($validated));
        $categories = array_splice($validated, $index_key, 1);
        if ($blog->update($validated) && $blog->categories()->sync($categories["category_ids"])) {
            return response()->json('Blog Successfully Updated', 200);
        } else {
            return response()->json(['errors' => ['server' => ['Error Updating Blog']]], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {
        try {
            Blog::destroy($blog->id);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function storeImage($img)
    {
            $name = $img->getClientOriginalName();
            $file_name = 'blogimages/'.date('YmdHis',time()).'-'.$name;
            $imgcont = $img->get();
            Storage::disk('public')->put($file_name, $imgcont);
        return $file_name;
    }
}
