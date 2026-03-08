<style>
.org-edit-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
} /* lock */
.org-edit-content {
  @apply flex flex-col items-start justify-start grow w-full max-w-[1280px] py-[30px];
} /* lock */

.org-edit-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
} /* lock */

.org-edit-table-frame {
  @apply flex flex-col items-start justify-start gap-3 w-full grow;
}
.org-edit-table-frame > div {
  @apply flex flex-row w-full gap-3;
}
.org-edit-table-frame input,
.org-edit-table-frame > textarea {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full;
}
.org-edit-table-frame > textarea {
  @apply grow resize-none;
}
.org-edit-table-frame button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-[170px] rounded-[5px];
}
.org-edit-table-frame button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.login-frame > div > input {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full;
}

@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.snow.css";
</style>

<template>
  <div class="org-edit-body">
    <OrgNavBarComponent />
    <div class="org-edit-content">
      <span>Edit Recent Workflow</span>

      <form
        class="org-edit-table-frame"
        @submit.prevent="initiateWorkflow"
        method="post"
      >
        <span>Process Name</span>
        <input type="text" required v-model="processName" disabled />
        <span>Description</span>
        <div ref="editor">
          <textarea type="text" v-model="message"></textarea>
        </div>
        <span>Upload Document/s (PDF)</span>
        <div>
          <input
            type="file"
            id="pdfUpload"
            accept=".pdf"
            multiple="true"
            required
          />
          <button type="submit">Create Workflow</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added
import Quill from "quill";
import OrgNavBarComponent from "@/components/OrgNavBarComponent.vue";
import Parse from "parse";

export default {
  data() {
    return {
      processName: "",
      message: "",
      userFile: [],
    };
  },
  methods: {
    handleEditorChange() {
      const editorContent = this.editor.root.innerHTML;
      const divElement = document.createElement("div");
      divElement.innerHTML = editorContent;
      this.message = divElement.innerText;
    },
    updateDescription() {
      const divElement = document.createElement("div");
      divElement.innerText = this.message;
      this.editor.root.innerHTML = divElement.innerHTML;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const fileType = file.type;
      const fileName = file.name;

      // Check for invalid characters in filename
      const invalidChars = /[/?*:;{}\\]+/;
      if (invalidChars.test(fileName)) {
        alert("The filename contains invalid characters.");
        this.$refs.fileInput.value = "";
        return;
      }

      if (fileType !== "application/pdf") {
        alert("Please upload a PDF file.");
        this.$refs.fileInput.value = "";
        return;
      }
    },
    initiateWorkflow() {
      const currentUser = Parse.User.current();
      try {
        if (currentUser != null) {
          const userUploadControl = document.getElementById("pdfUpload");
          if (!userUploadControl) {
            alert("File input element not found.");
            return;
          }
          const files = userUploadControl.files;
          if (!files || files.length === 0) {
            alert("Please upload at least one PDF file.");
            return;
          }
          const userFile = [];
          for (let i = 0; i < files.length; i++) {
            const name = files[i].name;
            const parseFile = new Parse.File(name, files[i]);
            parseFile.save();
            userFile.push(parseFile);
          }
          Promise.all(userFile.map((file) => file.save()))
            .then((savedFiles) => {
              const WorkflowTemplate = Parse.Object.extend(
                "Org_Workflow_Initiation_History"
              );
              const workflow = new WorkflowTemplate();
              workflow.set("userInitiated", currentUser);
              workflow.set("processName", this.processName);
              workflow.set("message", this.message);
              workflow.set("userFile", savedFiles);
              workflow.save().then(async () => {
                const Workflow = Parse.Object.extend(
                  "Org_Workflow_Initiation_History"
                );
                const query = new Parse.Query(Workflow);
                const queryId = await query.find();
                const count = await query.count();
                for (let i = 0; i < count; i++) {
                  this.$router.push({
                    name: "OrgRecentTreeStructure",
                    query: {
                      id: queryId[i].id,
                    },
                  });
                }
              });
            })
            .catch((error) => {
              console.log({ error });
            });
        } else {
          this.$router.push({ name: "LoginView" });
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mounted: async function () {
    const WorkflowTemplate = Parse.Object.extend("Org_Workflow_Template");
    const query = new Parse.Query(WorkflowTemplate);
    const WorkflowId = this.$route.query.workflowId;
    const entry = await query.get(WorkflowId);

    this.processName = entry.get("processName");

    this.editor = new Quill(this.$refs.editor, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
        ],
      },
    });
    this.editor.on("text-change", this.handleEditorChange);
    ("");
  },
  components: { OrgNavBarComponent },
};
</script>
