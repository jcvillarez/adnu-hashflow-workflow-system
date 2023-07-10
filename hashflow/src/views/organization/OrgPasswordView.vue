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
  name: "OrgPasswordView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {
    this.verdict = this.$route.query.verdict;
    this.edit = this.$route.query.edit;
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
          const Workflow_Initiation_History = new Parse.Object.extend(
            "Org_Workflow_Initiation_History"
          );
          const query = new Parse.Query(Workflow_Initiation_History);
          const id = this.$route.query.orgApprovalId;
          const workflow = await query.get(id);
          const user = await workflow.get("userInitiated");
          let approver = workflow.get("approvers");

          const processName = workflow.get("processName");
          const firstname = await user.get("name");
          const date = workflow.createdAt.toLocaleDateString();
          const message = workflow.get("message");

          const file = workflow.get("userFile").map((obj) => {
            return {
              name: obj.name().substring(obj.name().indexOf("_") + 1),
              url: obj.url(),
            };
          });
          const approved = "Approved";
          const reject = "Reject";
          const revise = "Revise";

          const currentUser = Parse.User.current();
          const currentEmail = await currentUser.getUsername();

          let tree = new HybridTree(approver);
          // Check if the current user has a child node
          const currentUserNode = tree.findNode(currentEmail);
          const role = tree.getRole(currentEmail);
          if (
            currentUserNode &&
            currentUserNode.children.length > 0 &&
            role == "Approver" &&
            (this.verdict == "Approved" || (this.verdict == "Revise" && this.edit))
          ) {
            // Call the sendChildrenEmail Cloud Function
            await Parse.Cloud.run("sendChildrenEmail", {
              approver: currentUserNode.children,
              name: processName,
              date: date,
              message: message,
              file: file,
              firstname: firstname,
              id: id,
              approved: approved,
              reject: reject,
              revise: revise,
            });
          }
          tree.setStatus(
            currentEmail,
            this.$route.query.verdict,
            this.$route.query.comment
          );

          workflow.set("approvers", tree.toJson());
          workflow.save();

          alert("Successfully Verified!");
          this.$router.push("/orgDashboard");
        }
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>
