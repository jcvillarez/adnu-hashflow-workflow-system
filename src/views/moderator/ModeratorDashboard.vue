<style>
.org-dashboard-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[89vh] min-w-[800px];
}

/* lock */
.org-dashboard-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[25px];
}

/* lock */

.org-dashboard-content > span {
  @apply font-black text-[25px] text-left w-full px-[5px];
}

/* lock */

.org-dashboard-table-frame {
  @apply overflow-auto w-full h-[1px] grow;
}

.org-dashboard-table-frame > table {
  @apply w-full grow;
}

.org-dashboard-table-frame > table > tbody > tr {
  @apply border-b-[1px] border-b-[#aaa];
}

.org-dashboard-table-frame > table > thead > tr > th {
  @apply text-[13px] p-[10px] font-bold sticky top-0 bg-white border-none;
}

.org-dashboard-table-frame > table > tbody > tr > td {
  @apply text-left text-[13px] border-none p-[10px];
}

.org-dashboard-table-frame > table > tbody > tr > td > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}

.org-dashboard-table-frame > table > tbody > tr > td > button:hover {
  @apply border-[#F18642] bg-transparent text-[#F18642] duration-75;
}

.bar {
  @apply flex flex-row items-center justify-end;
}

.bar > input {
  @apply border-[1px] border-[#aaa] p-[10px] h-full w-[500px];
}
.bar > select {
  @apply border-[1px] border-[#aaa] p-[10px] h-full w-[500px] w-[200px];
}

.bar > div {
  @apply grow;
}
</style>

<template>
  <ModeratorNavBar />
  <div class="org-dashboard-body">
    <div class="org-dashboard-content">
      <span>{{ orgName }} Dashboard </span>

      <div class="w-full">
        <div class="bar">
          <input
            class="search-bar"
            type="text"
            v-model="searchText"
            placeholder="Search process..."
          />
          <div></div>
          <select v-model="statusFilter" class="status-filter">
            <option value="">All</option>
            <option v-for="statusOption in statusOptions" :key="statusOption">
              {{ statusOption }}
            </option>
          </select>
          <div></div>
          <button @click="deleteAll" class="delete-all-button">
            Delete All
          </button>
        </div>
      </div>

      <div class="org-dashboard-table-frame">
        <table>
          <thead>
            <tr>
              <th style="text-align:center">Organization</th>
              <th style="text-align:center">Request Created</th>
              <th style="text-align:center">Organization Permit</th>
              <th style="text-align:center">Status</th>
            </tr>
          </thead>
          <tbody
            v-for="workflowTable in filteredWorkflowTables"
            :key="workflowTable"
          >
            <tr>
              <td style="text-align:center">{{ workflowTable.processName }}</td>
              <td style="text-align:center">
                {{
                  new Date(workflowTable.dateCreated).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "long", day: "numeric" }
                  )
                }}
              </td>
              <td style="text-align:center">
                <a
                  class="file"
                  v-for="item in workflowTable.files"
                  :key="item"
                  v-bind:href="item.url"
                  target="_blank"
                  rel="noopener"
                  >{{ item.name }}</a
                >
              </td>
              <td style="text-align:center">
                {{ workflowTable.status }}
              </td>
            </tr>
          </tbody>
        </table>
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
  </div>
</template>

<script>
import ModeratorNavBar from "@/components/ModeratorNavBar.vue";
import "/src/assets/tailwind.css";

import Parse from "parse";
import { HybridTree } from "@/hybrid_tree.js";

export default {
  name: "ModeratorDashboard",
  components: {
    ModeratorNavBar,
  },
  data() {
    return {
      workflowTables: [],
      searchText: "",
      currentPage: 1,
      pageSize: 10,
      statusFilter: "",
      statusOptions: ["Pending", "Approved"],
    };
  },
  computed: {
    orgName() {
      return Parse.User.current().get("orgName");
    },
    paginatedWorkflowTables() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredWorkflowTables.slice(startIndex, endIndex);
    },
    totalPages() {
      if (this.filteredWorkflowTables.length == 0) {
        return 1;
      }
      return Math.ceil(this.filteredWorkflowTables.length / this.pageSize);
    },
    filteredWorkflowTables() {
      let filteredTables = this.workflowTables.filter((table) => {
        return (
          table.processName
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) &&
          (this.statusFilter === "" || table.status === this.statusFilter)
        );
      });
      return filteredTables;
    },
  },
  methods: {
    async deleteAll() {
      try {
        const PendingAdminAccount = Parse.Object.extend(
          "PendingAdminAccount"
        );
        const query = new Parse.Query(PendingAdminAccount);
        const pending = await query.find();
        await Parse.Object.destroyAll(pending);
        this.workflowTables = [];
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mounted: async function () {
    try {
      const PendingAdminAccount = new Parse.Object.extend(
        "PendingAdminAccount"
      );
      const userQuery = new Parse.Query(PendingAdminAccount);
      const numResults = await userQuery.count();
      const queryResults = await userQuery.find();

      for (let i = 0; i < numResults; i++) {
        const approvers = queryResults[i].get("approvers");
        const tree = new HybridTree(approvers);
        const status = tree.getStatus2();

        this.workflowTables.unshift({
          id: queryResults[i].id,
          processName: queryResults[i].get("orgName"),
          dateCreated: queryResults[i].get("createdAt"),
          files: queryResults[i].get("userFile").map((obj) => {
            return {
              name: obj.name().substring(obj.name().indexOf("_") + 1),
              url: obj.url(),
            };
          }),
          showDocument: queryResults[i].get("userFile").map((obj) => {
            return {
              name: obj.name().substring(obj.name().indexOf("_") + 1),
              url: obj.url(),
            };
          }),

          status: status,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
</script>