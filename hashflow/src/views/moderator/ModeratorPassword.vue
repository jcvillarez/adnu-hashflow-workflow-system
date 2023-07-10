<style>
.org-popup-password-body {
  @apply font-['Inter'] bg-black/80 h-[100vh] flex flex-col w-full overflow-y-auto;
}
.org-popup-password-content {
  @apply flex flex-col items-center justify-center grow;
}
.org-popup-password-frame {
  @apply flex flex-col gap-3 bg-white p-[30px] w-[360px];
}

.org-popup-password-frame > span {
  @apply font-bold;
}
.org-popup-password-frame > input {
  @apply border-[1px] border-[#aaa] p-[10px];
}
.org-popup-password-frame > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}
.org-popup-password-frame > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}
</style>

<template>
  <div class="org-popup-password-body">
    <div class="org-popup-password-content">
      <div class="org-popup-password-frame">
        <span>Password</span>
        <input placeholder="Password" type="password" v-model="password" />
        <button @click="verifyPassword()">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css";
import Parse from "parse";
import { HybridTree } from "@/hybrid_tree.js";

export default {
  name: "PasswordView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async verifyPassword() {
      try {
        const currentUser = Parse.User.current();
        const currentEmail = await currentUser.getUsername();
        const verifyPassword = await Parse.User.verifyPassword(
          currentEmail,
          this.password
        );

        if (verifyPassword) {
          const PendingAdminAccount = new Parse.Object.extend(
            "PendingAdminAccount"
          );
          const query = new Parse.Query(PendingAdminAccount);
          const id = this.$route.query.approvalId;
          const workflow = await query.get(id);
          let approvers = workflow.get("approvers");

          const currentUser = Parse.User.current();
          const currentEmail = await currentUser.getUsername();

          let tree = new HybridTree(approvers);
          // Check if the current user has a child node
          tree.setStatus(
            currentEmail,
            this.$route.query.verdict,
            this.$route.query.comment
          );

          workflow.set("approvers", tree.toJson());
          workflow.save();

          alert("Successfully Verified!");
          this.$router.push("/moderatorDashboard");
        }
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>
