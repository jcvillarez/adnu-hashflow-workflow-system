<template>
	<SideBar class="z-[999]"/>
	
	<div class="fixed flex flex-col ml-[260px] h-full">
		<div class="flex flex-row p-[5px]">
			<div class="flex flex-row items-center justify-center gap-5 w-full">
				<img class="w-[50px] h-auto" src="@/assets/hashflow-logo.png" alt="Hashflow Logo" onclick="location.href='/';">
			</div>
		</div>
		<div class="font-['Inter'] text-left w-auto z-[1] overflow-x-hidden grow p-[50px]">
			<span class="font-black text-[30px]">What is  a Workflow?</span>
			<br>
			<br>
			<p class="text-[16px]">
				Workflow at its simplest definition is a series of tasks that achieves a goal. Its relation to process or business processes is that workflow is the steps itself required for a process to be completed or achieve its desired result. But a process can have multiple workflows depending on how complex and large is a process. An example would be a common hiring process; accepting resumes, written tests, interviews, job training, and final decision-making are its workflows.
			</p>
			<br>
			<p class="text-[16px]">
				Workflow has several types which influence the structure and flow of communication and documents between members of the organization assigned in a specific workflow. For the development of HASHFLOW, there were three workflow types that became an inspiration for the system’s implementation. The three were; Sequential, Broadcast, and Hybrid or Parallel.
			</p>
			<br>
			<p class="text-[16px]">
				Sequential is a workflow type that proceeds one-by-one, meaning it completes each step of the workflow one at a time. It has a specific rule which does not allow the workflow to proceed to the next if the current is not completed or in this example below not approved.
			</p>
			<br>
			<p class="text-[16px]">
				Broadcast Workflow is a type of workflow where it does not follow any order at each level or step. It delivers the tasks to all associated persons at the same time. 
			</p>
			<br>
			<p class="text-[16px]">
				Hybrid Workflow  is a combination of both Sequential and Broadcast Workflow. Though it generally follows the same rule as Sequential Workflow. Meaning, as long as the previous approver did not approve the workflow it will not go to the next level.
			</p>
			
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

