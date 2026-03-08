<style>
.admin-nav-frame {
  @apply font-['Inter'] bg-gradient-to-r from-[#FE5B00] to-[#CD1887] sticky top-0 w-full flex flex-row gap-5 items-center justify-center p-[5px] z-[999];
}
.admin-nav-frame > .admin-title {
  @apply flex flex-row items-center justify-center gap-5 px-[10px];
}
.admin-nav-frame > .admin-title > img {
  @apply w-[50px] h-auto;
}
.admin-nav-frame > .admin-title > span {
  @apply font-black text-[30px] text-white;
}
.admin-nav-frame > .admin-nav {
  @apply flex flex-row items-center justify-end gap-1 grow;
}
.admin-nav-frame > .admin-nav > a {
  @apply text-white no-underline p-[15px] text-[13px];
}
.admin-nav-frame > .admin-nav > a:hover,
.admin-nav-dropdown:hover {
  @apply bg-black/30 duration-75;
}
.admin-nav-frame > .admin-nav > a.router-link-exact-active {
  @apply bg-black/30;
}

.admin-nav-dropdown {
  @apply flex p-[15px] relative text-white text-[13px] cursor-pointer;
}
.admin-nav-dropdown-content {
  @apply hidden absolute top-[49.5px] z-[1] text-left w-[250px] right-0 bg-[#2C3E50];
}
.admin-nav-dropdown:hover .admin-nav-dropdown-content {
  @apply flex flex-col;
}
.admin-nav-dropdown-content > a {
  @apply p-[15px] text-white text-[13px] no-underline;
}
.admin-nav-dropdown-content > a:hover {
  @apply bg-[#FE5B00] duration-75;
}
.admin-nav-dropdown-content > a.router-link-exact-active {
  @apply bg-[#FE5B00] duration-75;
}
.fa-user-circle-lg {
  font-size: 18px;
}
</style>

<template>
  <div class="admin-nav-frame">
    <div class="admin-title">
      <img src="@/assets/admin-hashflow-logo.png" />
      <span>HASHFLOW-ADMIN</span>
    </div>

    <div class="admin-nav">
      <router-link :to="{ name: 'admin' }">Dashboard</router-link>
      <router-link :to="{ name: 'archivedAccounts' }">Archived Accounts</router-link>

      <div class="admin-nav-dropdown">
        <span>New</span>
        <div class="admin-nav-dropdown-content">
          <router-link :to="{ name: 'CreateAccount' }"> Account</router-link>
          <router-link :to="{ name: 'ProcessWorkflow' }"
            >Process Workflow</router-link
          >
        </div>
      </div>
      <div class="admin-nav-dropdown">
        <span>
          <i class="fas fa-user-circle fa-user-circle-lg"></i>
        </span>
        <div class="admin-nav-dropdown-content">
          <router-link :to="{ name: 'AdminProfile' }">Profile</router-link>
          <a href="javascript:void(0)" class="logout" @click="handleLogout">
            Log out
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
export default {
  name: "AdminNavBarComponent",
  methods: {
    handleLogout() {
      const currentUser = Parse.User.current();
      Parse.User.logOut(currentUser);
      this.$router.push("/login");
    },
  },
};
</script>
