<template>
  <div class="app_window">
    <h3 class="app_text" style="font-size:5vh">Please enter the credentials of the new account</h3>
    <div>
      <label for="email" class="app_text">Email</label>
      <input type="email" name="email"  required v-model="email">
    </div>
    <div>
      <label for="password" class="app_text">Password</label>
      <input type="password" name="password" required v-model="password">
    </div>
    <button @click="SignUp" class="app_button">Sign Up</button>
  </div>
</template>

<script>
export default {
name: "SignUp", 

data: function() {
    return {
   email: '',
   password: '',
  }
  },
  methods: {


SignUp() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      this.$router.push("/");
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  }, 
  }
</script>