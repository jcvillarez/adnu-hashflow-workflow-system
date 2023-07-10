<style>
.org-recent-treestructure-body {
  @apply bg-[url('@/assets/background-images/user.jpg')] bg-cover bg-fixed bg-no-repeat flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
} /* lock */
.org-recent-treestructure-content {
  @apply flex flex-col items-center justify-start gap-[30px] grow w-full max-w-[1280px] py-[30px];
} /* lock */

.org-recent-treestructure-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
} /* lock */

.org-recent-treestructure-content > form > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-[150px];
}
.org-recent-treestructure-content > form > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.org-recent-treestructure-frame {
  @apply overflow-auto w-full h-[1px] grow border-2 border-[#F18642] p-[30px] bg-white;
}
.org-recent-treestructure-frame > ul {
  @apply inline-block;
}

.org-recent-treestructure-frame > table {
  @apply w-full;
}

.org-recent-treestructure-frame > table > tbody > tr {
  @apply border-b-[1px] border-b-[#aaa];
}

.org-recent-treestructure-frame > table > thead > tr > th {
  @apply text-[13px] p-[10px] font-bold sticky top-0 bg-white border-none;
}
.org-recent-treestructure-frame > table > tbody > tr > td {
  @apply text-left text-[13px] border-none p-[10px];
}
</style>

<template>
  <div class="org-recent-treestructure-body">
    <div class="org-recent-treestructure-content">
      <span>Workflow Structure</span>
      <div class="org-recent-treestructure-frame">
        <ul ref="treeContainer"></ul>
      </div>
      <form @submit.prevent="initiateWorkflow" method="post">
        <button type="submit" class="button-nodes rounded-[5px]">
          Initiate Workflow
        </button>
      </form>
    </div>
  </div>
  <div v-if="initiationMessage">
    <OrgWorkflowLoader v-bind:initiationMessage="initiationMessage" />
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added
import OrgWorkflowLoader from "@/components/OrgWorkflowLoader.vue";
import Parse from "parse";
import { HybridTree } from "@/hybrid_tree.js";
export default {
  data() {
    return {
      initiationMessage: "",
    };
  },
  components: {
    OrgWorkflowLoader,
  },
  methods: {
    initiateWorkflow() {
      try {
        const currentUser = Parse.User.current();
        if (currentUser != null) {
          const userRole = currentUser.get("role");
          if (userRole === "orgUser") {
            const Workflow = Parse.Object.extend(
              "Org_Workflow_Initiation_History"
            );
            const id = this.$route.query.id;
            const workflow = new Workflow();

            let tree = HybridTree.fromDOM(this.$refs.treeContainer);

            workflow.set("objectId", id);
            workflow.set("approvers", tree.toJson());

            workflow.save().then(async () => {
              const Workflow = Parse.Object.extend(
                "Org_Workflow_Initiation_History"
              );
              const query = new Parse.Query(Workflow);
              const id = this.$route.query.id;
              const entry = await query.get(id);
              const user = await entry.get("userInitiated");

              const processName = entry.get("processName");
              const email = tree.getEmails();
              const approver = entry.get("approvers");
              const message = entry.get("message");
              const date = entry.createdAt.toLocaleDateString();
              const approved = "Approved";
              const reject = "Reject";
              const revise = "Revise";
              const file = entry.get("userFile").map((obj) => {
                return {
                  name: obj.name().substring(obj.name().indexOf("_") + 1),
                  url: obj.url(),
                };
              });
              const firstname = await user.get("firstname");

              Parse.Cloud.run("sendEmail", {
                id: id,
                firstname: firstname,
                name: processName,
                approver: approver,
                email: email,
                message: message,
                date: date,
                file: file,
                approved: approved,
                reject: reject,
                revise: revise,
              });
              this.initiationMessage = "It is done.";
            });
          } else {
            alert("You are not authorized to initiate workflow");
          }
        }
      } catch (error) {
        console.log({ error });
      }
    },
    createButton(text, action) {
      let button = document.createElement("button");
      button.innerHTML = text;
      button.onclick = action;
      button.classList = `
          border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-[150px] hover:border-[#F18642]
          hover:bg-transparent hover:text-[#F18642] hover:duration-75
        `;

      return button;
    },
    initializeList(parent) {
      let button = this.createButton("Add Broadcast Approver");
      let buttonHolder = document.createElement("li");
      buttonHolder.classList = `
        border-[5px] border-[#F18642]/20 p-[30px]
      `;
      buttonHolder.appendChild(button);
      button.onclick = () => {
        let container = document.createElement("div");
        container.classList =
          "flex flex-row gap-5 items-center justify-center border-[5px] border-[#F18642]/20 p-[30px]";

        let input = document.createElement("input");
        input.setAttribute("type", "email");
        input.setAttribute("placeholder", "Email");
        input.classList =
          "border-[1px] border-[#aaa] text-[13px] p-[10px] w-[200px];";

        let roleInput = document.createElement("select");
        roleInput.classList =
          "border-[1px] border-[#aaa] text-[13px] p-[10px] w-[200px];";

        // Create an option for each role
        ["Viewer", "Approver", "Acknowledger", "Endorser"].forEach((role) => {
          let option = document.createElement("option");
          option.value = role;
          option.text = role;
          roleInput.appendChild(option);
        });

        let submit = this.createButton("OK", async () => {
          let userRole = Parse.User.current().get("role");
          const userQuery = new Parse.Query("_User");
          userQuery.equalTo("username", input.value);
          const result = await userQuery.first();
          // Check if the input is a valid email address
          let emailPattern = /^\S+@\S+\.\S+$/;
          if (userRole == "user") {
            alert("User does not belong to this organization.");
            return;
          } else if (!emailPattern.test(input.value)) {
            alert("Please enter a valid email address");
            return;
          } else if (!result) {
            alert("User does not exist");
            return;
          }

          let role = roleInput.value;
          let item = document.createElement("li");
          item.classList = "flex flex-row gap-3 items-center justify-end";

          let nestedList = document.createElement("ul");
          nestedList.classList =
            "border-[5px] border-[#F18642] p-[30px] mb-[30px]";

          let addChildButton = this.createButton("Add Sequential Approver");
          addChildButton.classList = `
            border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px]
            hover:border-[#F18642] hover:bg-transparent hover:text-[#F18642] hover:duration-75
          `;
          addChildButton.onclick = () => {
            this.initializeList(nestedList);
            nestedList.setAttribute("data-parent", input.value);
            item.removeChild(addChildButton);
          };
          let deleteButton = this.createButton("Delete", () => {
            parent.removeChild(item);
            parent.removeChild(nestedList);
          });
          deleteButton.classList = `
            border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px]
            hover:border-[#F18642] hover:bg-transparent hover:text-[#F18642] hover:duration-75
          `;

          item.setAttribute("data-email", input.value);
          item.setAttribute("data-role", role); // Set the data-role attribute to the selected value
          item.innerText = `${input.value} (${role})`; // Display the role beside the email
          item.appendChild(deleteButton);
          item.appendChild(addChildButton);

          parent.insertBefore(item, container);
          parent.replaceChild(buttonHolder, container);
          parent.insertBefore(nestedList, item.nextSibling);
        });
        let cancel = this.createButton("Cancel", () => {
          parent.replaceChild(buttonHolder, container);
        });

        container.appendChild(input);
        container.appendChild(roleInput);
        container.appendChild(submit);
        container.appendChild(cancel);
        parent.replaceChild(container, buttonHolder);
      };

      parent.appendChild(buttonHolder);
    },
  },
  mounted: function () {
    this.initializeList(this.$refs.treeContainer);
  },
};
</script>
