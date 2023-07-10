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
    <ModeratorNavBar />
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
            name: 'ModeratorNotification',
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
import ModeratorNavBar from "@/components/ModeratorNavBar.vue";
import Parse from "parse";
import { HybridTree } from "@/hybrid_tree.js";

export default {
  data() {
    return {
      approvals: [],
    };
  },
  methods: {
    async deleteAllApprovals() {
      try {
        const confirmed = confirm(
          "Are you sure you want to delete all notifications? Changes cannnot be saved."
        );
        if (confirmed) {
          const PendingAdminAccount = Parse.Object.extend(
            "PendingAdminAccount"
          );
          const pending = new Parse.Query(PendingAdminAccount);
          const userResults = await pending.find();

          // Delete all the approvals from the database
          await Parse.Object.destroyAll(userResults);
        }

        // Clear the approvals list
        this.approvals = [];
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  async mounted() {
    try {
      const email = Parse.User.current().get("username");
      const PendingAdminAccount = Parse.Object.extend("PendingAdminAccount");
      const pending = new Parse.Query(PendingAdminAccount);
      const userResults = await pending.find();

      if (userResults.length != 0) {
        for (let i = 0; i < userResults.length; i++) {
          const approvers = userResults[i].get("approvers");
          const tree = new HybridTree(approvers);

          const status = tree.getStatus(email);
          const role = tree.getRole(email);

          if (status != "Hidden") {
            this.approvals.push({
              id: userResults[i].id,
              orgName: userResults[i].get("orgName"),
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
  components: { ModeratorNavBar },
};
</script>
