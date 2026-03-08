<style>
.indv-popup-comment-body {
  @apply font-['Inter'] bg-black/80 h-[91vh] flex flex-col w-full overflow-y-auto;
}
.indv-popup-comment-content {
  @apply flex flex-col items-center justify-center grow;
}
.indv-popup-comment-frame {
  @apply flex flex-col gap-3 bg-white p-[30px] w-[360px];
}

.indv-popup-comment-frame > div {
  @apply flex flex-col items-center justify-center text-[13px];
}
.indv-popup-comment-frame > div > span {
  @apply text-left font-bold w-full;
}
.indv-popup-comment-frame > div > .comment-list {
  @apply w-full text-left p-[10px] border-[1px] border-[#aaa];
}
</style>

<template>
  <NavBarComponent />
  <div class="indv-popup-comment-body">
    <div class="indv-popup-comment-content">
      <div
        class="indv-popup-comment-frame"
        v-for="comment in comments"
        :key="comment"
      >
        <span>Comment</span>
        <div>
          <span
            >From: <span class="font-normal">{{ comment.email }}</span></span
          >
          <div class="comment-list">
            <p>{{ comment.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css";

import Parse from "parse";
import { HybridTree } from "@/hybrid_tree.js";
import NavBarComponent from "@/components/NavBarComponent.vue";
export default {
  name: "OrgComment",
  data() {
    return {
      comments: [],
    };
  },
  components: {
    NavBarComponent,
  },
  mounted: async function () {
    const currentUser = Parse.User.current();
    if (currentUser == null) {
      this.$router.push({ name: "home" });
    } else {
      try {
        const Org_Workflow_Initiation_History = Parse.Object.extend(
          "Workflow_Initiation_History"
        );
        const userQuery = new Parse.Query(Org_Workflow_Initiation_History);
        const reviseId = this.$route.query.reviseId;
        const result = await userQuery.get(reviseId);

        const approvers = result.get("approvers");
        const tree = new HybridTree(approvers);

        this.comments = tree.getComments();
      } catch (error) {
        console.log(error.message);
      }
    }
  },
};
</script>
