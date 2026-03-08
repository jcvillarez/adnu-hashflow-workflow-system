<style>
.admin-edit-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
} /* lock */
.admin-edit-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
} /* lock */

.admin-edit-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
} /* lock */

.admin-edit-frame {
  @apply flex flex-row items-start justify-center w-full h-[1px] grow mt-[20px] gap-10;
}

.admin-edit-frame > .edit {
  @apply flex flex-col items-start gap-5 text-[13px] p-[30px] w-[50%];
}
.admin-edit-frame > .edit > div {
  @apply flex flex-col items-start font-bold;
}
.admin-edit-frame > .edit > div > span {
  @apply font-normal text-[16px];
}
.admin-edit-frame > .edit > input,
.admin-edit-frame > .edit > select {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full;
}
.admin-edit-frame > .edit > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}
.admin-edit-frame > .edit > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}
</style>

<template>
  <div class="admin-edit-body">
    <AdminNavBarComponent />
    <div class="admin-edit-content">
      <span>Organization Profile</span>

      <div class="admin-edit-frame">
        <form class="edit" @submit.prevent="onSignup()">
          <input
            placeholder="Organization Name"
            type="string"
            required
            v-model="orgName"
          />
          <input
            placeholder="Address"
            type="string"
            required
            v-model="address"
          />
          <input placeholder="Email" type="email" required v-model="username" />
          <input
            placeholder="Contact Number"
            type="string"
            required
            v-model="contact"
          />
          <button @click="editOrgProfile()">Update Profile</button>
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
  data() {
    return {
      orgName: "",
      address: "",
      username: "",
      contact: "",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async editOrgProfile() {
      try {
        const OrgProfile = Parse.Object.extend("OrgProfile");
        const OrganizationId = this.$route.query.organizationId;
        const org = new OrgProfile();
        org.set("id", OrganizationId);
        org.set("orgName", this.orgName);
        org.set("address", this.address);
        org.set("username", this.username);
        org.set("contact", this.contact);

        org.save();

        alert("Successfully Edited Organization Profile");
        const User = Parse.Object.extend("_User");
        const user = new Parse.Query(User);
        const userID = await user.find();
        const count = await user.count();
        for (let i = 0; i < count; i++) {
          this.$router.push({
            name: "admin",
            query: {
              id: userID[i].id,
            },
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mounted: async function () {
    const OrgProfile = Parse.Object.extend("OrgProfile");
    const query = new Parse.Query(OrgProfile);
    const OrganizationId = this.$route.query.organizationId;
    const entry = await query.get(OrganizationId);

    this.orgName = entry.get("orgName");
    this.address = entry.get("address");
    this.username = entry.get("username");
    this.contact = entry.get("contact");
  },
  components: { AdminNavBarComponent },
};
</script>
