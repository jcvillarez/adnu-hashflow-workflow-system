<style>
.indv-popup-password-body {
  @apply font-['Inter'] bg-black/80 h-[100vh] flex flex-col w-full overflow-y-auto;
}
.indv-popup-password-content {
  @apply flex flex-col items-center justify-center grow;
}
.indv-popup-password-frame {
  @apply flex flex-col gap-3 bg-white p-[30px] w-[360px];
}

.indv-popup-password-frame > span {
  @apply font-bold;
}

.indv-popup-password-frame > .table-frame {
  @apply overflow-y-auto overflow-x-hidden border-[1px] border-[#aaa] h-[300px] text-[13px] p-[5px];
}
.indv-popup-password-frame > .table-frame > table {
  @apply w-full;
}
.indv-popup-password-frame > .table-frame > table > tbody > tr > td {
  @apply flex flex-col gap-2 border-b-[1px] border-b-[#aaa] p-[5px];
}
.indv-popup-password-frame > .table-frame > table > tbody > tr > td > textarea {
  @apply border-[1px] border-[#aaa] h-[275px] min-h-[70px] max-h-[500px] p-[10px];
}
.indv-popup-password-frame
  > .table-frame
  > table
  > tbody
  > tr
  > td
  > .button-container {
  @apply flex flex-row gap-2 items-center justify-end;
}
.indv-popup-password-frame
  > .table-frame
  > table
  > tbody
  > tr
  > td
  > .button-container
  > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[10px] p-[5px];
}
.indv-popup-password-frame
  > .table-frame
  > table
  > tbody
  > tr
  > td
  > .button-container
  > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.indv-popup-password-frame > div > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}
.indv-popup-password-frame > div > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.input {
  @apply flex flex-col h-full grow;
}
textarea {
  @apply w-full resize-none grow p-[10px];
}
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.snow.css";
</style>

<template>
  <div class="indv-popup-password-body">
    <div class="indv-popup-password-content">
      <form
        class="indv-popup-password-frame"
        @submit.prevent="reviseDocument"
        method="post"
      >
        <span>Revision</span>
        <div class="table-frame">
          <div class="input" ref="editor">
            <textarea
              type="string"
              v-model="inputComment"
              placeholder="Add Comment"
            ></textarea>
          </div>
        </div>
        <div
          class="button-container"
          v-for="verdict in verdicts"
          :key="verdict.id"
        >
          <router-link
            :to="{
              name: 'PasswordView',
              query: {
                approvalId: this.$route.query.approvalId,
                verdict: decision,
                comment: this.inputComment,
              },
            }"
          >
            <button class="deci" @click.once="approverDecide(verdict, id)">
              {{ verdict.revise }}
            </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css";
import Parse from "parse";
import Quill from "quill";
export default {
  data() {
    return {
      verdicts: [{ name: "Revise", revise: "Submit" }],
      comments: [{ comment: "" }],
      decision: "Revise",
      inputComment: "",
    };
  },
  mounted() {
    this.editor = new Quill(this.$refs.editor, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
        ],
      },
    });
    this.editor.on("text-change", this.handleEditorChange);
  },
  methods: {
    handleEditorChange() {
      const editorContent = this.editor.root.innerHTML;
      const divElement = document.createElement("div");
      divElement.innerHTML = editorContent;
      this.inputComment = divElement.innerText;
    },
    updateDescription() {
      const divElement = document.createElement("div");
      divElement.innerText = this.inputComment;
      this.editor.root.innerHTML = divElement.innerHTML;
    },
    reviseDocument() {
      const currentUser = Parse.User.current();

      try {
        if (currentUser != null) {
          const ReviseDocument = Parse.Object.extend("Revise_Document");
          const revise = new ReviseDocument();

          revise.set(
            "comments",
            this.comments.map((comment) => {
              return {
                comments: comment,
              };
            })
          );
          revise.save().then(() => {
            this.$router.push("/userdashboard");
          });
        } else {
          this.$router.push({ name: "LoginView" });
        }
      } catch (error) {
        console.log({ error });
      }
    },
    approverDecide(verdict) {
      const currentUser = Parse.User.current();
      if (currentUser != null) {
        this.decision = verdict.name;
        alert("Verify First");
      } else {
        alert("Please login first!");
        this.$router.push("/login");
      }
    },
  },
};
</script>
