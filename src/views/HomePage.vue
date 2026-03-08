<style>
.home-body {
  @apply bg-[url('@/assets/background-images/admin.jpg')] bg-cover bg-fixed bg-no-repeat font-['Inter'] h-[100vh] min-h-[550px];
} /* lock */
.home-content {
  @apply flex flex-col grow h-full items-center justify-start;
} /* lock */

.home-frame > span {
  @apply text-[40px] font-black;
}
.home-frame > p {
  @apply text-[20px];
}
.home-frame > img {
  @apply w-[100px] h-auto;
}
.home-frame > button {
  @apply my-[30px] text-[15px] w-[150px];
}
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
<template>
  <div class="home-body">
    <HomePageNavBar class="home-nav"/>
    <div class="home-content">
      <div
        class="home-frame flex flex-col items-center justify-center min-h-[720px]"
      >
        <img src="@/assets/hashflow-logo.png" />
        <span>Welcome to Hashflow</span>
        <p>
          A platform for organization/s to manage their processes and employees.
        </p>
        <button @click.once="start">Get Started</button>
      </div>

      <div class="flex flex-col items-center bg-white w-full grow">
        <div
          id="about"
          class="flex flex-col items-start justify-start gap-12 max-w-[1280px] grow my-[50px] w-full"
        >
          <span class="font-black text-[30px]" id="about">ABOUT</span>

          <p class="text-left text-[15px] leading-loose">
            HASHFLOW is a system developed for a Capstone Project by three (3)
            4th Year Bachelor of Science in Information and Technology students from
            Ateneo de Naga University. HASHFLOW is a digitized workflow system
            which automates workflow initiation, monitoring and completion. The
            system allows users to create user accounts or organizational
            accounts, initiate workflows, approve/reject/revise workflows,
            monitor workflows and assign approvers who are other users within
            the system.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomePageNavBar from "@/components/HomePageNavBar.vue";
import "/src/assets/tailwind.css"; // added

export default {
  name: "HomeView",
  components: {
    HomePageNavBar,
  },
  methods: {
    start() {
      this.$router.push("/IntroductionView");
    },
  },
};
</script>
