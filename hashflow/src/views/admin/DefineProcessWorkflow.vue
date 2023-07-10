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
      <span>Define Process and Workflow</span>

      <div class="admin-define-frame">
        <form class="define" @submit.prevent="createTemplate()">
          <input
            ref="processNameInput"
            placeholder="Process Name"
            type="string"
            required
            v-model="processName"
          />
          <div v-if="showTextbox">
            Process name is the organizational process of the organization where
            workflow will be created for.
          </div>
          <input
            placeholder="Parent Office"
            type="string"
            required
            v-model="parentOffice"
          />
          <button>Create Workflow Structure</button>
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
  name: "DefineProcessWorkflow",
  components: { AdminNavBarComponent },
  data() {
    return {
      processName: "",
      parentOffice: "",
      showTextbox: false,
      processCount: 0,
    };
  },
  mounted() {
    const processNameInput = this.$refs.processNameInput;
    processNameInput.addEventListener("focus", () => {
      this.showTextbox = true;
    });
    processNameInput.addEventListener("blur", () => {
      this.showTextbox = false;
    });
  },
  methods: {
    async createTemplate() {
      try {
        if (this.processCount >= 5) {
          alert("Maximum number of processes reached.");
          return;
        }

        const currentUser = Parse.User.current();
        const workflowTemplate = new Parse.Object.extend("PredefinedWorkflow");
        const query = new Parse.Query(workflowTemplate);

        // Add a filter to check if the process name already exists
        query.equalTo("processName", this.processName);
        const existingTemplate = await query.first();

        if (existingTemplate) {
          alert("Process already exists.");
          return;
        }

        const admin = Parse.Object.extend("_User");
        const orgName = Parse.User.current().get("orgName");
        const adminQuery = new Parse.Query(admin);
        adminQuery.equalTo("orgName", orgName);
        const adminAccount = await adminQuery.find();
        const count = await adminQuery.count();
        const template = new workflowTemplate();
        for (let i = 0; i < count; i++) {
          const adminOrgName = adminAccount[i].get("orgName");
          template.set("orgName", adminOrgName);
        }
        template.set("userInitiated", currentUser);
        template.set("processName", this.processName);
        template.set("parentOffice", this.parentOffice);
        template.save().then(async () => {
          const Workflow = Parse.Object.extend("PredefinedWorkflow");
          const query = new Parse.Query(Workflow);
          const queryId = await query.find();
          const count = await query.count();
          for (let i = 0; i < count; i++) {
            this.$router.push({
              name: "AdminDefineTreeStructure",
              query: {
                id: queryId[i].id,
              },
            });
          }
          this.processCount += 1;
        });
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>
