<style>
    .indv-nav-frame { @apply font-['Inter'] bg-gradient-to-r from-[#FE5B00] to-[#CD1887] sticky top-0 w-full flex flex-row gap-5 items-center justify-center p-[5px] z-[999]; }
    .indv-nav-frame > .indv-title { @apply flex flex-row items-center justify-center gap-5 px-[10px]; }
    .indv-nav-frame > .indv-title > img { @apply w-[50px] h-auto; }
    .indv-nav-frame > .indv-title > span { @apply font-black text-[30px] text-white; }
    .indv-nav-frame > .indv-nav { @apply flex flex-row items-center justify-end gap-1 grow; }
    .indv-nav-frame > .indv-nav > a { @apply text-white no-underline p-[15px] text-[13px]; }
    .indv-nav-frame > .indv-nav > a:hover, .indv-nav-dropdown:hover { @apply bg-black/30 duration-75; }
    .indv-nav-frame > .indv-nav > a.router-link-exact-active { @apply bg-black/30; }

    .indv-nav-dropdown { @apply flex p-[15px] relative text-white text-[13px] cursor-pointer; }
    .indv-nav-dropdown-content { @apply hidden absolute top-[49.5px] z-[1] text-left w-[250px] left-0 bg-[#2C3E50]; }
    .indv-nav-dropdown:hover .indv-nav-dropdown-content { @apply flex flex-col ; }
    .indv-nav-dropdown-content > a { @apply p-[15px] text-white text-[13px] no-underline; }
    .indv-nav-dropdown-content > a:hover { @apply bg-[#FE5B00] duration-75; }
    .indv-nav-dropdown-content > a.router-link-exact-active { @apply bg-[#FE5B00] duration-75; }
</style>

<template>
    <div class="indv-nav-frame">

        <div class="indv-title">
            <img src="../assets/indv-hashflow-logo.png" />
            <span>HASHFLOW</span>
        </div>

        <div class="indv-nav">
            <router-link :to="{ name: 'home' }">Dashboard</router-link>

            <div class="indv-nav-dropdown">
                <span>Workflow</span>
                <div class="indv-nav-dropdown-content">
                    <router-link :to="{ name: 'recentWorkflow' }">Recently Initiated Workflow</router-link>
                    <router-link :to="{ name: 'workflowInitiation' }">Create Custom Workflow</router-link>
                </div>
            </div>
            
            <router-link :to="{ name: 'notifications' }"> Notifications </router-link>
            <div class="admin-nav-dropdown">
                <span>
                  <i class="fas fa-user-circle fa-user-circle-lg"></i>
                </span>
                <div class="admin-nav-dropdown-content">
                  <router-link :to="{ name: 'UserProfile' }">Profile</router-link>
                  <a href="javascript:void(0)" class="logout" @click="handleLogout">
                    Log out
                  </a>
                </div>
              </div>
        </div>

    </div>
</template>

<script>
    import '/src/assets/tailwind.css'; // added

    import Parse from 'parse';
    export default {
        name: 'NavBarComponent',
        methods: {
            handleLogout(){
				const currentUser = Parse.User.current()
				if(currentUser != null) {
                    Parse.User.logOut(currentUser);
                    this.$router.push("/login")
				}
				else{
					this.$router.push("/login")
				}
			},
        }
    };
</script>