<template>
	<SideBar class="z-[999]"/>
	
	<div class="fixed flex flex-col ml-[260px] h-full">
		<div class="flex flex-row p-[5px]">
			<div class="flex flex-row items-center justify-center gap-5 w-full">
				<img class="w-[50px] h-auto" src="@/assets/hashflow-logo.png" alt="Hashflow Logo" onclick="location.href='/';">
			</div>
		</div>
		<div class="font-['Inter'] text-left w-auto z-[1] overflow-x-hidden grow p-[50px]">
			<span class="font-black text-[30px]">HASHFLOW: Account Registration</span>
			<br>
			<br>	
			<p class="text-[16px]">
				There are two types of account signup within HASHFLOW, Individual and Organization. Individual accounts are straightforward and the common process for account signup. However, with accounts created as “Organization”, the initial process is merely for sending an application or request for an account that will be sent to the system administrators of the system. The specific steps are as follows;
			</p>
			<br>
			<ol class="text-[16px]">
				<li class="ml-[30px] text-[#2C3E50] list-decimal">The user or the representative of any organization will sign up as “Organization”.
					<b>(Click Get Started => Create Account as => choose “Organization”)</b>
				</li>
				<li class="ml-[30px] text-[#2C3E50] list-decimal">A simple form will be displayed where it asks the user to fill out together with an attachment proving its legitimacy and legality as a real organization.
				</li>
				
				<li class="ml-[30px] text-[#2C3E50] list-decimal">After submitting the form, the system will verify the request and will send an email notification to the user as soon as verification ends.
				</li>
				
				<li class="ml-[30px] text-[#2C3E50] list-decimal">The user will receive an email notification regarding the account creation request and depending on the verdict of the system, it will also contain the details needed for the user to successfully login into the system.</li>
			</ol>  
			<br>
			<p class="text-[16px]">
				For Individual Users, follow the steps below;
			</p>
			<br>
			<ol class="text-[16px]">
				<li class="ml-[30px] text-[#2C3E50] list-decimal"><b>(Click Get Started => Create Account as => choose “Individual”)</b>
				</li>
				<li class="ml-[30px] text-[#2C3E50] list-decimal">Fill all the fields and click Create Individual Account.
				</li>
				
				<li class="ml-[30px] text-[#2C3E50] list-decimal">You will be redirected to the Login Page if successful. 
					<b>Note: Duplicate Accounts will not be permitted in the system.</b>
				</li>
			</ol>  
		</div>
	</div>
</template>

<script>
	import SideBar from '@/components/SideBar.vue'
	import '/src/assets/tailwind.css'; // added

	export default{
		components: {SideBar},
	}
</script>

