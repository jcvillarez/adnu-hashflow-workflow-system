<style>
.org-nav-frame {
  @apply font-['Inter'] bg-gradient-to-r from-[#FE5B00] to-[#CD1887] sticky top-0 w-full flex flex-row gap-5 items-center justify-center p-[5px] z-[999];
}
.org-nav-frame > .org-title {
  @apply flex flex-row items-center justify-center gap-5 px-[10px];
}
.org-nav-frame > .org-title > img {
  @apply w-[50px] h-auto;
}
.org-nav-frame > .org-title > span {
  @apply font-black text-[30px] text-white;
}
.org-nav-frame > .org-nav {
  @apply flex flex-row items-center justify-end gap-1 grow;
}
.org-nav-frame > .org-nav > a {
  @apply text-white no-underline p-[15px] text-[13px];
}
.org-nav-frame > .org-nav > a:hover,
.org-nav-dropdown:hover {
  @apply bg-black/30 duration-75;
}
.org-nav-frame > .org-nav > a.router-link-exact-active {
  @apply bg-black/30;
}

.org-nav-dropdown {
  @apply flex p-[15px] relative text-white text-[13px] cursor-pointer;
}
.org-nav-dropdown-content {
  @apply hidden absolute top-[49.5px] z-[1] text-left w-[250px] left-0 bg-[#2C3E50];
}
.org-nav-dropdown:hover .org-nav-dropdown-content {
  @apply flex flex-col;
}
.org-nav-dropdown-content > a {
  @apply p-[15px] text-white text-[13px] no-underline;
}
.org-nav-dropdown-content > a:hover {
  @apply bg-[#FE5B00] duration-75;
}
.org-nav-dropdown-content > a.router-link-exact-active {
  @apply bg-[#FE5B00] duration-75;
}
.fa-user-circle-lg {
  font-size: 25px;
}
</style>

<template>
  <div class="org-nav-frame">
    <div class="org-title">
      <img src="@/assets/org-hashflow-logo.png" />
      <span>HASHFLOW-MODERATOR</span>
    </div>

    <div class="org-nav">
      <router-link :to="{ name: 'ModeratorDashboard' }">Dashboard</router-link>
      <router-link :to="{ name: 'ModeratorAdminAccounts' }"
        >Accounts</router-link
      >
      <router-link :to="{ name: 'ModeratorNotification' }"
        >Notification</router-link
      >
      <div class="admin-nav-dropdown">
        <span>
          <i class="fas fa-user-circle fa-user-circle-lg"></i>
        </span>
        <div class="admin-nav-dropdown-content">
          <router-link :to="{ name: 'ModeratorProfile' }">Profile</router-link>
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
  name: "ModeratorNavBar",
  methods: {
    handleLogout() {
      const currentUser = Parse.User.current();
      if (currentUser != null) {
        Parse.User.logOut(currentUser);
        this.$router.push("/login");
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
