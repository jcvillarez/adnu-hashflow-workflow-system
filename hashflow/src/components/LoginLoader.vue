<template>
  <div class="page-body">
    <img src="@/assets/hashflow-logo.png" />
    <div class="progress-body">
      <div class="progress"></div>
      <span>All eyes on me</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    role: {
      type: String,
    },
    redirect: {
      type: String,
    },
  },
  name: "LoginLoader",

  mounted() {
    const animated = document.querySelector(".progress");

    if (this.role) {
      animated.addEventListener("animationend", () => {
        this.$router.push(this.redirect);
      });
    } else {
      this.$router.push({ name: "LoginView" });
    }
  },
};
</script>

<style>
.page-body {
  @apply grid h-screen place-items-center;
}
.progress-body {
  @apply h-1.5 w-1/2 bg-neutral-200 dark:bg-neutral-600 mt-[5%] rounded;
}
.progress-body > span {
  @apply text-black font-sans text-base text-[15pt];
}
.progress {
  @apply bg-orange-600 duration-200 w-0 h-1.5 rounded;
}
.page-body > img {
  @apply object-center w-[15%] h-auto ml-[0.5%] cursor-default;
}
.progress {
  animation: progress 1.5s linear forwards;
}
@keyframes progress {
  0% {
    width: 0%;
  }
  33% {
    width: 33%;
  }
  66% {
    width: 66%;
  }
  100% {
    width: 100%;
  }
}
</style>
