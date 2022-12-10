<template>
  <div class="app_window">
    <h3 class="app_text" style="font-size:5vh">Add a Post</h3>
    <div>
      <label for="title">Title: </label>
      <input name="title" type="text" id="title" required v-model="post.date" />
    </div>
    <div>
      <label for="body">Body: </label>
      <textarea rows = "5" cols = "10" maxlength="150" name = "body" type="text" id="body" required v-model="post.body" style="min-width: 16vw; min-height: 12vh"></textarea>
    </div>
    <button @click="addPost" class="app_button">Add Post</button>
  </div>
</template>

<script>
export default {
  name: "AddPost",
  data() {
    return {
      post: {
        date: "",
        body: "",
      },
    };
  },
  methods: {
    addPost() {
      var data = {
        date: this.post.date,
        body: this.post.body,
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        console.log(response.data);
        // redirect to /allposts view
        this.$router.push("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  },
};
</script>