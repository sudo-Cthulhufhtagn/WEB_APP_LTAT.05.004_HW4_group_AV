<template>
  <div class="app_window">
    <h3 class="app_text" style="font-size:5vh">A Post</h3>
    <div>
      <label for="date">Title: </label>
      <input name="type" type="text" id="date" required v-model="post.date" />
    </div>
    <div>
      <label for="body">Body: </label>
      <textarea rows = "5" cols = "10" maxlength="150" name = "body" type="text" id="body" required v-model="post.body" style="min-width: 16vw; min-height: 12vh"></textarea>
    </div>
    <div>
      <button @click="updatePost" class="app_button">Update Post</button>
      <button @click="deletePost" class="app_button">Delete Post</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "Post",
  data() {
    return {
      post: {
        id: "",
        date: "",
        body: "",
      },
    };
  },
  methods: {
    fetchAPost(id) {
      // fetch one post with the specied id (id)
      fetch(`http://localhost:3000/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => (this.post = data))
        .catch((err) => console.log(err.message));
    },
    updatePost() {
      // using Fetch - put method - updates a specific post based on the passed id and the specified body
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.post),
      })
        .then((response) => {
          console.log(response.data);
          //this.$router.push("/apost/" + this.post.id);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deletePost() {
      // using Fetch - delete method - delets a specific post based on the passed id
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          console.log(response.data);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    // call fetchAPost() when this element mounts, and pass to it a route parameter  (id)
    // Route parameters (this.$route.params.id) are named URL segments that are used to capture the values specified at their 
    // position in the URL. The captured values are populated in the req.params object, with the name 
    // of the route parameter specified in the path as their respective keys
    this.fetchAPost(this.$route.params.id);
  },
};
</script>