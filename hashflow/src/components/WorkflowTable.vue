<style>
.indv-dashboard-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[100vh] min-w-[800px];
}

/* lock */
.indv-dashboard-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
}

/* lock */

.indv-dashboard-content > span {
  @apply font-black text-[35px] text-left w-full px-[5px];
}

/* lock */

.indv-dashboard-table-frame {
  @apply overflow-auto w-full h-[1px] grow;
}

.indv-dashboard-table-frame > table {
  @apply w-full grow;
}

.indv-dashboard-table-frame > table > tbody > tr {
  @apply border-b-[1px] border-b-[#aaa];
}

.indv-dashboard-table-frame > table > thead > tr > th {
  @apply text-[13px] p-[10px] font-bold sticky top-0 bg-white border-none;
}

.indv-dashboard-table-frame > table > tbody > tr > td {
  @apply text-left text-[13px] border-none p-[10px];
}

.indv-dashboard-table-frame > table > tbody > tr > td > button {
  @apply border-[1px] border-[#F18642] bg-[#F18642] text-white text-[13px] p-[10px] w-full;
}

.indv-dashboard-table-frame > table > tbody > tr > td > button:hover {
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
  <div class="indv-dashboard-body">
    <NavBarComponent />
    <div class="indv-dashboard-content">
      <span>Dashboard</span>

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

      <div class="indv-dashboard-table-frame">
        <table>
          <thead>
            <tr>
              <th>Process Name</th>
              <th>Workflow Created</th>
              <th>File Attachment</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody
            v-for="workflowTable in filteredWorkflowTables"
            :key="workflowTable"
          >
            <tr v-if="workflowTable.total">
              <td>{{ workflowTable.processName }}</td>
              <td>
                {{
                  new Date(workflowTable.dateCreated).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "long", day: "numeric" }
                  )
                }}
              </td>
              <td>
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
              <td>
                <span
                  v-tooltip="{ content: tooltipDescription }"
                  :title="tooltipDescription"
                >
                  <router-link
                    :to="{
                      name: 'UserProgress',
                      query: { progressId: workflowTable.id },
                    }"
                    class="file"
                  >
                    {{ workflowTable.progress }}/{{ workflowTable.total }}
                  </router-link>
                </span>
              </td>
              <td v-if="workflowTable.status != 'Revise'">
                {{ workflowTable.status }}
              </td>
              <td v-if="workflowTable.status == 'Revise'">
                <router-link
                  :to="{
                    name: 'UserComment',
                    query: { reviseId: workflowTable.id },
                  }"
                  >{{ workflowTable.status }}</router-link
                >
              </td>
              <td
                v-if="
                  workflowTable.status != 'Approved' &&
                  workflowTable.status != 'Revise' &&
                  workflowTable.status != 'Reject'
                "
              >
                <a
                  class="file"
                  href="javascript:void(0)"
                  @click="cancelWorkflow(workflowTable.id)"
                >
                  Cancel Workflow
                </a>
              </td>
              <td
                v-if="
                  workflowTable.status == 'Approved' ||
                  workflowTable.status == 'Revise' ||
                  workflowTable.status == 'Reject'
                "
              >
                <a
                  class="file"
                  href="javascript:void(0)"
                  @click="deleteWorkflow(workflowTable.id)"
                >
                  Delete Workflow
                </a>
              </td>
              <td v-if="workflowTable.status == 'Approved'">
                <div v-for="item in workflowTable.showDocument" :key="item">
                  <a
                    class="file"
                    :href="item.url"
                    target="_blank"
                    rel="noopener"
                    @click.prevent="showDocument(item)"
                  >
                    Show Document
                  </a>
                </div>
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
import NavBarComponent from "../components/NavBarComponent";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import "/src/assets/tailwind.css"; // added

import Parse from "parse";
import { HybridTree } from "@/hybrid_tree.js";

import VTooltip from "v-tooltip";

export default {
  name: "WorkflowTable",
  components: {
    NavBarComponent,
  },
  directives: {
    Tooltip: VTooltip,
  },
  data() {
    return {
      workflowTables: [],
      showTooltip: false,
      tooltipDescription: "Approver/s",
      searchText: "",
      currentPage: 1,
      pageSize: 10,
      statusFilter: "",
      statusOptions: ["Pending", "Approved", "Reject", "Revise"],
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
    async cancelWorkflow(workflowId) {
      const confirmed = confirm(
        "Are you sure you want to cancel this workflow?"
      );
      if (confirmed) {
        try {
          const Workflow_Initiation_History = Parse.Object.extend(
            "Workflow_Initiation_History"
          );
          const query = new Parse.Query(Workflow_Initiation_History);
          const workflow = await query.get(workflowId);
          const user = await workflow.get("userInitiated");

          const processName = workflow.get("processName");
          const approver = workflow.get("approvers");
          const firstname = await user.get("name");

          Parse.Cloud.run("cancelWorkflow", {
            id: workflowId,
            firstname: firstname,
            name: processName,
            approver: approver,
          });
          await workflow.destroy();
          // Remove the canceled workflow from the workflowTables array
          this.workflowTables = this.workflowTables.filter(
            (workflowTable) => workflowTable.id !== workflowId
          );
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    async deleteWorkflow(workflowId) {
      const confirmed = confirm(
        "Are you sure you want to delete this workflow?"
      );
      if (confirmed) {
        try {
          const Workflow_Initiation_History = Parse.Object.extend(
            "Workflow_Initiation_History"
          );
          const query = new Parse.Query(Workflow_Initiation_History);
          const workflow = await query.get(workflowId);
          await workflow.destroy();
          // Remove the canceled workflow from the workflowTables array
          this.workflowTables = this.workflowTables.filter(
            (workflowTable) => workflowTable.id !== workflowId
          );
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    async deleteAll() {
      try {
        const Workflow_Initiation_History = Parse.Object.extend(
          "Workflow_Initiation_History"
        );
        const query = new Parse.Query(Workflow_Initiation_History);
        const workflows = await query.find();
        await Parse.Object.destroyAll(workflows);
        this.workflowTables = [];
      } catch (error) {
        console.log(error.message);
      }
    },
    async showDocument(item) {
      // Insert the logo into the PDF document
      const stampedFile = await this.insertStamp(item.url, item.name);

      // Open the stamped file in a new tab
      const fileUrl = URL.createObjectURL(stampedFile);
      const newTab = window.open(fileUrl, "_blank");
      newTab.focus();
    },
    async insertStamp(url, name) {
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const stampFont = await pdfDoc.embedFont(
        StandardFonts.TimesRomanBoldItalic
      );

      // Fetch PNG image
      const logoUrl =
        "http://localhost:1337/api/files/final/dc4ed98cf7e6a9ed7dd97133c59a9bd4_hashflow-logo.png";
      const pngImageBytes = await fetch(logoUrl).then((res) =>
        res.arrayBuffer()
      );

      const logoImage = await pdfDoc.embedPng(pngImageBytes);
      const logoSize = logoImage.scale(0.05);

      const pages = pdfDoc.getPages();
      const length = pages.length;

      for (let i = 0; i < length; i++) {
        pages[i].drawText(
          "*All actors in this workflow for this attachment has given their approval. A computer generated stamp from Hashflow Team",
          {
            x: 5,
            y: 5,
            size: 10,
            font: stampFont,
            color: rgb(0, 0, 0),
          }
        );
        pages[i].drawImage(logoImage, {
          x: 560,
          y: 10,
          width: logoSize.width,
          height: logoSize.height,
        });
      }

      const stampedPdfBytes = await pdfDoc.save();
      const stampedFile = new File([stampedPdfBytes], name, {
        type: "application/pdf",
      });
      return stampedFile;
    },
  },
  mounted: async function () {
    try {
      const Workflow_Initiation_History = new Parse.Object.extend(
        "Workflow_Initiation_History"
      );
      const currentUser = Parse.User.current();
      const userQuery = new Parse.Query(Workflow_Initiation_History);
      const numResults = await userQuery.count();
      userQuery.equalTo("userInitiated", currentUser);
      const queryResults = await userQuery.find();

      for (let i = 0; i < numResults; i++) {
        const approvers = queryResults[i].get("approvers");
        const tree = new HybridTree(approvers);
        const progress = tree.getProgress();
        const roleArray = ["Acknowledger", "Endorser", "Approver"];
        const total = tree.getTotal(roleArray);
        const status = tree.getStatus2();

        this.workflowTables.unshift({
          id: queryResults[i].id,
          processName: queryResults[i].get("processName"),
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
          progress: progress,
          total: total,
          status: status,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
</script>
