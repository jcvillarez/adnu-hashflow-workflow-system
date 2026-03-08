<style>
.signup-body {
  @apply bg-[url('../assets/background-images/admin.jpg')] bg-cover bg-fixed bg-no-repeat font-['Inter'] h-[100vh] min-w-[800px];
} /* lock */
.signup-content {
  @apply flex flex-col grow h-full items-center justify-start;
} /* lock */

.signup-frame {
  @apply flex flex-col items-center justify-center gap-3 w-[500px] my-auto;
}
.signup-frame > div {
  @apply border-[1px] border-[#aaa] flex flex-col items-center justify-center gap-3 p-[40px] w-full;
}
.signup-frame > div > img {
  @apply w-[100px] h-auto mb-[20px];
}
.signup-frame > div > div {
  @apply flex flex-row items-center justify-center gap-3 w-full;
}
.signup-frame > div > div > button {
  @apply border-[1px] border-[#F18642] flex flex-col items-center justify-center bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}
.signup-frame > div > div > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}
.signup-frame > div > div > button > i {
  @apply text-[70px] my-[20px];
}

.signup-frame > div > span > a {
  @apply text-[#F18642];
}
</style>

<template>
  <div class="signup-body">
    <div class="signup-content">
      <div class="signup-frame">
        <div>
          <img src="@/assets/hashflow-logo.png" />
          <span>Create Account As</span>
          <div>
            <button onclick="window.location.href='signupuser'">
              <i class="fa-solid fa-user"></i>
              <span>Individual</span>
            </button>
            <button onclick="window.location.href='signupadmin'">
              <i class="fa-solid fa-users"></i>
              <span>Organization</span>
            </button>
          </div>
        </div>

        <div>
          <span>Already have an account? <a href="/login">Sign in</a></span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added
import Footer from "@/components/FooterComponent.vue";
export default {
  name: "UserAdmin",
  components: { Footer },
};
</script>
