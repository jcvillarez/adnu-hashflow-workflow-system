<template>
  <ModeratorNavBar />
  <div class="org-dashboard-body">
    <div class="org-dashboard-content">
      <span>Admin Accounts </span>

      <div class="w-full">
        <div class="bar">
          <input
            class="search-bar"
            type="text"
            v-model="searchText"
            @input="searchUsers"
            placeholder="Search Users"
          />
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="org-dashboard-table-frame">
        <table>
          <thead>
            <tr>
              <th style="text-align: center">Organization Users</th>
              <th style="text-align: center">Users Email</th>
              <th style="text-align: center">Date Created</th>
              <th style="text-align: center">Action</th>
            </tr>
          </thead>
          <tbody v-for="user in filteredUsers" :key="user.id">
            <tr v-if="user.role == 'admin'">
              <td style="text-align: center">
                {{ user.orgName }}
              </td>
              <td style="text-align: center">
                {{ user.username }}
              </td>
              <td style="text-align: center">
                {{
                  new Date(user.dateCreated).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </td>
              <td style="text-align: center">
                <button @click="deleteAccount(user.id)">Delete Account</button>
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
export default {
  name: "AdminSide",
  components: {
    ModeratorNavBar,
  },
  data() {
    return {
      users: [],
      searchText: "",
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredUsers.slice(startIndex, endIndex);
    },
    totalPages() {
      if (this.filteredUsers.length == 0) {
        return 1;
      }
      return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
    filteredUsers() {
      let filteredUsers = this.users.filter((user) => {
        return (
          user.name &&
          user.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
      console.log(filteredUsers);
      return filteredUsers;
    },
  },
  methods: {
    async deleteAccount(userId) {
      const confirmed = confirm(
        "Are you sure you want to delete this account?"
      );
      if (confirmed) {
        try {
          await Parse.Cloud.run("deleteUser", { userId });
          this.users = this.users.filter((user) => user.id !== userId);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  mounted: async function () {
    try {
      const User = Parse.Object.extend("_User");
      const user = new Parse.Query(User);
      const userResults = await user.find();
      const count = await user.count();
      for (let i = 0; i < count; i++) {
        this.users.push({
          id: userResults[i].id,
          username: userResults[i].get("username"),
          name: userResults[i].get("name"),
          contact: userResults[i].get("contact"),
          role: userResults[i].get("role"),
          dateCreated: userResults[i].get("createdAt"),
          orgName: userResults[i].get("orgName"),
        });
      }
    } catch (error) {
      alert(error.message);
    }
  },
};
</script>
