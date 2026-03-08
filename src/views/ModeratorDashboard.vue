<style>
.signup-org-body {
  @apply bg-[url('../assets/background-images/admin.jpg')] bg-cover bg-fixed bg-no-repeat font-['Inter'] h-[90vh] min-w-[800px];
} /* lock */
.signup-org-content {
  @apply flex flex-col grow h-full items-center justify-start;
} /* lock */

.signup-org-frame {
  @apply flex flex-col items-center justify-center gap-3 w-[350px] my-auto;
}

.signup-org-frame > form,
.signup-org-frame > div {
  @apply border-[1px] border-[#aaa] flex flex-col items-center justify-center gap-3 p-[30px] w-full mb-auto mt-auto;
}

.signup-org-frame > form > img {
  @apply w-[100px] h-auto mb-[20px];
}
.signup-org-frame > form > input,
.signup-org-frame > form > select {
  @apply border-[1px] border-[#aaa] text-[15px] p-[12px] w-full;
}
.signup-org-frame > form > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
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
  <ModeratorNavBar />
  <div class="signup-org-body">
    <div class="signup-org-content">
      <div class="signup-org-frame">
        <form @submit.prevent="createUser()" action="/create-user" method="get">
          <img src="../assets/hashflow-logo.png" />
          <input
            required
            v-model="orgName"
            placeholder="Organization Name"
            type="name"
          />
          <input
            required
            v-model="contact"
            placeholder="Contact Number"
            type="text" />
          <input
            required
            v-model="address"
            placeholder="Current Address"
            type="text"
          />

          <input
            required
            v-model="username"
            placeholder="Email Address"
            type="email"
          />
          <input
            required
            v-model="password"
            placeholder="Password"
            type="password"
          />
          <button>Create Organization Account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added
import ModeratorNavBar from "@/components/ModeratorNavBar.vue";

import Parse from "parse";

export default {
  name: "SignupAdminView",
  components: { ModeratorNavBar },
  data() {
    return {
      username: "",
      password: "",
      address: "",
      contact: "",
      userRole: "admin",
      orgName: "",
      errors: "",
    };
  },
  methods: {
    async createUser() {
      try {
        // Check if organization name already exists
        const OrgProfile = Parse.Object.extend("OrgProfile");
        const query = new Parse.Query(OrgProfile);
        query.equalTo("orgName", this.orgName);
        const result = await query.first();

        if (result) {
          alert("Organization name already exists");
          return;
        }

        const useraccount = new Parse.User();

        useraccount.set("orgName", this.orgName);
        useraccount.set("username", this.username);
        useraccount.set("password", this.password);
        useraccount.set("contact", this.contact);
        useraccount.set("address", this.address);
        useraccount.set("role", this.userRole);

        await useraccount.signUp().then(() => {
          window.location.reload();
          alert("Account Successfully Created");
        });
      } catch (error) {
        alert(error);
      }
      const orgProfile = new Parse.Object.extend("OrgProfile");
      const profile = new orgProfile();

      profile.set("orgName", this.orgName);
      profile.set("orgType", this.orgType);
      profile.set("address", this.address);
      profile.set("username", this.username);
      profile.set("contact", this.contact);

      profile.save();
    },
  },
};
</script>
