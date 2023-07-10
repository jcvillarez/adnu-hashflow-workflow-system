<style>
.signup-indv-body {
  @apply bg-[url('@/assets/background-images/admin.jpg')] bg-cover bg-fixed bg-no-repeat font-['Inter'] h-[100vh] min-h-[1000px] min-w-[800px];
} /* lock */
.signup-indv-content {
  @apply flex flex-col grow h-full items-center justify-start;
} /* lock */

.signup-indv-frame {
  @apply flex flex-col items-center justify-center gap-3 w-[500px] my-auto;
}
.signup-indv-frame > form,
.signup-indv-frame > div {
  @apply border-[1px] border-[#aaa] flex flex-col items-center justify-center gap-3 p-[30px] w-full;
}
.signup-indv-frame > form > img {
  @apply w-[100px] h-auto mb-[20px];
}
.signup-indv-frame > form > input {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full;
}
.signup-indv-frame > form > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full rounded-[5px];
}
.signup-indv-frame > form > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.signup-indv-frame > form > .gender-choice-container {
  @apply flex flex-row items-center justify-center gap-5 w-full;
}
.signup-indv-frame > form > .gender-choice-container > div {
  @apply flex items-center gap-1;
}

.signup-indv-frame > form > .gender-choice-container > div > input,
.signup-indv-frame > form > .gender-choice-container > div > label {
  @apply my-auto font-normal text-[13px];
}

.signup-indv-frame > div > span > a {
  @apply text-[#F18642];
}
</style>

<template>
  <div class="signup-indv-body">
    <div class="signup-indv-content">
      <div class="signup-indv-frame">
        <form @submit.prevent="createUser()">
          <img src="@/assets/hashflow-logo.png" />
          <span class="w-full text-left font-bold">Full Name</span>
          <input required v-model="name" type="name" />
          <span class="w-full text-left font-bold">Address</span>
          <input required v-model="address" type="name" />
          <span class="w-full text-left font-bold">Contact Number</span>
          <input required v-model="contact" type="name" />
          <span class="w-full text-left font-bold">Email</span>
          <input required v-model="username" type="email" />
          <span class="w-full text-left font-bold">Password</span>
          <input required v-model="password" type="password" />
          <span class="w-full text-left font-bold">Confirm Password</span>
          <input required v-model="confirm_password" type="password" />

          <div class="gender-choice-container">
            <div>
              <input
                required
                v-model="gender"
                value="male"
                name="gender"
                type="radio"
              />
              <label for="male">Male</label>
            </div>

            <div>
              <input
                required
                v-model="gender"
                value="female"
                name="gender"
                type="radio"
              />
              <label for="female">Female</label>
            </div>
          </div>

          <button>Create Individual Account</button>
        </form>

        <div>
          <span>Already have an account? <a href="/login">Sign in</a></span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added
import Footer from "@/components/FooterComponent.vue";

import Parse from "parse";
export default {
  name: "SignupUserView",
  components: { Footer },
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      address: "",
      contact: "",
      name: "",
      gender: [],
      userRole: "user",
    };
  },
  methods: {
    async createUser() {
      if (this.password != this.confirm_password) {
        alert("Password does not match!");
        return;
      }
      const useraccount = new Parse.User();
      useraccount.set("username", this.username);
      useraccount.set("password", this.password);
      useraccount.set("confirm_password", this.confirm_password);
      useraccount.set("name", this.name);
      useraccount.set("address", this.address);
      useraccount.set("contact", this.contact);
      useraccount.set("gender", this.gender);
      useraccount.set("role", this.userRole);
      try {
        await useraccount.signUp();
        alert("Individual Account Successfully Created!");
        this.$router.push({
          name: "LoginView",
        });
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>
