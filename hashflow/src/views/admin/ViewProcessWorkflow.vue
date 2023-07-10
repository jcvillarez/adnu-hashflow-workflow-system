<style>
.admin-define-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
}

/* lock */
.admin-define-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
}

/* lock */

.admin-define-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
}

/* lock */

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
    <AdminNavBarComponent />
    <div class="admin-define-content">
      <span>Edit Process and Workflow</span>

      <div class="admin-define-frame">
        <form class="define" @submit.prevent="viewTemplate()">
          <input
            placeholder="Process Name"
            type="string"
            required
            v-model="processName"
            disabled
          />
          <input
            placeholder="Parent Office"
            type="string"
            required
            v-model="parentOffice"
            disabled
          />
          <button>View Workflow Structure</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added

import AdminNavBarComponent from "@/components/AdminNavBarComponent.vue";
import Parse from "parse";

export default {
  name: "ViewProcessWorkflow",
  components: { AdminNavBarComponent },
  data() {
    return {
      processName: "",
      parentOffice: "",
    };
  },
  methods: {
    async viewTemplate() {
      const orgName = Parse.User.current().get("orgName");
      const PredefinedWorkflow = Parse.Object.extend("PredefinedWorkflow");
      const org = new Parse.Query(PredefinedWorkflow);
      org.equalTo("orgName", orgName);
      const queryResults = await org.find();
      const count = await org.count();

      for (let i = 0; i < count; i++) {
        this.$router.push({
          name: "AdminViewTreeStructure",
          query: {
            templateId: queryResults[i].id,
          },
        });
      }
    },
  },
  mounted: async function () {
    const PredefinedWorkflow = Parse.Object.extend("PredefinedWorkflow");
    const query = new Parse.Query(PredefinedWorkflow);
    const templateId = this.$route.query.templateId;
    const entry = await query.get(templateId);

    this.processName = entry.get("processName");
    this.parentOffice = entry.get("parentOffice");
  },
};
</script>
