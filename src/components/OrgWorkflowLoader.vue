<template>
  <div class="page-container">
    <div v-if="!showModal">
      <half-circle-spinner :animation-duration="5000" :size="80" color="gold" />
    </div>
    <div v-if="showModal" class="text-box">
      <strong class="message">Workflow Succesfully Initiated!</strong>
      <button
        type="button"
        @click="this.$router.push({ name: 'orgDashboard' })"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";

export default {
  props: {
    button: {
      type: String,
    },
    show: {
      type: String,
    },
    initiationMessage: { type: String },
    templateMessage: { type: String },
  },
  name: "WorkflowLoader",
  components: { HalfCircleSpinner },
  data() {
    return {
      showModal: "",
    };
  },
  mounted() {
    if (this.initiationMessage === "It is done.") {
      this.showModal = this.initiationMessage;
    }
  },
};
</script>

<style scoped>
.page-container {
  @apply top-0 fixed w-full h-full grid h-screen place-items-center bg-black/[0.7] z-[100];
}
.page-container > .text-box {
  @apply p-20 w-96 bg-white rounded-md z-[100];
}
.message {
  @apply text-black font-sans text-base;
}
.page-container > .text-box > button {
  @apply inline-block rounded bg-cyan-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)];
}
.text-box {
  animation: text-box 1.5s forwards 1;
  margin-top: 0px;
}
@keyframes text-box {
  100% {
    margin-top: 10%;
  }
}
</style>
