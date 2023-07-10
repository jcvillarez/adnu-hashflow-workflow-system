<style>
.org-process-workflow-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
}

/* lock */
.org-process-workflow-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
}

/* lock */

.org-process-workflow-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
}

/* lock */

.org-process-workflow-table-frame {
  @apply overflow-auto w-full h-[1px] grow border-y-[1px] border-[#ccc];
}

.org-process-workflow-table-frame > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-[30%] m-[20px];
}

.org-process-workflow-table-frame > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.org-process-workflow-table-frame > table {
  @apply w-full;
}

.org-process-workflow-table-frame > table > tbody > tr {
  @apply border-b-[1px] border-b-[#aaa];
}

.org-process-workflow-table-frame > table > thead > tr > th {
  @apply text-[13px] p-[10px] font-bold sticky top-0 bg-white border-none;
}

.org-process-workflow-table-frame > table > tbody > tr > td {
  @apply text-left text-[13px] p-[10px];
}

.org-process-workflow-table-frame > table > tbody > tr > td > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}

.org-process-workflow-table-frame > table > tbody > tr > td > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}
</style>

<template>
  <div class="org-process-workflow-body">
    <AdminNavBarComponent />
    <div class="org-process-workflow-content">
      <span>Process Workflow</span>

      <div class="org-process-workflow-table-frame">
        <table v-for="template in templates" :key="template">
          <thead>
            <tr>
              <th>Process Name</th>
              <th>Parent Office</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="w-[500px]">{{ template.processName }}</td>
              <td class="w-[500px]">{{ template.parentOffice }}</td>
              <td class="flex flex-row gap-[5px] justify-end">
                <router-link
                  :to="{
                    name: 'ViewProcessWorkflow',
                    query: { templateId: template.id },
                  }"
                >
                  <button class="w-[150px] rounded-[5px]">View Process</button>
                </router-link>
                <router-link
                  :to="{
                    name: 'EditProcessWorkflow',
                    query: { templateId: template.id },
                  }"
                >
                  <button
                    class="w-[150px] rounded-[5px] bg-[#037ffc] border-[#037ffc] hover:text-[#037ffc] hover:border-[#037ffc]"
                  >
                    Edit Process
                  </button>
                </router-link>
                <button
                  class="w-[150px] rounded-[5px] bg-[red] border-[red] hover:text-[red] hover:border-[red]"
                  @click="deleteTemplate(template.id)"
                >
                  Delete Process
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="rounded-[5px]" @click="processWorkflow">
          Create Process Workflow
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavBarComponent from "@/components/AdminNavBarComponent.vue";
import "/src/assets/tailwind.css"; // added

import Parse from "parse";
export default {
  name: "ProcessWorkflow",
  components: { AdminNavBarComponent },
  data() {
    return {
      templates: [],
    };
  },
  methods: {
    processWorkflow() {
      this.$router.push({ name: "DefineProcessWorkflow" });
    },
    async deleteTemplate(id) {
      try {
        const template = new Parse.Object("PredefinedWorkflow");

        template.set("id", id);

        await template.destroy();

        this.templates = this.templates.filter(
          (template) => template.id !== id
        );
      } catch (error) {
        console.log(error.message);
      }
    },
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
