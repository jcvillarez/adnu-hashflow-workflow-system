<style>
.org-predefined-treestructure-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
}

/* lock */
.org-predefined-treestructure-content {
  @apply flex flex-col items-center justify-start gap-[30px] grow w-full max-w-[1280px] py-[30px];
}

/* lock */

.org-predefined-treestructure-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
}

/* lock */

.org-predefined-treestructure-content > form > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-[150px];
}

.org-predefined-treestructure-content > form > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.org-predefined-treestructure-frame {
  @apply overflow-auto w-full h-[1px] grow border-[1px] border-b-[#aaa] p-[20px];
}

.org-predefined-treestructure-frame > ul {
  @apply inline-block;
}

.org-predefined-treestructure-frame > table {
  @apply w-full;
}

.org-predefined-treestructure-frame > table > tbody > tr {
  @apply border-b-[1px] border-b-[#aaa];
}

.org-predefined-treestructure-frame > table > thead > tr > th {
  @apply text-[13px] p-[10px] font-bold sticky top-0 bg-white border-none;
}

.org-predefined-treestructure-frame > table > tbody > tr > td {
  @apply text-left text-[13px] border-none p-[10px];
}
</style>

<template>
  <div class="org-predefined-treestructure-body">
    <div class="org-predefined-treestructure-content">
      <span>Workflow Structure</span>
      <div class="org-predefined-treestructure-frame">
        <ul class="tree-container-parent p-[30px]" ref="treeContainer">
          <li
            class="border-[5px] border-[#F18642] p-[30px]"
            v-for="(workflowTable, index) in workflowTables"
            :key="index"
          >
            {{ workflowTable.email }} ({{ workflowTable.role }})
            <ul
              class="tree-container-child p-[30px]"
              v-for="child in workflowTable.children"
              :key="child.email"
            >
              <li class="border-[5px] border-[#F18642] p-[30px]">
                {{ child.email }} ({{ child.role }})
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <button class="rounded-[5px]" @click="goBack()">Back</button>
    </div>
  </div>
</template>

<script>
import "/src/assets/tailwind.css"; // added

import Parse from "parse";
// import { HybridTree } from "@/hybrid_tree.js";
export default {
  data() {
    return {
      workflowTables: [],
    };
  },
  mounted: async function () {
    const Workflow = Parse.Object.extend("PredefinedWorkflow");
    const query = new Parse.Query(Workflow);
    const workflows = await query.first();
    const approvers = workflows.get("approvers");

    this.workflowTables = approvers.map((node) => {
      return {
        email: node.email,
        role: node.role,
        children: node.children,
      };
    });
  },
  methods: {
    async goBack() {
      const orgName = Parse.User.current().get("orgName");
      const Workflow = Parse.Object.extend("PredefinedWorkflow");
      const workflow = new Parse.Query(Workflow);
      workflow.equalTo("orgName", orgName);
      const queryResults = await workflow.find();
      const count = await workflow.count();

      for (let i = 0; i < count; i++) {
        this.$router.push({
          name: "ProcessWorkflow",
          query: {
            templateId: queryResults[i].id,
          },
        });
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
      let button = this.createButton("Add Sequential Approver");
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
          item.innerText = input.value;
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
};
</script>
