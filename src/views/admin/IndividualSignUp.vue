<style>
.admin-indv-create-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[90vh] min-w-[800px];
} /* lock */
.admin-indv-create-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
} /* lock */

.admin-indv-create-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
} /* lock */

.admin-indv-create-frame {
  @apply flex flex-row items-start justify-center w-full h-[1px] grow mt-[20px] gap-10;
}

.admin-indv-create-frame > form {
  @apply flex flex-col items-start gap-5 text-[13px] p-[30px] w-[500px];
}
.admin-indv-create-frame > form > div {
  @apply flex flex-col items-start font-bold;
}
.admin-indv-create-frame > form > div > span {
  @apply font-normal text-[16px];
}
.admin-indv-create-frame > form > input,
.admin-indv-create-frame > form > select {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full rounded-[5px];
}
.admin-indv-create-frame > form > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full rounded-[5px];
}
.admin-indv-create-frame > form > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.admin-indv-create-frame > .create > .gender-choice-container {
  @apply flex flex-row items-center justify-center gap-5 w-full;
}
.admin-indv-create-frame > .create > .gender-choice-container > div {
  @apply flex items-center gap-1;
}

.admin-indv-create-frame > .create > .gender-choice-container > div > input,
.admin-indv-create-frame > .create > .gender-choice-container > div > label {
  @apply my-auto font-normal text-[13px];
}

.admin-indv-create-frame > .upload {
  @apply flex flex-col items-start gap-5 grow text-[13px];
}
.admin-indv-create-frame > .upload > a {
  @apply text-[red] font-bold;
}
</style>

<template>
  <div class="admin-indv-create-body">
    <AdminNavBarComponent />
    <div class="admin-indv-create-content">
      <span>Create Individual Account for Organization</span>

      <div class="admin-indv-create-frame">
        <form class="create" @submit.prevent="createUser()">
          <span>Full Name</span>
          <input type="string" v-model="name" />
          <span>Current Address</span>
          <input type="string" v-model="address" />
          <span>Contact Number</span>
          <input type="string" v-model="contact" />
          <span>Email Address</span>
          <input type="email" v-model="username" />
          <span>Password</span>
          <input type="password" v-model="password" />

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

          <button class="rounded-[5px]">Create Account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added

import Parse from "parse";
import AdminNavBarComponent from "@/components/AdminNavBarComponent.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      name: "",
      address: "",
      contact: "",
      gender: [],
      userRole: "orgUser",
      errors: "",
    };
  },
  methods: {
    async createUser() {
      const username = Parse.User.current().get("username");
      const admin = Parse.Object.extend("_User");
      const adminQuery = new Parse.Query(admin);
      adminQuery.equalTo("username", username);
      const adminAccount = await adminQuery.first();
      const adminOrgName = adminAccount.get("orgName");

      const userAccount = new Parse.User(); //Create user
      userAccount.set("username", this.username);
      userAccount.set("password", this.password);
      userAccount.set("orgName", adminOrgName);
      userAccount.set("name", this.name);
      userAccount.set("address", this.address);
      userAccount.set("contact", this.contact);
      userAccount.set("gender", this.gender);
      userAccount.set("role", this.userRole);
      userAccount.set("archived", false);
      try {
        await userAccount.signUp();
        alert("Organization Account Successfully Created!");
        const User = Parse.Object.extend("_User");
        const user = new Parse.Query(User);
        const userID = await user.find();
        const count = await user.count();
        for (let i = 0; i < count; i++) {
          this.$router.push({
            name: "admin",
            query: {
              id: userID[i].id,
            },
          });
        }
      } catch (error) {
        alert(error.message);
      }
    },
  },
  components: { AdminNavBarComponent },
};
</script>
