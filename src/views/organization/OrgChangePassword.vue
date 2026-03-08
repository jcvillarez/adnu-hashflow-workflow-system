<style>
.admin-define-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
} /* lock */
.admin-define-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
} /* lock */

.admin-define-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
} /* lock */

.admin-define-frame {
  @apply flex flex-row items-start justify-center w-full h-[1px] grow mt-[20px] gap-10;
}

.admin-define-frame > .define {
  @apply flex flex-col items-start gap-5 text-[13px] p-[30px] w-[50%];
}
.admin-define-frame > .define > div {
  @apply flex flex-col items-start font-bold;
}
.admin-define-frame > .define > div > span {
  @apply font-normal text-[16px];
}
.admin-define-frame > .define > input,
.admin-define-frame > .define > select {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full;
}
.admin-define-frame > .define > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}
.admin-define-frame > .define > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.admin-define-frame > .define > .gender-choice-container {
  @apply flex flex-row items-center justify-center gap-5 w-full;
}
.admin-define-frame > .define > .gender-choice-container > div {
  @apply flex items-center gap-1;
}

.admin-define-frame > .define > .gender-choice-container > div > input,
.admin-define-frame > .define > .gender-choice-container > div > label {
  @apply my-auto font-normal text-[13px];
}
</style>

<template>
  <div class="admin-define-body">
    <OrgNavBarComponent/>
    <div class="admin-define-content">
      <span>Change Password</span>

      <div class="admin-define-frame">
        <form class="define" @submit.prevent="editPassword()">
          <input
            placeholder="Change Password"
            type="password"
            required
            v-model="changePassword"
          />
          <button>Change Password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added

import OrgNavBarComponent from "@/components/OrgNavBarComponent.vue";
import Parse from "parse";

export default {
  name: "DefineProcessWorkflow",
  components: { OrgNavBarComponent },
  data() {
    return {
      changePassword: "",
    };
  },
  methods: {
    async editPassword() {
      try {
        const userPassword = Parse.Object.extend("_User");
        const passwordId = this.$route.query.passwordId;
        const orgPassword = new userPassword();
        
        orgPassword.set("id", passwordId);
        orgPassword.set("password", this.changePassword);
        orgPassword.set("confirm_password", "");
        
        orgPassword.save();

        alert("Succesfully Changed Password!");
        this.$router.push({ name: "OrgProfile", query: { passwordId: passwordId } });
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>
