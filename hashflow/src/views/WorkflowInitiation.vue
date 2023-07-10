<template>
  <div class="indv-create-body">
    <NavBarComponent />
    <div class="indv-create-content">
      <span>Create Custom Workflow</span>

      <form
        class="indv-create-table-frame"
        @submit.prevent="initiateWorkflow"
        method="post"
      >
        <span>Process Name</span>
        <input
          id="processNameInput"
          type="text"
          required
          v-model="processName"
          @focus="showProcessNameByTextbox = true"
          @blur="showProcessNameByTextbox = false"
        />
        <div v-if="showProcessNameByTextbox">
          Process name is the organizational process of the organization where
          workflow will be created for.
        </div>
        <span>Description</span>
        <div ref="editor">
          <textarea type="string" v-model="message"></textarea>
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
import NavBarComponent from "@/components/NavBarComponent.vue";
import Parse from "parse";
export default {
  name: "WorkflowInitiation",
  components: {
    NavBarComponent,
  },
  data() {
    return {
      processName: "",
      message: "",
      userFile: [],
      showProcessNameByTextbox: false,
    };
  },
  mounted() {
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
          Promise.all(userFile.map((file) => file.save())).then(
            (savedFiles) => {
              // Check if the process already exists in the template object
              const customTemplate = Parse.Object.extend("Workflow_Template");
              // Process does not exist, create a new instance and save it
              const template = new customTemplate();
              template.set("userInitiated", currentUser);
              template.set("processName", this.processName);
              template
                .save()
                .then(() => {
                  const Workflow = new Parse.Object.extend(
                    "Workflow_Initiation_History"
                  );
                  const workflow = new Workflow();
                  workflow.set("userInitiated", currentUser);
                  workflow.set("processName", this.processName);
                  workflow.set("message", this.message);
                  workflow.set("userFile", savedFiles);
                  workflow.save().then(async () => {
                    const Workflow = Parse.Object.extend(
                      "Workflow_Initiation_History"
                    );
                    const query = new Parse.Query(Workflow);
                    const queryId = await query.find();
                    const count = await query.count();
                    for (let i = 0; i < count; i++) {
                      this.$router.push({
                        name: "TreeStructure",
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
            }
          );
        } else {
          this.$router.push({ name: "LoginView" });
        }
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>
<style>
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.snow.css";

.indv-create-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
} /* lock */
.indv-create-content {
  @apply flex flex-col items-start justify-start grow w-full max-w-[1280px] py-[30px];
} /* lock */

.indv-create-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
} /* lock */

.indv-create-table-frame {
  @apply flex flex-col items-start justify-start gap-3 w-full grow;
}
.indv-create-table-frame > div {
  @apply flex flex-row w-full gap-3;
}
.indv-create-table-frame input,
.indv-create-table-frame > textarea {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full;
}
.indv-create-table-frame > textarea {
  @apply grow resize-none;
}
.indv-create-table-frame button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-[170px] rounded-[5px];
}
.indv-create-table-frame button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.login-frame > div > input {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full;
}
</style>
