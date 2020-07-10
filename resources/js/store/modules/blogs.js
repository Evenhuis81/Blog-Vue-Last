export default {
    namespaced: true,
    state: {
        blogs: []
    },
    mutations: {
        set_blogs(state, blogs) {
            state.blogs = blogs;
        }
    },
    actions: {
        createBlog({ state, rootGetters }, blog) {
            // copy blog, cause apparently blog is linked to component still ...
            let props = { ...blog }

            // get ids from category names to sync in backend and delete names
            let categoryNames = props.categories
            delete props.categories
            let categories = rootGetters["categories/categories"]
            let category_ids = categories.filter(cat => categoryNames.includes(cat.name)).map(x => x.id)
            props.category_ids = category_ids

            // set image apart, see FormData
            let image = props.imageInput
            delete props.imageInput

            // needed for sending/saving files (else all becomes string instead of integer etc)
            var formData = new FormData();
            formData.append("props", JSON.stringify(props));
            formData.append("image", image);
            return this._vm.$http
                .post("/api/blogs", formData)
                .then(res => {
                    state.blogs.push(res.data)
                    return res.data.id
                })
                .catch(err => {
                    //   if (err.response.status === 429) {
                    //     vm.errors = [[err.response.statusText]];
                    //   } else if (err.response.status === 403) {
                    //     vm.snackbar({
                    //       text: err.response.data.message,
                    //       color: "error",
                    //       y: "bottom"
                    //     });
                    //   } else {
                    //     vm.errors = err.response.data.errors;
                    //   }
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
            // check if input has changed
            //   if (
            //     JSON.stringify(this.form) ===
            //     JSON.stringify(this.editFormData(this.id))
            //   ) {
            //     this.errors.submitForm = [["You haven't changed anything!"]];
            //     return;
            //   }

            //   this.updateBlog({ form: this.form, id: this.id })
            //     .then(response => {
            //       this.$router.push({ name: "blog", params: { id: this.id } });
            //       this.snackbar({
            //         text: "You have successfully edited your blog",
            //         color: "teal"
            //       });

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
        updateFormData: (state, getters) => id => {
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
        },
        getRules: (state) => {
            let rules = {
                title: [
                    v => !!v || "A title is required",
                    v => (v && v.length >= 5) || "Title must be at least 5 characters"
                ],
                description: [
                    v => !!v || "A description is required",
                    v => (v && v.length >= 10) || "Description must be at least 10 characters"
                ],
                categories: [
                    v => !!v.length || "At least 1 category is required",
                    v => v.length < 4 || "Maximum number of categories is 3"
                ],
                image: [
                    v => !v || v.size < 2000000 || "Image size should be less than 2 MB!",
                    v => !!v || "An image is required"
                ]
            }
            return rules
        }
    }
};
