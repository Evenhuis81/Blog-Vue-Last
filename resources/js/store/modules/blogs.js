export default {
    namespaced: true,
    state: {
        blogs: []
        // blog: []
    },
    mutations: {
        set_blogs(state, blogs) {
            state.blogs = blogs;
        }
    },
    actions: {
        createBlog({ dispatch }, blog) {
            return this._vm.$http
                .post("/api/blogs", blog)
                .then(res => {
                    dispatch("getBlogs");
                    return res;
                })
                .catch(err => {
                    throw err;
                });
        },
        getBlogs({ commit }) {
            return this._vm.$http
                .get("/api/blogs")
                .then(res => {
                    commit("set_blogs", res.data);
                })
                .catch(err => {
                    throw err;
                });
        },
        updateBlog({ dispatch }, payload) {
            return this._vm.$http
                .patch("/api/blogs/" + payload.id, payload.form)
                .then(res => {
                    // dispatch('blogs/getBlogs', {}, { root: true })
                    dispatch("getBlogs");
                    return;
                })
                .catch(err => {
                    throw err;
                });
        },
        deleteBlog({ dispatch }, blogId) {
            return this._vm.$http
                .delete("/api/blogs/" + blogId)
                .then(res => {
                    dispatch("blogs/getBlogs", {}, { root: true });
                    return;
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    getters: {
        blogs: state => {
            return state.blogs;
        },
        blogsNewOld(state) {
            return state.blogs
                .slice()
                .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
            // console.log(newArr)
            // return newArr
        },
        blog: state => id => {
            return state.blogs.find(blog => blog.id == id);
        },
        authorBlogs: (state, getters, rootState, rootGetters) => {
            const arr = state.blogs.filter(
                blog => blog.owner_id == rootGetters["auth/userId"]
            );
            return arr
                .slice()
                .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
        },
        editFormData: (state, getters) => id => {
            let blog = getters.blog(id);
            let formData = {
                title: blog.title,
                description: blog.description,
                category_ids: getters.blogCategoryIds(id),
                premium: !!blog.premium
            };
            return formData;
        },
        blogCategories: (state, getters) => id => {
            return getters.blog(id).categories.map(cat => " " + cat.name);
        },
        blogCategoryIds: (state, getters) => id => {
            return getters.blog(id).categories.map(cat => cat.id);
        }
    }
};
