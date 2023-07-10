<style>
.admin-create-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
} /* lock */
.admin-create-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
} /* lock */

.admin-create-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
} /* lock */

.admin-create-frame {
  @apply flex flex-row items-start justify-center w-full h-[1px] grow mt-[20px] gap-10;
}

.admin-create-frame > form {
  @apply flex flex-col items-start gap-5 grow text-[13px] p-[30px] w-[50%];
}
.admin-create-frame > form > div {
  @apply flex flex-col items-start font-bold;
}
.admin-create-frame > form > div > span {
  @apply font-normal text-[16px];
}
.admin-create-frame > form > input,
.admin-create-frame > form > select {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full;
}
.admin-create-frame > form > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}
.admin-create-frame > form > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.admin-create-frame > .create > .gender-choice-container {
  @apply flex flex-row items-center justify-center gap-5 w-full;
}
.admin-create-frame > .create > .gender-choice-container > div {
  @apply flex items-center gap-1;
}

.admin-create-frame > .create > .gender-choice-container > div > input,
.admin-create-frame > .create > .gender-choice-container > div > label {
  @apply my-auto font-normal text-[13px];
}

.admin-create-frame > .upload {
  @apply flex flex-col items-start gap-5 grow text-[13px];
}
.admin-create-frame > .upload > a {
  @apply text-[red] font-bold;
}
.admin-create-frame > .upload > .preview {
  @apply flex flex-col items-start gap-5 grow text-[13px];
}
.admin-create-frame > .upload > .preview > table {
  @apply border-collapse w-full;
}
.admin-create-frame > .upload > .preview > table th,
.admin-create-frame > .upload > .preview > table td {
  @apply border border-[#aaa] py-[8px] px-[10px];
}
.admin-create-frame > .upload > .preview > table th {
  @apply font-bold bg-[#f2f2f2];
}
</style>

<template>
  <div class="admin-create-body">
    <AdminNavBarComponent />
    <div class="admin-create-content">
      <span>Create Bulk Account for Organization</span>
      <div class="admin-create-frame">
        <form class="upload" @submit.prevent="handleSubmit">
          <a
            href="https://docs.google.com/spreadsheets/d/1kTvsCuFi1ODfjYRGkJFl9d-bFFijbpwVqU34L56rSBQ/edit?usp=sharing"
            target="_blank"
            rel="noopener"
          >
            TemplateFile.csv
          </a>
          <span
            >Download and Edit the .csv File Template above in Google Excel and
            Upload it Here:</span
          >
          <input
            type="file"
            ref="fileInput"
            accept=".csv"
            style="display: none"
          />
          <button @click="FileUpload()">Upload File</button>
          <div class="preview" v-if="parsedData">
            <h3>Uploaded CSV File Content</h3>
            <table>
              <thead>
                <tr>
                  <th class="text-center">Username</th>
                  <th class="text-center">Name</th>
                  <th class="text-center">Address</th>
                  <th class="text-center">Contact Number</th>
                  <th class="text-center">Gender</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in parsedData.data" :key="index">
                  <td>{{ user.username }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.address }}</td>
                  <td>{{ user.contact_number }}</td>
                  <td>{{ user.gender }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button @click="clear()" v-if="parsedData != null">Clear</button>
          <button>Bulk Account Creation</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added

import Parse from "parse";
import * as Papa from "papaparse";
import AdminNavBarComponent from "@/components/AdminNavBarComponent.vue";

export default {
  data() {
    return {
      parsedData: null,
    };
  },
  mounted() {
    this.$refs.fileInput.addEventListener(
      "change",
      this.handleFileUpload.bind(this)
    );
  },
  methods: {
    clear() {
      this.parsedData = null;
      this.$refs.fileInput.value = null;
    },
    FileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];

      // Check if file is defined
      if (!file) {
        return;
      }
      const fileType = file.type;

      if (fileType !== "text/csv") {
        alert("Please upload a CSV file.");
        this.$refs.fileInput.value = null;
        return;
      }

      // Parse the CSV data for preview
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          this.parsedData = results;
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    },
    async handleSubmit() {
      // Get the uploaded CSV file from the file input element
      const file = this.$refs.fileInput.files[0];

      // Check if file is defined
      if (!file) {
        return;
      }

      // Use the PapaParse library to parse the CSV data
      const csvData = await new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results),
          error: (error) => reject(error),
        });
      });

      // Loop through the parsed data and create a new user account for each user
      for (const users of csvData.data) {
        const admin = Parse.Object.extend("_User");
        const orgName = Parse.User.current().get("orgName");
        const adminQuery = new Parse.Query(admin);
        adminQuery.equalTo("orgName", orgName);
        const adminAccount = await adminQuery.find();
        const count = await adminQuery.count();
        for (let i = 0; i < count; i++) {
          const adminOrgName = adminAccount[i].get("orgName");
          const user = new Parse.User();
          user.set("username", users.username);
          user.set("password", users.password);
          user.set("confirm_password", users.password);
          user.set("name", users.name);
          user.set("address", users.address);
          user.set("contact", users.contact_number);
          user.set("gender", users.gender);
          user.set("orgName", adminOrgName);
          user.set("archived", false);
          user.set("role", "orgUser");

          try {
            await user.signUp();
          } catch (error) {
            console.error(`Error creating user: ${error.message}`);
          }
        }
      }
      alert("Organization Account Successfully Created!");
      const User = Parse.Object.extend("_User");
      const userQuery = new Parse.Query(User);
      userQuery.equalTo("role", "orgUser");
      const users = await userQuery.find();
      for (const user of users) {
        const email = user.get("username");
        const password = user.get("confirm_password");
        const orgName = user.get("orgName");
        const address = user.get("address");
        const contact = user.get("contact");

        Parse.Cloud.run("sendOrganizationAccount", {
          email: email,
          password: password,
          orgName: orgName,
          address: address,
          contact: contact,
        });
      }

      const userID = users.map((user) => user.id);
      for (let i = 0; i < userID.length; i++) {
        this.$router.push({
          name: "admin",
          query: {
            id: userID[i],
          },
        });
      }
    },
  },
  components: { AdminNavBarComponent },
};
</script>
