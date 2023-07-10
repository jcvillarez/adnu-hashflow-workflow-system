<style>
.org-profileview-body {
  @apply bg-[url('@/assets/background-images/backgroundimage.jpg')] bg-cover bg-fixed bg-no-repeat flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
} /* lock */
.org-profileview-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
} /* lock */

.org-profileview-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px] text-[#fff];
} /* lock */

.org-profileview-frame {
  @apply flex flex-row w-full h-[1px] grow mt-[20px];
}
</style>

<template>
  <div class="org-profileview-body">
    <OrgNavBarComponent />
    <div class="org-profileview-content">
      <span>Personal Profile</span>

      <div class="org-profileview-frame">
        <div
          class="profile flex flex-row w-full gap-10"
          v-for="profile in profiles"
          :key="profile"
        >
          <div class="flex flex-col items-start gap-3 w-full text-[#fff]">
            <span class="text-[30px] font-bold">{{ profile.name }}</span>

            <div class="flex flex-row items-center justify-start gap-5">
              <div class="text-center w-[35px]">
                <i class="fa-solid fa-users text-[25px]"></i>
              </div>
              <div class="flex flex-col items-start">
                <span>{{ profile.orgName }}</span>
                <span class="text-[11px] text-[#fff]/60"
                  >Organization Name</span
                >
              </div>
            </div>

            <div class="flex flex-row items-center justify-start gap-5">
              <div class="text-center w-[35px]">
                <i class="fa-solid fa-envelope text-[25px]"></i>
              </div>
              <div class="flex flex-col items-start">
                <span>{{ profile.email }}</span>
                <span class="text-[11px] text-[#fff]/60">Email Address</span>
              </div>
            </div>

            <div class="flex flex-row items-center justify-start gap-5">
              <div class="text-center w-[35px]">
                <i class="fa-solid fa-location-dot text-[25px]"></i>
              </div>
              <div class="flex flex-col items-start">
                <span>{{ profile.address }}</span>
                <span class="text-[11px] text-[#fff]/60">Current Address</span>
              </div>
            </div>

            <div class="flex flex-row items-center justify-start gap-5">
              <div class="text-center w-[35px]">
                <i class="fa-solid fa-phone text-[25px]"></i>
              </div>
              <div class="flex flex-col items-start">
                <span>{{ profile.contact }}</span>
                <span class="text-[11px] text-[#fff]/60">Contact Number</span>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-5">
            <button class="h-[45px] w-[150px]" @click="editProfile()">
              Edit Profile
            </button>
            <button class="h-[45px] w-[150px]" @click="changePassword()">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added

import Parse from "parse";
import OrgNavBarComponent from "@/components/OrgNavBarComponent.vue";
export default {
  name: "AdminSide",
  components: {
    OrgNavBarComponent,
  },
  data() {
    return {
      profiles: [],
    };
  },
  methods: {
    async editProfile() {
      const currentUser = Parse.User.current().get("username");
      const OrgUser = Parse.Object.extend("_User");
      const org = new Parse.Query(OrgUser);
      org.equalTo("username", currentUser);
      const queryResults = await org.find();
      const count = await org.count();

      for (let i = 0; i < count; i++) {
        this.$router.push({
          name: "OrgEditProfile",
          query: {
            orgUserId: queryResults[i].id,
          },
        });
      }
    },
    async changePassword() {
      const currentUser = Parse.User.current().get("username");
      const OrgUser = Parse.Object.extend("_User");
      const org = new Parse.Query(OrgUser);
      org.equalTo("username", currentUser);
      const queryResults = await org.find();
      const count = await org.count();

      for (let i = 0; i < count; i++) {
        this.$router.push({
          name: "OrgChangePassword",
          query: {
            passwordId: queryResults[i].id,
          },
        });
      }
    }
  },
  mounted: async function () {
    try {
      const currentUser = Parse.User.current().get("username");
      const OrgUser = Parse.Object.extend("_User");
      const org = new Parse.Query(OrgUser);
      org.equalTo("username", currentUser);
      const queryResults = await org.find();
      const count = await org.count();

      for (let i = 0; i < count; i++) {
        this.profiles.push({
          id: queryResults[i].id,
          name: queryResults[i].get("name"),
          address: queryResults[i].get("address"),
          email: queryResults[i].get("username"),
          contact: queryResults[i].get("contact"),
          orgName: queryResults[i].get("orgName"),
          password: queryResults[i].id,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  },
};
</script>
