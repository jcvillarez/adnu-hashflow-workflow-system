<style>
.popup-email-body {
  @apply font-['Inter'] bg-black/80 h-[100vh] flex flex-col w-full overflow-y-auto;
}
.popup-email-content {
  @apply flex flex-col items-center justify-center grow;
}
.popup-email-frame {
  @apply flex flex-col gap-3 bg-white p-[30px] w-[360px];
}

.popup-email-frame > span {
  @apply font-bold;
}
.popup-email-frame > p {
  @apply text-[13px];
}
.popup-email-frame > input {
  @apply border-[1px] border-[#aaa] p-[10px];
}
.popup-email-frame > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}
.popup-email-frame > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}
</style>

<template>
  <div class="popup-email-body">
    <div class="popup-email-content">
      <div class="popup-email-frame">
        <span>Email Verified</span>
        <p>
          Congratulations! Your Email has been successfully verified. You can
          now Login to continue.
        </p>
        <button @click="login">Log In</button>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added

import Parse from "parse";
export default {
  name: "emailVerified",
  methods: {
    login() {
      this.$router.push({ name: "LoginView" });
    },
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    Parse.Cloud.run("verifyEmail", { token })
      .then((response) => console.log(response))
      .catch(() =>
        this.$router.push({ name: "ErrorView", params: { error: "404" } }),
      );
  },
};
</script>
