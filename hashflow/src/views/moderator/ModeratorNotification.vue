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
    <ModeratorNavBar />
    <div class="indv-dashboard-content">
      <span>Notifications</span>

      <div class="indv-dashboard-table-frame">
        <table>
          <thead>
            <tr>
              <th class="text-center">Requested By</th>
              <th class="text-center">Date Requested</th>
              <th class="text-center">Organization Name</th>
              <th class="text-center">Organization Email</th>
              <th class="text-center">Organization Address</th>
              <th class="text-center">Organization Contact</th>
              <th class="text-center">Organization Permit</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody v-for="approval in approvals" :key="approval.id">
            <tr>
              <td style="text-align: center">{{ approval.name }}</td>
              <td style="text-align: center">{{ approval.date }}</td>
              <td style="text-align: center">{{ approval.orgName }}</td>
              <td style="text-align: center">{{ approval.orgEmail }}</td>
              <td style="text-align: center">{{ approval.address }}</td>
              <td style="text-align: center">{{ approval.contact }}</td>
              <td
                v-for="file in approval.files"
                :key="file"
                style="text-align: center"
              >
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
                    name: 'ModeratorPasswordVerify',
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
                    @click.once="approverDecide(verdict, approval.id)"
                  >
                    {{ verdict.approve }} {{ verdict.reject }}
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
import ModeratorNavBar from "@/components/ModeratorNavBar.vue";
import "/src/assets/tailwind.css"; // added
import { HybridTree } from "@/hybrid_tree.js";
import Parse from "parse";
export default {
  name: "ModeratorNotification",
  components: {
    ModeratorNavBar,
  },
  data() {
    return {
      verdicts: [
        { name: "Approved", approve: "Approve" },
        { name: "Reject", reject: "Reject" },
      ],
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
    approverDecide(verdict, id) {
      const currentUser = Parse.User.current();
      if (currentUser != null) {
        this.decision = verdict.name;
        this.createAccount(this.approvals.find((approval) => approval.id == id));
        alert("Verify First!");
      } else {
        alert("Please login first!");
        this.$router.push("/login");
      }
    },
    createAccount(approval) {
      const randomPassword = (length) => {
        const chars =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const password = [];
        for (let i = 0; i < length; i++) {
          password.push(chars[Math.floor(Math.random() * chars.length)]);
        }
        const pass = password.join("");
        return pass;
      };
      const currentUser = Parse.User.current();
      if (currentUser != null) {
        const newAccount = new Parse.User();
        newAccount.set("username", approval.orgEmail);
        const password = randomPassword(8);
        newAccount.set("password", password);
        newAccount.set("confirm_password", password);
        newAccount.set("name", approval.orgName);
        newAccount.set("orgName", approval.orgName);
        newAccount.set("address", approval.address);
        newAccount.set("contact", approval.contact);
        newAccount.set("role", "admin");
        newAccount.save().then(async () => {
          const Account = Parse.Object.extend(Parse.User);
          const account = new Parse.Query(Account);
          account.equalTo("username", approval.orgEmail);
          const count = await account.count();
          const user = await account.find();

          for (let i = 0; i < count; i++) {
            const email = user[i].get("username");
            const password = user[i].get("confirm_password");
            const orgName = user[i].get("orgName");
            const address = user[i].get("address");
            const contact = user[i].get("contact");

            // Store the password value in a variable
            const generatedPassword = password;

            Parse.Cloud.run("sendAccount", {
              email: email,
              password: generatedPassword,
              orgName: orgName,
              address: address,
              contact: contact,
            });
          }
        });

        const orgProfile = new Parse.Object.extend("OrgProfile");
        const profile = new orgProfile();

        profile.set("orgName", approval.orgName);
        profile.set("address", approval.address);
        profile.set("username", approval.orgEmail);
        profile.set("contact", approval.contact);

        profile.save();
      } else {
        alert("Please login first!");
        this.$router.push("/login");
      }
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
        const PendingAAccounts = Parse.Object.extend(
          "PendingAdminAccount"
        );
        const approver = new Parse.Query(PendingAAccounts);
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
            const approvers = approverResults[i].get("approvers");
            const tree = new HybridTree(approvers);

            const status = tree.getStatus(email);

            if (status == "Pending") {
              this.approvals.unshift({
                id: approverResults[i].id,
                name: approverResults[i].get("requestor"),
                date: approverResults[i].createdAt.toLocaleDateString(),
                orgName: approverResults[i].get("orgName"),
                orgEmail: approverResults[i].get("orgEmail"),
                address: approverResults[i].get("address"),
                contact: approverResults[i].get("contact"),
                status: status,
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
