<template>
  <!-- top nav -->
  <nav
    class="font-['Inter'] fixed top-0 left-0 w-full h-[70px] flex items-center justify-between bg-gradient-to-r from-[#FE5B00] to-[#CD1887] px-6 z-[20] shadow-md">
    <!-- Logo + Title -->
    <div class="flex items-center gap-4">
      <img class="w-[50px] h-auto cursor-pointer" src="@/assets/hashflow-logo.png" alt="Hashflow Logo"
        @click="goHome" />
      <a class="font-black text-white text-[30px] hover:no-underline" href="/">HASHFLOW</a>
    </div>

    <!-- Right links -->
    <div class="flex items-center gap-4">
      <router-link class="text-white text-[13px] px-4 py-2 rounded hover:bg-black/30 hover:duration-75"
        :to="{ name: 'SignupAs' }">Sign Up</router-link>
      <router-link class="text-white text-[13px] px-4 py-2 rounded hover:bg-black/30 hover:duration-75"
        :to="{ name: 'LoginView' }">Sign In</router-link>
    </div>
  </nav>

  <!-- sidebar -->
  <div
    class="font-['Inter'] flex flex-col fixed top-[70px] left-0 z-[10] h-[calc(100vh-70px)] bg-[#2C3E50] w-[260px] overflow-y-auto">
    <div class="sidebar flex flex-col w-full">

      <!-- Static Links -->
      <router-link class="sidebar-link" :to="{ name: 'IntroductionView' }">Introduction</router-link>
      <router-link class="sidebar-link" :to="{ name: 'TreeView' }">Tree Structure</router-link>
      <router-link class="sidebar-link" :to="{ name: 'PDFStamp' }">PDF Stamp</router-link>
      <router-link class="sidebar-link" :to="{ name: 'AccountRegistration' }">Account Registration</router-link>

      <!-- Dropdown: User -->
      <router-link class="sidebar-link flex justify-between items-center" :to="{ name: 'UsersHow' }">
        User
        <span v-if="$route.name === 'UsersHow'">▲</span>
        <span v-else>▼</span>
      </router-link>
      <div v-if="$route.name === 'UsersHow'" class="submenu">
        <span class="submenu-item" @click="viewDash">Dashboard</span>
        <span class="submenu-item" @click="viewWorkflow">Workflow</span>
        <span class="submenu-item" @click="viewApproval">Approval Request</span>
        <span class="submenu-item" @click="viewProfile">Profile</span>
      </div>

      <!-- Dropdown: Organization -->
      <router-link class="sidebar-link flex justify-between items-center" :to="{ name: 'OrganizationHow' }">
        Organization
        <span v-if="$route.name === 'OrganizationHow'">▲</span>
        <span v-else>▼</span>
      </router-link>
      <div v-if="$route.name === 'OrganizationHow'" class="submenu">
        <span class="submenu-item" @click="viewOrgDash">Dashboard</span>
        <span class="submenu-item" @click="viewCreate">Create Member Account</span>
        <span class="submenu-item" @click="viewOrgTemplate">Create Workflow Template</span>
        <span class="submenu-item" @click="viewDelete">Monitor/Delete Member Account</span>
        <span class="submenu-item" @click="viewOrgProf">Profile</span>
      </div>

      <!-- Dropdown: Member -->
      <router-link class="sidebar-link flex justify-between items-center" :to="{ name: 'MemberHow' }">
        Member
        <span v-if="$route.name === 'MemberHow'">▲</span>
        <span v-else>▼</span>
      </router-link>
      <div v-if="$route.name === 'MemberHow'" class="submenu">
        <span class="submenu-item" @click="viewMemFlow">Workflow</span>
        <span class="submenu-item" @click="viewMemApp">Approval Request</span>
      </div>

    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";

export default {
  name: "SideBar",
  methods: {
    goHome() {
      window.location.href = "/";
    },
    async scrollTo(id) {
      await nextTick();
      const el = document.querySelector(`#${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    viewDash() { this.scrollTo("dashboard"); },
    viewWorkflow() { this.scrollTo("workflow"); },
    viewApproval() { this.scrollTo("approval"); },
    viewProfile() { this.scrollTo("profile"); },
    viewOrgDash() { this.scrollTo("org-dashboard"); },
    viewCreate() { this.scrollTo("member-account"); },
    viewOrgTemplate() { this.scrollTo("workflow-template"); },
    viewDelete() { this.scrollTo("delete-account"); },
    viewOrgProf() { this.scrollTo("org-profile"); },
    viewMemFlow() { this.scrollTo("member-workflow"); },
    viewMemApp() { this.scrollTo("member-approval"); },
  },
};
</script>

<style>
/* Sidebar links */
.sidebar-link {
  display: block;
  color: white;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.sidebar-link:hover {
  background-color: rgba(241, 134, 66, 0.2);
  color: white;
}

/* Active link */
.sidebar a.router-link-exact-active {
  background-color: #F18642;
}

/* Submenu */
.submenu {
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  background-color: rgba(0, 0, 0, 0.2);
}

.submenu-item {
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submenu-item:hover {
  color: #F18642;
}

/* Sidebar scrollbar */
.sidebar {
  scrollbar-width: thin;
  scrollbar-color: #F18642 #2C3E50;
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: #2C3E50;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #F18642;
  border-radius: 3px;
}
</style>