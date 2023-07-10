<template>
  <SideBar class="z-[999]" />

  <div class="fixed flex flex-col ml-[260px] h-full">
    <div class="flex flex-row p-[5px]">
      <div class="flex flex-row items-center justify-center gap-5 w-full">
        <img
          class="w-[50px] h-auto"
          src="@/assets/hashflow-logo.png"
          alt="Hashflow Logo"
          onclick="location.href='/';"
        />
      </div>
    </div>
    <div
      class="font-['Inter'] text-left w-auto z-[1] overflow-x-hidden grow p-[50px]"
    >
      <span class="font-black text-[30px]">HASHFLOW: Tree Structure</span>

      <br />
      <br />
      <p class="text-[16px]">
        Hashflow implemented a tree structure in creating the workflow
        structure, assigning other users for a specific roles within the
        workflow which provides the system with allowing the user to create
        workflows dynamically. For this implementation, there are two distinct
        terms; Parent and child. It can also be translated to main branch and
        sub-branches.
      </p>
      <br />
      <br />
      <img class="mx-auto" src="@/assets/tree.png" alt="Tree Structure" />
      <br />
      <br />
      <p class="text-[16px]">
        The sample diagram above is an illustration of a Hybrid Worfklow
        following the Tree Structure. For “Sequential'' workflow, each
        succeeding approver or user becomes a branch of the approver before it,
        much like a single tree branch having different small branches the
        further the branch goes.When a user adds a “Broadcast” it is treated by
        the system as a giant branch or a parent. “Sequential'' workflows has a
        structure of Parent => child => child => child(n) while “Broadcast” is
        Parent => Parent => Parent where each Parent can have its children or
        branches.And Hybrid workflows is a combination of the two, having a
        sample structure of Parent( => (child => child) => child ) & Parent (=>
        child => child). As illustrated above.
      </p>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import "/src/assets/tailwind.css"; // added

export default {
  components: { SideBar },
};
</script>
