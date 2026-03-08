<style>
.org-predefined-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
}

/* lock */
.org-predefined-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
}

/* lock */

.org-predefined-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
}

/* lock */

.org-predefined-table-frame {
  @apply overflow-auto w-full h-[1px] grow border-0;
}

.org-predefined-table-frame > table {
  @apply w-full;
}

.org-predefined-table-frame > table > tbody > tr {
  @apply border-b-[1px] border-b-[#aaa];
}

.org-predefined-table-frame > table > thead > tr > th {
  @apply text-[13px] p-[10px] font-bold sticky top-0 bg-white border-none;
}

.org-predefined-table-frame > table > tbody > tr > td {
  @apply text-left text-[13px] border-none p-[10px];
}

.org-predefined-table-frame > table > tbody > tr > td > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}

.org-predefined-table-frame > table > tbody > tr > td > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}
</style>

<template>
  <div class="org-predefined-body">
    <OrgNavBarComponent />
    <div class="org-predefined-content">
      <span>Pre-Defined Workflow</span>

      <div class="org-predefined-table-frame">
        <table>
          <thead>
            <tr>
              <th>Process Name</th>
              <th>Parent Office</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="template in templates" :key="template">
              <td>{{ template.processName }}</td>
              <td>{{ template.parentOffice }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'orgEditPredefinedWorkflow',
                    query: { workflowId: template.id },
                  }"
                >
                  <button>Select</button>
                </router-link>
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

import OrgNavBarComponent from "@/components/OrgNavBarComponent.vue";
import Parse from "parse";
export default {
  name: "OrgPredefinedWorkflowAdmin",
  components: { OrgNavBarComponent },
  data() {
    return {
      templates: [],
    };
  },
  mounted: async function () {
    try {
      const orgName = Parse.User.current().get("orgName");

      const template = new Parse.Query("PredefinedWorkflow");
      template.equalTo("orgName", orgName);

      const results = await template.find();
      var count = await template.count();
      if (count != 0) {
        for (let i = 0; i < count; i++) {
          this.templates.push({
            id: results[i].id,
            processName: results[i].get("processName"),
            parentOffice: results[i].get("parentOffice"),
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
</script>
