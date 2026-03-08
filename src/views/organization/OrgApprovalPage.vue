<style>
.org-approvals-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
} /* lock */
.org-approvals-content {
  @apply flex flex-col items-center justify-start grow w-[1000px] max-w-[1280px] py-[30px];
} /* lock */
</style>

<template>
  <div class="org-approvals-body">
    <OrgNavBarComponent />
    <div class="org-approvals-content">
      <span>Pending Approvals</span>
      <div class="w-full flex justify-end px-[10px] pb-[10px]">
        <button @click="deleteAllApprovals" class="rounded-[5px]">
          Delete All
        </button>
      </div>

      <div
        class="overflow-auto w-full h-[1px] grow border-y-[1px] border-y-[#aaa]"
        v-for="approval in approvals"
        :key="approval.id"
      >
        <router-link
          class="cursor-pointer hover:no-underline"
          :to="{
            name: 'orgNotifications',
            query: {
              approvalId: approval.id,
              statusId: approval.status,
              rolesId: approval.roles,
            },
          }"
        >
          <div
            class="border-y-[1px] border-y-[#ccc] border-l-[5px] border-l-[none] hover:border-l-[5px] hover:border-l-[#F18642] flex gap-5 py-[10px]"
          >
            <div class="flex flex-row gap-5">
              <div>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
                  class="w-auto h-[80px]"
                  alt="user"
                />
              </div>

              <div class="notification-list_detail flex flex-col items-start">
                <span class="text-[20px]"
                  ><p>
                    {{ approval.status }} <b>{{ approval.orgName }}</b> Request
                  </p></span
                >
                <p class="text-muted" v-if="approval.status == 'Pending'">
                  Requesting for Account in the System.
                </p>
                <p class="text-muted" v-if="approval.status == 'Approved'">
                  Account Creation in the System
                </p>
                <p class="text-muted" v-if="approval.status == 'Pending'">
                  <small>10 mins ago</small>
                </p>
                <p class="text-muted" v-if="approval.status == 'Approved'">
                  <small>10 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="text-center">
        <a href="#!" class="dark-link">Load more activity</a>
      </div>
    </div>
  </div>
</template>
<script>
import OrgNavBarComponent from "@/components/OrgNavBarComponent.vue";
import Parse from "parse";
import { HybridTree } from "@/hybrid_tree.js";

export default {
  data() {
    return {
      approvals: [],
    };
  },
  async mounted() {
    try {
      const email = Parse.User.current().get("username");
      const Workflow_Initiation_History = Parse.Object.extend(
        "Org_Workflow_Initiation_History"
      );
      const approver = new Parse.Query(Workflow_Initiation_History);
      const approverResults = await approver.find();

      if (approverResults.length != 0) {
        for (let i = 0; i < approverResults.length; i++) {
          const approvers = approverResults[i].get("approvers");
          const tree = new HybridTree(approvers);

          const status = tree.getStatus(email);
          const role = tree.getRole(email);

          if (status != "Hidden") {
            this.approvals.unshift({
              id: approverResults[i].id,
              initiated: approverResults[i].get("userID"),
              date: approverResults[i].createdAt.toLocaleDateString(),
              process: approverResults[i].get("processName"),
              description: approverResults[i].get("message"),
              status: status,
              roles: role,
            });
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  components: { OrgNavBarComponent },
};
</script>
