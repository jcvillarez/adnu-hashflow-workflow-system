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
      <span class="font-black text-[30px]">HASHFLOW: USER</span>
      <br />
      <br />
      <p class="text-[16px]">
        Users or Individual users by definition of the implementation of
        HASHFLOW means that users that are not affiliated with any organization
        or more specifically, users that are not registered or included to any
        organization accounts within the system.
      </p>
      <br />
      <br />
      <div id="dashboard" class="dashboard">
        <strong class="text-[18px]">Dashboard</strong>
        <br />
        <br />
        <p class="text-[16px]">
          Hashflow Dashboard is the first displayed page after successful login
          into the system. It displays information depending on the type of user
          logged into the system. For Users or Individual Users, it displays the
          table for the history of workflows initiated using the system, from
          the latest down to the previous workflows. The table has different
          fields; Process Name, File Attachment, Progress, Status and Action.
        </p>
        <br />
        <div class="dashboard-list">
          <table class="font-['Inter'] text-[13px]">
            <tr>
              <td class="text-left bg-white w-[125px] font-bold">
                Process Name
              </td>
              <td class="text-left bg-white">
                the name of the Organizational Process the workflow was created
                for
              </td>
            </tr>
            <tr>
              <td class="text-left bg-white w-[125px] font-bold">
                File Attachment
              </td>
              <td class="text-left bg-white">
                included PDF Files necessary for the workflow.
              </td>
            </tr>
            <tr>
              <td class="text-left bg-white w-[125px] font-bold">Progress</td>
              <td class="text-left bg-white">
                the progress of the workflow. Users can further see the progress
                for each workflow by clicking on the progress.
              </td>
            </tr>
            <tr>
              <td class="text-left bg-white w-[125px] font-bold">Status</td>
              <td class="text-left bg-white">
                the status of the workflow; Pending, Completed, Rejected.
                Pending means the workflow is not yet finished. Completed means
                the workflow has been completed or approved. Rejected means the
                workflow has been rejected or disapproved.
              </td>
            </tr>
            <tr>
              <td class="text-left bg-white w-[125px] font-bold">Action</td>
              <td class="text-left bg-white">
                displays button where users can cancel ongoing workflows and if
                finished can download or view the file attachment that has been
                stamped.
              </td>
            </tr>
          </table>
        </div>
        <br />
        <p class="text-[16px]">
          Users can search any workflow in the search bar, filter the displayed
          workflows based on Status and delete specific and all workflows if
          wanted.
        </p>
      </div>
      <br />
      <br />
      <div id="workflow">
        <strong class="text-[18px]">Workflow</strong>
        <br />
        <br />
        <p class="text-[16px]">
          Users can create workflows of any type (Sequential, Broadcast, Hybrid)
          within the system. To start in creating workflows;
        </p>
        <br />
        <ol class="text-[16px]">
          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            From the Dashboard, go to “Workflow” located on the top right of the
            navigation bar.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Then choose what you want to; either to create Custom Workflows or
            use the recently created workflows.
          </li>
        </ol>
        <br />
        <br />
        <strong class="text-[18px]">Create Custom Workflow</strong>
        <br />
        <br />
        <p class="text-[16px]">
          Custom Workflows by the system’s definition are workflows that may or
          may not be based on existing workflows of organizational processes.
          For individual users, these are customized workflows that cater to
          their specific needs and situations. To start creating custom
          workflows;
        </p>
        <br />
        <ol class="text-[16px]">
          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            In the Workflow, located at the top right of the navigation bar
            choose “Custom Workflow”
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            A form will be displayed where users are to fill out. The required
            fields are Process Name, Description, and Attachment.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Process Name is the name of the process the workflow will be
            created. Be sure to choose a name that is easy to understand by the
            assigned actors in the workflow.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Description is the context of the workflow. It answers the What,
            Why, When, Where and How of the workflow. Be sure to provide a
            detailed description or context about the workflow. Attachments are
            files needed or necessary for the workflow.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Attachments are files needed or necessary for the workflow. The
            system only allows PDF Files.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Create the workflow structure and assign appropriate approvers at
            each level.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            If finished, initiate the workflow by clicking “Initiate Workflow”
            located at the bottom of the page.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            You will be redirected to the Dashboard where you can see the latest
            workflow created.
          </li>
        </ol>
        <br />
        <br />
        <strong class="text-[18px]">Recently Created Workflow</strong>
        <br />
        <br />
        <p class="text-[16px]">
          Recently Created Workflows are saved workflow templates based on the
          created workflow by the users. Whenever a user creates a workflow, a
          workflow template is created allowing the user to reuse the template
          whenever needed. To start using the workflow template from custom
          workflows;
        </p>
        <br />
        <ol class="text-[16px]">
          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            In the Workflow, located at the top right of the navigation bar
            choose “Recently Created Workflow”.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            A table will be displayed on the redirected page where you can
            select existing workflow templates based from custom workflows. It
            will be empty if the user did not create any custom workflow before.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            After choosing a workflow template, a form will be displayed.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Users can modify the fields depending on their needs.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            File Attachment Field will be empty and users are required to upload
            PDF Files again for the workflow.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Create the workflow structure and assign appropriate approvers at
            each level
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            If finished, initiate the workflow by clicking “Initiate Workflow”
            located at the bottom of the page.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            You will be redirected to the Dashboard where you can see the latest
            workflow created.
          </li>
        </ol>
        <br />
        <br />
        <strong class="text-[18px]">Workflow Structure</strong>
        <br />
        <br />
        <p class="text-[16px]">
          After a User fills out the simple form regardless of whether it is a
          custom workflow or a workflow based in a template, users will have to
          create or modify the workflow structure for the specific workflow
          being created. As mentioned, HASHFLOW adapts a tree structure in the
          implementation of creating workflow structure in the web application.
          At the same time, users can assign other users and their respective
          roles within the workflow. There are four (4) roles available;
          Approver, Viewer, Endorser and Acknowledgement. You can only assign
          other users that have an account in the web application and are also
          signed up as “Individual”.
        </p>
        <br />
        <p class="text-[16px]">
          If you have not read the previous sections of this page, go to
          <a href="#/tree">this</a> and the
          <a href="/intro">Introduction</a> for more information and discussion.
        </p>
      </div>
      <br />
      <br />
      <div id="approval">
        <strong class="text-[18px]">Approval Request</strong>
        <br />
        <br />
        <p class="text-[16px]">
          As mentioned in the previous section, users or individual users can
          assign other individual users in a workflow. And based on the role,
          you assigned or you were assigned as you can provide a verdict for
          each workflow assigned to you. The verdict or decision available are
          as follows;
        </p>
        <br />
        <ol class="text-[16px]">
          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Approve/Viewed/Endorsed/Acknowledged which are positive verdicts.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Reject/Disapproved are negative verdict meaning that an assigned
            user does not approve the workflow or its content for example.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Revise meaning there are missing parts/files or mistakes done by the
            user initiating the workflow that is not agreeable to the specific
            assigned user.
          </li>
        </ol>
        <br />
        <p class="text-[16px]">To see and provide verdict to the workflows;</p>
        <br />
        <ol class="text-[16px]">
          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            If you are logged into the web application, there is an option
            labeled as “Notification” located at the top right of the navigation
            bar.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            If you are not logged into the web application, you can check your
            Gmail account used to sign up in the system as Hashflow also sends
            email notification whenever a user is assigned to a workflow.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Users might not see the notifications instantly depending on the
            structure of the workflow. For broadcast workflows, all actors will
            receive notifications at the same time. For sequential, the
            notification will be sent one by one, after the current assigned
            user approved.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Upon seeing and receiving the notification in the web application
            and after clicking “Notification”, a page will be displayed which
            contains the notifications needed attention. Each notification
            contains the relevant information about the workflow, file
            attachments and the action each assigned user can take.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Whenever an assigned user provides a verdict, the web application
            will require the user to provide their password as a form of
            authentication and verification that you are providing the verdict
            as the person itself assigned.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            If you are not logged into the system and viewed the notification
            via Gmail. You can also view the information about the workflow.
            However, to provide a verdict, you can click the actions or buttons
            available in the email and you will be redirected to the web
            application where you will be required to log in first before
            proceeding to provide your verdict. The next steps are the same with
            item number 5.
          </li>
        </ol>
      </div>
      <br />
      <br />
      <div id="profile">
        <strong class="text-[18px]">User Profile</strong>
        <br />
        <br />
        <p class="text-[16px]">
          The page where users can view and modify their user profile if
          necessary. Users can also change their password on this page. To go to
          your user profile;
        </p>
        <br />
        <ol class="text-[16px]">
          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Find the “Profile” in the top right of the navigation bar.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            Go to the page by clicking “Profile”.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            To change your profile, click “Change Profile”. Where a simple form
            will be displayed where you can modify your user profile.
          </li>

          <li class="ml-[30px] text-[#2C3E50] list-decimal">
            To change your password, click “Change Password”. Provide the new
            password and submit.
          </li>
        </ol>
      </div>
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
