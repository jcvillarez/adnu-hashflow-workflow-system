<style>
.org-recent-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
}

/* lock */
.org-recent-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
}

/* lock */

.org-recent-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
}

/* lock */

.org-recent-table-frame {
  @apply overflow-auto w-full h-[1px] grow border-0;
}

.org-recent-table-frame > table {
  @apply w-full;
}

.org-recent-table-frame > table > tbody > tr {
  @apply border-b-[1px] border-b-[#aaa];
}

.org-recent-table-frame > table > thead > tr > th {
  @apply text-[13px] p-[10px] font-bold sticky top-0 bg-white border-none;
}

.org-recent-table-frame > table > tbody > tr > td {
  @apply text-left text-[13px] border-none p-[10px];
}

.org-recent-table-frame > table > tbody > tr > td > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}

.org-recent-table-frame > table > tbody > tr > td > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}
</style>

<template>
  <div class="org-recent-body">
    <NavBarComponent />
    <div class="org-recent-content">
      <span>Recently Initiated Workflow</span>

      <div class="org-recent-table-frame">
        <table>
          <thead>
            <tr>
              <th>Process Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="template in templates" :key="template">
              <td>{{ template.processName }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'editRecentWorkflow',
                    query: { workflowId: template.id },
                  }"
                >
                  <button class="rounded-[5px]">Select</button>
                </router-link>
              </td>
              <td>
                <button
                  class="rounded-[5px]"
                  @click="deleteWorkflow(template.id)"
                >
                  Delete Workflow
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added

import NavBarComponent from "@/components/NavBarComponent.vue";
import Parse from "parse";

export default {
  name: "OrgRecentWorkflow",
  components: { NavBarComponent },
  data() {
    return {
      templates: [],
    };
  },
  methods: {
    async deleteWorkflow(templateId) {
      try {
        const Workflow_Initiation_History =
          Parse.Object.extend("Workflow_Template");
        const query = new Parse.Query(Workflow_Initiation_History);
        const workflow = await query.get(templateId);
        await workflow.destroy();
        // Remove the canceled workflow from the workflowTables array
        this.templates = this.templates.filter(
          (template) => template.id !== templateId
        );
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mounted: async function () {
    try {
      const template = new Parse.Query("Workflow_Template");

      const currentUser = Parse.User.current();
      template.equalTo("userInitiated", currentUser);

      const results = await template.find();
      var count = await template.count();
      if (count != 0) {
        for (let i = 0; i < count; i++) {
          const id = results[i].id;
          const processName = results[i].get("processName");

          this.templates.unshift({
            id: id,
            processName: processName,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
</script>
