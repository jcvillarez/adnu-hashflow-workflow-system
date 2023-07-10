<style>
.signup-org-body {
  @apply bg-[url('@/assets/background-images/admin.jpg')] bg-cover bg-fixed bg-no-repeat font-['Inter'] h-[100vh] min-h-[1000px] min-w-[800px];
} /* lock */
.signup-org-content {
  @apply flex flex-col grow h-full items-center justify-start;
} /* lock */

.signup-org-frame {
  @apply flex flex-col items-center justify-center gap-3 w-[500px] my-auto;
}

.signup-org-frame > form,
.signup-org-frame > div {
  @apply border-[1px] border-[#aaa] flex flex-col items-center justify-center gap-3 p-[30px] w-full h-full;
}

.signup-org-frame > form > img {
  @apply w-[100px] h-auto mb-[20px];
}
.signup-org-frame > form > input,
.signup-org-frame > form > select {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full h-[40px];
}

.signup-org-frame > form > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full rounded-[5px];
}
.signup-org-frame > form > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.signup-org-frame > form > .gender-choice-container {
  @apply flex flex-row items-center justify-center gap-5 w-full;
}
.signup-org-frame > form > .gender-choice-container > div {
  @apply flex items-center gap-1;
}

.signup-org-frame > form > .gender-choice-container > div > input,
.signup-org-frame > form > .gender-choice-container > div > label {
  @apply my-auto font-normal text-[13px];
}

.signup-org-frame > div > span > a {
  @apply text-[#F18642];
}
</style>

<template>
  <div class="signup-org-body">
    <div class="signup-org-content">
      <div class="signup-org-frame">
        <form @submit.prevent="createUser()">
          <img src="@/assets/hashflow-logo.png" />
          <span class="w-full text-left font-bold">Organization Name</span>
          <input required v-model="orgName" type="name" />
          <span class="w-full text-left font-bold">Organization Email</span>
          <input required v-model="orgEmail" type="name" />
          <span class="w-full text-left font-bold">Permanent Address</span>
          <input required v-model="address" type="text" />
          <span class="w-full text-left font-bold"
            >Contact Number of Organization</span
          >
          <input required v-model="contact" type="text" />
          <span class="w-full text-left font-bold">Name of Requestor</span>
          <input required v-model="name" type="name" />
          <input
            v-for="(input, index) in approvers"
            :key="index"
            required
            v-model="input.approver"
            type="hidden"
          />
          <div class="text-left w-full text-[13px] text-[#aaa]">
            Upload an Organization Permit (PDF)
          </div>
          <div
            class="flex flex-col gap-3 border-[1px] border-[#aaa] p-[10px] w-full"
          >
            <input
              class="w-full text-[13px]"
              required
              id="pdfUpload"
              accept=".pdf"
              multiple="true"
              @change="handleFileUpload"
              type="file"
            />
          </div>
          <button>Submit</button>
        </form>

        <div>
          <span>Already have an account? <a href="/login">Sign in</a></span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <div v-if="initiationMessage">
    <LoaderView v-bind:initiationMessage="initiationMessage" />
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added
import LoaderView from "@/components/LoaderView.vue";
import Footer from "@/components/FooterComponent.vue";

import Parse from "parse";

export default {
  name: "SignupAdminView",
  components: { LoaderView,Footer },
  data() {
    return {
      initiationMessage: "",
      approvers: [{ approver: "" }],
      orgEmail: "",
      name: "",
      address: "",
      contact: "",
      orgName: "",
      userFile: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      const fileType = file.type;

      if (fileType !== "application/pdf") {
        alert("Please upload a PDF file.");
        this.$refs.fileInput.value = "";
        return;
      }
    },
    async createUser() {
      try {
        // check if orgName already exists
        const ExistingOrg = Parse.Object.extend("PendingAdminAccount");
        const query = new Parse.Query(ExistingOrg);
        query.equalTo("orgName", this.orgName);
        const result = await query.first();
        if (result) {
          alert("An account with this organization name already exists.");
          return;
        }

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
          async (savedFiles) => {
            const userAccount = new Parse.Object.extend("PendingAdminAccount");

            const useraccount = new userAccount();

            useraccount.set("orgName", this.orgName);
            useraccount.set("orgEmail", this.orgEmail);
            useraccount.set("requestor", this.name);
            useraccount.set(
              "approvers",
              this.approvers.map(() => {
                return {
                  email: "hashfloww@gmail.com",
                  status: "Pending",
                  role: "Approver",
                  children: [],
                };
              })
            );
            useraccount.set("userFile", savedFiles);
            useraccount.set("address", this.address);
            useraccount.set("contact", this.contact);
            useraccount.set("role", this.userRole);
            useraccount.save().then(async () => {
              const user = Parse.Object.extend("PendingAdminAccount");
              const query = new Parse.Query(user);
              const entry = await query.first();
              const date = entry.createdAt.toLocaleDateString();
              const file = entry.get("userFile").map((obj) => {
                return {
                  name: obj.name().substring(obj.name().indexOf("_") + 1),
                  url: obj.url(),
                };
              });
              await Parse.Cloud.run("sendApplicationEmail", {
                orgName: this.orgName,
                orgEmail: this.orgEmail,
                date: date,
                address: this.address,
                file: file,
              });
              await Parse.Cloud.run("sendHashflowEmail", {
                name: this.name,
                orgName: this.orgName,
                orgEmail: this.orgEmail,
                date: date,
                address: this.address,
                file: file,
              });
              this.initiationMessage = "It is done.";
              this.$router.push({
                name: "SignUpAdminPending",
                query: {
                  id: useraccount.id,
                },
              });
            });
          }
        );
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>
