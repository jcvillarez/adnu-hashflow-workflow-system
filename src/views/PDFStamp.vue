<template>
	<SideBar class="z-[999]"/>
	
	<div class="fixed flex flex-col ml-[260px] h-full">
		<div class="flex flex-row p-[5px]">
			<div class="flex flex-row items-center justify-center gap-5 w-full">
				<img class="w-[50px] h-auto" src="@/assets/hashflow-logo.png" alt="Hashflow Logo" onclick="location.href='/';">
			</div>
		</div>
		<div class="font-['Inter'] text-left w-auto z-[1] overflow-x-hidden grow p-[50px]">
			<span class="font-black text-[30px]">PDF Stamp API</span>
			<br>
			<br>	
			<p class="text-[16px]">
				Hashflow uses an API to modify and put stamps on PDF Files uploaded by users when creating workflows in the web application. The API used is called PDF-LIB. For more info go to this <a href="https://pdf-lib.js.org/" target="_blank">website</a>. 
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

