<style>
.login-body {
  @apply bg-[url('@/assets/background-images/admin.jpg')] bg-cover bg-fixed bg-no-repeat font-['Inter'] h-[100vh] min-h-[550px];
}

/* lock */
.login-content {
  @apply flex flex-col grow h-full items-center justify-start;
}

/* lock */

.login-frame {
  @apply flex flex-col items-center justify-center gap-3 w-[350px] my-auto;
}

.login-frame > div {
  @apply border-[1px] border-[#aaa] flex flex-col items-center justify-center gap-3 p-[30px] w-full;
}

.login-frame > div > img {
  @apply w-[100px] h-auto mb-[20px];
}

.login-frame > div > input {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full;
}

.login-frame > div > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full rounded-[5px];
}

.login-frame > div > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.login-frame > div > span > a {
  @apply text-[#F18642];
}
</style>

<template>
  <div v-if="role">
    <LoginLoader v-bind:role="role" v-bind:redirect="redirect" />
  </div>
  <div v-if="!role">
    <div class="login-body">
      <div class="login-content">
        <div class="login-frame">
          <div>
            <img src="@/assets/hashflow-logo.png" />
            <span class="w-full text-left"><b>Email</b></span>
            <input type="email" v-model="username" />
            <span class="w-full text-left"><b>Password</b></span>
            <input type="password" v-model="password" />
            <button @click="userLogin()">Sign In</button>
            <a
              class="w-full text-center pt-[15px] text-[13px]"
              @click="forgotPassword()"
              href="javascript:void(0)"
              >Forgot Password?</a
            >
          </div>
          <div>
            <span>Don't have an account? <a href="/signupas">Sign up</a></span>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  </div>
</template>
<script>
import "/src/assets/tailwind.css"; // added
import Footer from "@/components/FooterComponent.vue";
import LoginLoader from "@/components/LoginLoader.vue";
import Parse from "parse";

export default {
  name: "LoginView",
  components: { Footer, LoginLoader },
  data() {
    return {
      username: "",
      password: "",
      role: "",
      redirect: "",
    };
  },
  mounted() {
    const currentUser = Parse.User.current();
    if (currentUser) {
      window.addEventListener("beforeunload", () => {
        Parse.User.logOut();
      });
    }
  },
  methods: {
    async userLogin() {
      try {
        const query = new Parse.Query(Parse.User);
        query.equalTo("username", this.username);
        const user = await query.first();

        if (user) {
          await Parse.User.logIn(this.username, this.password).then((roles) => {
            if (roles.get("role") === "user") {
              this.role = roles.get("role");
              this.redirect = this.$route.query.redirect || "/userdashboard";
            } else if (
              roles.get("role") === "orgUser" &&
              roles.get("archived") === false &&
              roles.get("orgName")
            ) {
              this.role = roles.get("role");
              this.redirect = this.$route.query.redirect || "/orgDashboard";
            } else if (
              roles.get("role") === "orgUser" &&
              roles.get("archived") === true &&
              roles.get("orgName")
            ) {
              alert(
                "Your account is being archived the Administrator. Please Contact your Administrator about this issue."
              );
            } else if (roles.get("role") === "admin") {
              this.role = roles.get("role");
              this.redirect = this.$route.query.redirect || "/adminDashboard";
            } else if (roles.get("role") === "moderator") {
              this.role = roles.get("role");
              this.redirect =
                this.$route.query.redirect || "/moderatorDashboard";
            }
          });
        } else {
          alert("User does not exist.");
        }
      } catch (error) {
        alert("Error " + error.code + ": " + error.message);
      }
    },
    forgotPassword() {
      this.$router.push("/forgotPassword");
    },
  },
};
</script>
