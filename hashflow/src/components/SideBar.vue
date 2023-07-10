<template>
  <nav
    class="font-['Inter'] fixed flex flex-row bg-gradient-to-r from-[#FE5B00] to-[#CD1887] p-[5px] w-full z-[2]"
  >
    <div class="flex flex-row items-center justify-start gap-5">
      <img
        class="w-[50px] h-auto"
        src="@/assets/hashflow-logo.png"
        alt="Hashflow Logo"
        onclick="location.href='/';"
      />
      <span
        ><a
          class="font-black text-white text-[30px] hover:no-underline hover:text-white"
          href="/"
          >HASHFLOW</a
        ></span
      >
    </div>
    <div class="grow"></div>
    <div class="flex flex-row items-center justify-center">
      <router-link
        class="text-white no-underline p-[15px] text-[13px] hover:bg-black/30 hover:duration-75 hover:text-white hover:no-underline"
        :to="{ name: 'SignupAs' }"
        >Sign Up</router-link
      >
      <router-link
        class="text-white no-underline p-[15px] text-[13px] hover:bg-black/30 hover:duration-75 hover:text-white hover:no-underline"
        :to="{ name: 'LoginView' }"
        >Sign In</router-link
      >
    </div>
  </nav>

  <!-- sidebar -->
  <div class="font-['Inter'] flex flex-col fixed z-[1] h-full bg-[#2C3E50]">
    <div class="flex flex-row p-[5px]">
      <div class="flex flex-row items-center justify-center gap-5 w-full">
        <img
          class="w-[50px] h-auto"
          src="@/assets/hashflow-logo.png"
          alt="Hashflow Logo"
          onclick="location.href='/';"
        />
      </div>
    </div>
    <div
      class="sidebar flex flex-col items-start justify-start w-[260px] grow overflow-x-hidden"
    >
      <router-link
        class="text-white no-underline p-[15px] border-y-[1px] border-y-black/30 w-full text-left text-[15px] hover:bg-[#F18642]/30 hover:duration-75 hover:text-white hover:no-underline"
        :to="{ name: 'IntroductionView' }"
        >Introduction</router-link
      >
      <router-link
        class="text-white no-underline p-[15px] border-y-[1px] border-y-black/30 w-full text-left text-[15px] hover:bg-[#F18642]/30 hover:duration-75 hover:text-white hover:no-underline"
        :to="{ name: 'TreeView' }"
        >Tree Structure</router-link
      >
      <router-link
        class="text-white no-underline p-[15px] border-y-[1px] border-y-black/30 w-full text-left text-[15px] hover:bg-[#F18642]/30 hover:duration-75 hover:text-white hover:no-underline"
        :to="{ name: 'PDFStamp' }"
        >PDF Stamp</router-link
      >
      <router-link
        class="text-white no-underline p-[15px] border-y-[1px] border-y-black/30 w-full text-left text-[15px] hover:bg-[#F18642]/30 hover:duration-75 hover:text-white hover:no-underline"
        :to="{ name: 'AccountRegistration' }"
        >Account Registration</router-link
      >
      <router-link
        class="text-white no-underline p-[15px] border-y-[1px] border-y-black/30 w-full text-left text-[15px] hover:bg-[#F18642]/30 hover:duration-75 hover:text-white hover:no-underline"
        :to="{ name: 'UsersHow' }"
        >User</router-link
      >
      <div
        class="flex flex-col w-full items-start justify-start px-[15px] text-[13px] bg-black/30"
      >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewDash"
          >Dashboard</span
        >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewWorkflow"
          >Workflow</span
        >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewApproval"
          >Approval Request</span
        >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewProfile"
          >Profile</span
        >
      </div>

      <router-link
        class="text-white no-underline p-[15px] border-y-[1px] border-y-black/30 w-full text-left text-[15px] hover:bg-[#F18642]/30 hover:duration-75 hover:text-white hover:no-underline"
        :to="{ name: 'OrganizationHow' }"
        >Organization</router-link
      >
      <div
        class="flex flex-col w-full items-start justify-start px-[15px] text-[13px] bg-black/30"
      >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewOrgDash"
          >Dashboard</span
        >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewCreate"
          >Create Member Account</span
        >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewOrgTemplate"
          >Create Workflow Template</span
        >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewDelete"
          >Monitor/Delete Member Account</span
        >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewOrgProf"
          >Profile</span
        >
      </div>

      <router-link
        class="text-white no-underline p-[15px] border-y-[1px] border-y-black/30 w-full text-left text-[15px] hover:bg-[#F18642]/30 hover:duration-75 hover:text-white hover:no-underline"
        :to="{ name: 'MemberHow' }"
        >Member</router-link
      >
      <div
        class="flex flex-col w-full items-start justify-start px-[15px] text-[13px] bg-black/30"
      >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewMemFlow"
          >Workflow</span
        >
        <span
          class="text-white cursor-pointer py-[10px] text-left"
          @click="viewMemApp"
          >Approval Request</span
        >
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import "/src/assets/tailwind.css"; // added

export default {
  name: "SideBar",
  methods: {
    viewDash() {
      document.querySelector("#dashboard").scrollIntoView({
        behavior: "smooth",
      });
    },
    viewWorkflow() {
      document.querySelector("#workflow").scrollIntoView({
        behavior: "smooth",
        align: true,
      });
    },
    viewApproval() {
      document.querySelector("#approval").scrollIntoView({
        behavior: "smooth",
      });
    },
    viewProfile() {
      document.querySelector("#profile").scrollIntoView({
        behavior: "smooth",
      });
    },
    viewOrgDash() {
      document.querySelector("#org-dashboard").scrollIntoView({
        behavior: "smooth",
      });
    },
    viewCreate() {
      document.querySelector("#member-account").scrollIntoView({
        behavior: "smooth",
      });
    },
    viewOrgTemplate() {
      document.querySelector("#workflow-template").scrollIntoView({
        behavior: "smooth",
      });
    },
    viewDelete() {
      document.querySelector("#delete-account").scrollIntoView({
        behavior: "smooth",
      });
    },
    viewOrgProf() {
      document.querySelector("#org-profile").scrollIntoView({
        behavior: "smooth",
      });
    },
    viewMemFlow() {
      document.querySelector("#member-workflow").scrollIntoView({
        behavior: "smooth",
      });
    },
    viewMemApp() {
      document.querySelector("#member-approval").scrollIntoView({
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
.sidebar a.router-link-exact-active {
  @apply bg-[#F18642];
}

body {
  margin: 0px;
}
</style>
