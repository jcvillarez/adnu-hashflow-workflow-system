<template>
  <nav
    class="flex items-center justify-between w-full px-8 py-4 bg-white shadow-md"
  >
    <div class="flex items-center">
      <img
        class="w-10 h-auto"
        src="@/assets/hashflow-logo.png"
        alt="Hashflow Logo"
        href="/"
      />
      <span class="ml-4 text-lg font-bold">Hashflow</span>
    </div>
    <div class="md:flex md:items-center md:justify-end">
      <a
        href="#about"
        class="ml-8 text-gray-500 hover:text-gray-700 font-medium"
        >About</a
      >

      <a
        href="/login"
        class="ml-8 text-gray-500 hover:text-gray-700 font-medium"
        >Login</a
      >
      <a
        href="/signupas"
        class="ml-8 text-gray-500 hover:text-gray-700 font-medium"
        >Sign up</a
      >
      <button
        class="ml-8 py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-medium"
        @click.once="start"
      >
        Get Started
      </button>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    start() {
      this.$router.push("/IntroductionView");
    },
  },
};
</script>
<style scoped>
nav {
  font-family: "Inter", sans-serif;
}

nav a {
  transition: color 0.2s;
}

nav a:hover {
  color: #4a5568;
}

nav button {
  transition: background-color 0.2s;
}

nav button:hover {
  background-color: #2b6cb0;
}

@media (max-width: 767px) {
  nav {
    position: relative;
  }

  nav button {
    position: absolute;
    top: 50%;
    right: 1.5rem;
    transform: translateY(-50%);
  }
}
</style>
