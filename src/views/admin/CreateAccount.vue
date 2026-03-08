<style>
.admin-create-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
} /* lock */
.admin-create-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
} /* lock */

.admin-create-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
} /* lock */

.admin-create-frame {
  @apply flex flex-row items-start justify-center w-full h-[1px] grow mt-[20px] gap-10;
}

.admin-create-frame > form {
  @apply flex flex-col items-start gap-5 grow text-[13px] p-[30px] w-[50%];
}
.admin-create-frame > form > div {
  @apply flex flex-col items-start font-bold;
}
.admin-create-frame > form > div > span {
  @apply font-normal text-[16px];
}
.admin-create-frame > form > input,
.admin-create-frame > form > select {
  @apply border-[1px] border-[#aaa] text-[13px] p-[10px] w-full;
}
.admin-create-frame > form > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}
.admin-create-frame > form > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.admin-create-frame > .create > .gender-choice-container {
  @apply flex flex-row items-center justify-center gap-5 w-full;
}
.admin-create-frame > .create > .gender-choice-container > div {
  @apply flex items-center gap-1;
}

.admin-create-frame > .create > .gender-choice-container > div > input,
.admin-create-frame > .create > .gender-choice-container > div > label {
  @apply my-auto font-normal text-[13px];
}

.admin-create-frame > .upload {
  @apply flex flex-col items-start gap-5 grow text-[13px];
}
.admin-create-frame > .upload > a {
  @apply text-[red] font-bold;
}
</style>

<template>
  <div class="admin-create-body">
    <AdminNavBarComponent />
    <div class="admin-create-content">
      <span>Create Account for Organization</span>

      <div class="admin-create-frame">
        <form class="create" @submit.prevent="createUser()">
          <button>Individual Account Creation</button>
        </form>
        <form class="upload" @submit.prevent="bulkSignUp">
          <button>Bulk Account Creation</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added
import AdminNavBarComponent from "@/components/AdminNavBarComponent.vue";

export default {
  methods: {
    async bulkSignUp() {
      this.$router.push ({
        name: 'BulkSignUp',
      });
    },
    createUser() {
      this.$router.push ({
        name: 'IndividualSignUp',
      });
    },
  },
  components: { AdminNavBarComponent },
};
</script>
