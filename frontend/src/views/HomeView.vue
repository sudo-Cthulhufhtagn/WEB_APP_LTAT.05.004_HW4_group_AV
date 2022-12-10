<template>
  <div class="sticky_menu">
    <button v-if = "authResult" @click="Logout">Logout</button>
    <button v-if = "authResult" @click="AddPost">Add post</button>
    <button v-if = "authResult" @click="DeleteAllPosts">Delete them all!</button>
    <div style="height:1vh;"></div>
  </div>
  <div class="post-list" v-for="post in posts"   :key="post.id">  
      <!-- <a class="singlepost" :href="'/api/post/' + post.id"> -->
    <a class="post_container" @click="CheckPost(post.id)">
      <div class="post">
          <h3 class="post_title"> {{post.date}} </h3>
          <p class="post_text"> {{post.body}} </p>
      </div>
    </a>
  </div>
</template>

<script>
// @ is an alias to /src
import auth from "../auth";

export default {
  name: "HomeView",
  components: {
  },
  data: function() {
    return {
    posts:[ ],
    authResult: auth.authenticated()
    }
  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/login");
        //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
    },
    fetchPosts() {
      // You should remember how Fetch API works
      // fetch is a GET request unless stated otherwise. Therefore, it will fetch all posts from the database
      fetch(`http://localhost:3000/api/posts/`)
        .then((response) => response.json())
        .then((data) => (this.posts = data))
        .catch((err) => console.log(err.message));
    },
    AddPost() {
      this.$router.push('/api/addpost');
    },
    CheckPost(ID) {
      this.$router.push('/api/post/'+ID);
    },
    DeleteAllPosts() {
      fetch(`http://localhost:3000/api/delete_all`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }})
        .then((response) => response.json())
        .catch((err) => console.log(err.message));
      this.$forceUpdate(); // why not?
      this.fetchPosts();
    },
  }, 
  mounted() {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        // .then((response) => response.json())
        // .then(data => this.posts = data)
        // .catch(err => console.log(err.message))

        // call fetchPosts() when this element (AllPosts) mounts 
        this.fetchPosts();
        console.log("mounted");
    }
};
</script>