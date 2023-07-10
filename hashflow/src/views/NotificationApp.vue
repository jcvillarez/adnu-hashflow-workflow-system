<style>
button,
.back-button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-[100px];
}
button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.info {
  @apply text-left mt-[150px] mb-[10px];
}

.approval-frame {
  @apply mx-auto w-[400px];
}
.info {
  @apply border-[1px] border-[#aaa] p-[10px];
}
.decide {
  @apply flex flex-row mx-auto w-[400px] mb-[5px] border-[1px] border-[#aaa] p-[10px];
}
.decide > .buttons-frame-info {
  @apply flex flex-row grow gap-3 items-center justify-start;
}
.decide > .buttons-frame-button {
  @apply flex flex-row grow gap-3 items-center justify-end;
}
.decide > .buttons-frame-button > a {
  @apply flex flex-row gap-3;
}

a {
  @apply no-underline;
}
</style>

<template>
  <div class="indv-dashboard-body">
    <NavBarComponent />
    <div class="indv-dashboard-content">
      <span>Notifications</span>
      <div class="indv-dashboard-table-frame">
        <table>
          <thead>
            <tr>
              <th class="text-center">Initiated by</th>
              <th class="text-center">Date created</th>
              <th class="text-center">Process Name</th>
              <th class="text-center">Description</th>
              <th class="text-center">File attached</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody v-for="approval in approvals" :key="approval">
            <tr class="text-center">
              <td>{{ approval.initiated }}</td>
              <td>{{ approval.date }}</td>
              <td>{{ approval.process }}</td>
              <td>{{ approval.description }}</td>
              <td v-for="file in approval.files" :key="file">
                <a
                  class="text-[blue] font-bold cursor-pointer"
                  v-bind:href="file.url"
                  target="_blank"
                  rel="noopener"
                  >{{ file.name }}</a
                >
              </td>
              <td class="flex flex-row gap-3 align-bottom">
                <router-link
                  :to="{
                    name: 'PasswordView',
                    query: {
                      approvalId: approval.id,
                      verdict: decision,
                    },
                  }"
                  v-for="verdict in verdicts"
                  :key="verdict.id"
                >
                  <button
                    class="rounded-[5px]"
                    @click.once="approverDecide(verdict, id)"
                  >
                    {{ verdict.approve }} {{ verdict.reject }}
                  </button>
                </router-link>
                <router-link
                  :to="{
                    name: 'ReviseView',
                    query: {
                      approvalId: approval.id,
                      edit: decision,
                    },
                  }"
                  v-for="edit in edits"
                  :key="edit.id"
                >
                  <button
                    class="deci rounded-[5px]"
                    @click.once="approverEdit(edit, id)"
                  >
                    {{ edit.revise }}
                  </button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="decision">
          <input type="hidden" v-model="decision" />
        </div>
      </div>
    </div>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="currentPage--">
        Previous
      </button>

      <button :disabled="currentPage === totalPages" @click="currentPage++">
        Next
      </button>
    </div>

    <div class="total-pages">Page {{ currentPage }} of {{ totalPages }}</div>
  </div>
</template>

<script>
import NavBarComponent from "@/components/NavBarComponent.vue";
import "/src/assets/tailwind.css"; // added
import { HybridTree } from "@/hybrid_tree.js";
import Parse from "parse";
export default {
  name: "NotificationApp",
  components: {
    NavBarComponent,
  },
  data() {
    return {
      verdicts: [
        { name: "Approved", approve: "Approve" },
        { name: "Reject", reject: "Reject" },
      ],
      edits: [{ name: "Revise", revise: "Revise" }],
      decision: "Approved",
      approvals: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    totalPages() {
      if (this.approvals.length == 0) {
        return 1;
      }
      return Math.ceil(this.approvals.length / this.pageSize);
    },
  },
  methods: {
    approverDecide(verdict) {
      const currentUser = Parse.User.current();
      if (currentUser != null) {
        this.decision = verdict.name;
        alert("Verify First!");
      } else {
        alert("Please login first!");
        this.$router.push("/login");
      }
    },
    approverEdit(edit) {
      this.decision = edit.name;
    },
  },
  mounted: async function () {
    const currentUser = Parse.User.current();
    if (currentUser == null) {
      alert("Please login first!");
      this.$router.push("/login");
    } else {
      try {
        const email = Parse.User.current().get("username");
        const Workflow_Initiation_History = Parse.Object.extend(
          "Workflow_Initiation_History"
        );
        const approver = new Parse.Query(Workflow_Initiation_History);
        const approverResults = await approver.find();

        if (approverResults.length != 0) {
          for (let i = 0; i < approverResults.length; i++) {
            const files = (await approverResults[i].get("userFile")).map(
              (item) => {
                return {
                  name: item.name().substring(item.name().indexOf("_") + 1),
                  url: item.url(),
                };
              }
            );
            const user = approverResults[i].get("userInitiated");
            await user.fetch();
            const approvers = approverResults[i].get("approvers");
            const tree = new HybridTree(approvers);

            const status = tree.getStatus(email);
            const role = tree.getRole(email);

            if (status != "Hidden") {
              this.approvals.unshift({
                id: approverResults[i].id,
                initiated: user.get("name"),
                date: approverResults[i].createdAt.toLocaleDateString(),
                process: approverResults[i].get("processName"),
                description: approverResults[i].get("message"),
                status: status,
                roles: role,
                files: files,
              });
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  },
};
</script>
