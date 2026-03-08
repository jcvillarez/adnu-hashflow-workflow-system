<style>
.org-popup-comment-body {
  @apply font-['Inter'] bg-black/80 h-[100vh] flex flex-col w-full overflow-y-auto;
}

.org-popup-comment-content {
  @apply flex flex-col items-center justify-center grow;
}

.org-popup-comment-frame {
  @apply flex flex-col gap-3 bg-white p-[30px] w-[360px];
}

.org-popup-comment-frame > div {
  @apply flex flex-col items-center justify-center text-[13px];
}

.org-popup-comment-frame > div > span {
  @apply text-left font-bold w-full;
}

.org-popup-comment-frame > div > .comment-list {
  @apply w-full text-left p-[10px] border-[1px] border-[#aaa];
}
</style>

<template>
  <OrgNavBarComponent />
  <div class="org-popup-comment-body">
    <div class="org-popup-comment-content">
      <div class="org-popup-comment-frame" v-for="email in emails" :key="email">
        <div>
          <span v-if="email.status != 'Approved' && email.role == 'Acknowledger'">Waiting to be Acknowledged by:</span>
          <span v-if="email.status != 'Approved' && email.role == 'Endorser'">Waiting to be Endorsed by:</span>
          <span
            v-if="
              (email.status != 'Approved' && email.role == 'Approver' && email.status != 'Revise')
            "
            >Waiting for the Approval of:</span
          >
          <span v-if="email.status == 'Approved' && email.role == 'Approver'">
            Approved by:</span
          >
          <span
            v-if="email.status == 'Approved' && email.role == 'Acknowledger'"
          >
            Acknowledged By:
          </span>
          <span v-if="email.status == 'Approved' && email.role == 'Endorser'">
            Endorsed By:
          </span>
          <span v-if="email.status == 'Revise' && email.role == 'Approver'"
            >Revised by:</span
          >
          <span v-if="email.status == 'Reject' && email.role == 'Approver'">
            Rejected by:
          </span>
          <div class="comment-list" v-if="email.role">
            <p>{{ email.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css";

import OrgNavBarComponent from "@/components/OrgNavBarComponent.vue";
import Parse from "parse";
import { HybridTree } from "@/hybrid_tree.js";
export default {
  name: "OrgComment",
  data() {
    return {
      emails: [],
    };
  },
  components: {
    OrgNavBarComponent,
  },
  mounted: async function () {
    const currentUser = Parse.User.current();
    if (currentUser == null) {
      this.$router.push({ name: "LoginView" });
    } else {
      try {
        const Org_Workflow_Initiation_History = Parse.Object.extend(
          "Org_Workflow_Initiation_History"
        );
        const userQuery = new Parse.Query(Org_Workflow_Initiation_History);
        const progressId = this.$route.query.progressId;
        const result = await userQuery.get(progressId);

        const approvers = result.get("approvers");
        const tree = new HybridTree(approvers);

        this.emails = tree.getEmailProgress();
      } catch (error) {
        console.log(error.message);
      }
    }
  },
};
</script>
