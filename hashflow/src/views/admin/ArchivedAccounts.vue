<style>
.org-dashboard-body {
  @apply flex flex-col items-center justify-center font-['Inter'] h-[90vh] min-w-[800px];
}

/* lock */
.org-dashboard-content {
  @apply flex flex-col items-center justify-start grow w-full max-w-[1280px] py-[30px];
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
  <AdminNavBarComponent />
  <div class="org-dashboard-body">
    <div class="org-dashboard-content">
      <span>Admin Dashboard </span>

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
            <tr v-if="user.role == 'orgUser'">
              <td style="text-align: center">
                {{ user.name }}
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
                <button @click="unArchiveAccount(user.id)">
                  Unarchive Account
                </button>
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
import AdminNavBarComponent from "@/components/AdminNavBarComponent.vue";
import "/src/assets/tailwind.css";
import Parse from "parse";
export default {
  name: "AdminSide",
  components: {
    AdminNavBarComponent,
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
      return filteredUsers;
    },
  },
  methods: {
    async unArchiveAccount(userId) {
      try {
        // Get the session token of the current user
        const sessionToken = Parse.User.current().getSessionToken();

        // Call the Parse Cloud function with the session token
        await Parse.Cloud.run("unArchiveUser", { userId }, { sessionToken });

        // Optionally, you can remove the archived user from the local users list
        this.users = this.users.filter((user) => user.id !== userId);

        console.log("User Unarchived successfully");
      } catch (error) {
        console.log("Failed to archive user:", error);
      }
    },
  },
  mounted: async function () {
    try {
    //   const archived = Parse.User.current().get("archived");
      const Users = Parse.Object.extend("_User");
      const user = new Parse.Query(Users);
      user.equalTo("archived", true);
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
        });
      }
    } catch (error) {
      alert(error.message);
    }
  },
};
</script>
