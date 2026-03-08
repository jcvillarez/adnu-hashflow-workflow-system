<style>
.login-body {
  @apply bg-[url('../assets/background-images/admin.jpg')] bg-cover bg-fixed bg-no-repeat font-['Inter'] h-[100vh] min-h-[550px];
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
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}

.login-frame > div > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.login-frame > div > span > a {
  @apply text-[#F18642];
}
</style>

<template>
  <div class="login-body">
    <div class="login-content">
      <div class="login-frame">
        <div>
          <img src="@/assets/hashflow-logo.png" />
          <input placeholder="Email" type="email" v-model="username" />
          <button @click="generateResetToken()">Reset Password</button>
        </div>
        <div>
          <span>Already Remembered? <a href="/login">Login</a></span>
        </div>
      </div>

      <Footer />
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added
import Footer from "@/components/FooterComponent.vue";
import Parse from "parse";

export default {
  name: "ForgotPasswordView",
  components: { Footer },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    async generateResetToken() {
      try {
        await Parse.Cloud.run("generateResetToken", {
          username: this.username,
        });
        alert("A password reset link has been sent to your email.");
      } catch (error) {
        console.error(error);
        alert("An error occurred while generating a password reset link.");
      }
    },
  },
};
</script>
