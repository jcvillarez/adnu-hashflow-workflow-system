<template>
	<SideBar class="z-[999]"/>
	
	<div class="fixed flex flex-col ml-[260px] h-full">
		<div class="flex flex-row p-[5px]">
			<div class="flex flex-row items-center justify-center gap-5 w-full">
				<img class="w-[50px] h-auto" src="@/assets/hashflow-logo.png" alt="Hashflow Logo" onclick="location.href='/';">
			</div>
		</div>
		<div class="font-['Inter'] text-left w-auto z-[1] overflow-x-hidden grow p-[50px]">
			<span class="font-black text-[30px]">HASHFLOW: MEMBER</span>
			<br>
			<br>
			<p class="text-[16px]">
				Member or Member users are also types of users which only exist within an organization. Meaning member users
				cannot assign Individual users in workflows. At the same time, member users cannot create their own account
				within the system but their organization or the user maintaining the user account of their organization in the
				system. However, they can create their own individual user account if you want, just make sure it's not your
				affiliated email address that you will use for your individual account to avoid duplicate accounts within the
				web application if your organization decided to use the services of the web application. Since HASHFLOW does not
				allow duplicate accounts or accounts using the same email address or username.
			</p>
			<br>
			<p class="text-[16px]">
				Individual Users and Member Users have almost the same features available, the only difference is that for
				Individual users they can create their own account and for Member users to have an additional options in the
				“Workflow” which is Pre-defined Template that consists of workflow templates created by their organization.
			</p>
			<br>
			<br>
			
			<div id="member-workflow">
				<strong class="text-[18px]">Create Custom Workflow</strong>
				<br>
				<br>
				<ol class="text-[16px]">
					<li class="ml-[30px] text-[#2C3E50] list-decimal">In the Workflow, located at the top right of the navigation bar
						choose “Custom Workflow”
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">A form will be displayed where users are to fill out. The required
						fields are Process Name, Description, and Attachment.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Process Name is the name of the process the workflow will be
						created. Be sure to choose a name that is easy to understand by the assigned actors in the workflow.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Description is the context of the workflow. It answers the What,
						Why, When, Where and How of the workflow. Be sure to provide a detailed description or context about
						the workflow.</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Attachments are files needed or necessary for the workflow. The
						system only allows PDF Files.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Create the workflow structure and assign appropriate approvers at
						each level
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">If finished, initiate the workflow by clicking “Initiate Workflow”
						located at the bottom of the page.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">You will be redirected to the Dashboard where you can see the
						latest workflow created.</li>
				</ol>
				<br>
				<br>
				<strong class="text-[18px]">Recently Created Workflow</strong>
				<br>
				<br>
				<p class="text-[16px]">
					Recently Created Workflows are saved workflow templates based on the created workflow by the users.
					Whenever a user creates a workflow, a workflow template is created allowing the user to reuse the
					template whenever needed. To start using the workflow template from custom workflows;
				</p>
				<br>
				<ol class="text-[16px]">
					<li class="ml-[30px] text-[#2C3E50] list-decimal">In the Workflow, located at the top right of the navigation bar
						choose “Recently Created Workflow”.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">A table will be displayed on the redirected page where you can
						select existing workflow templates based from custom workflows. It will be empty if the user did not
						create any custom workflow before.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">After choosing a workflow template, a form will be displayed.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Users can modify the fields depending on their needs.</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">File Attachment Field will be empty and users are required to
						upload PDF Files again for the workflow.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Create the workflow structure and assign appropriate approvers at
						each level
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">If finished, initiate the workflow by clicking “Initiate Workflow”
						located at the bottom of the page.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">You will be redirected to the Dashboard where you can see the
						latest workflow created.</li>
				</ol>
				<br>
				<br>
				<strong class="text-[18px]">Pre-Defined Template</strong>
				<br>
				<br>
				<p class="text-[16px]">
					Pre-defined Templates are workflow templates created by the Organization that create each member user
					account. To start;
				</p>
				<br>
				<ol class="text-[16px]">
					<li class="ml-[30px] text-[#2C3E50] list-decimal">In the Workflow, located at the top right of the navigation bar
						choose “Pre-defined Template”.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">A table will be displayed on the redirected page where you can
						select existing workflow templates created by the Organization the Member user belongs to.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">After choosing a workflow template, a form will be displayed.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Member users can modify the fields depending on their needs.</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">File Attachment Field will be empty and users are required to
						upload PDF Files again for the workflow.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Create the workflow structure and assign appropriate approvers at
						each level. You can assign users present only within your organization or the members of your
						organization that has an account within the system created by your organization.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">If finished, initiate the workflow by clicking “Initiate Workflow”
						located at the bottom of the page.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">You will be redirected to the Dashboard where you can see the
						latest workflow created.</li>
				</ol>

			</div>
			<br>
			<br>
			<div id="member-approval">
				<strong class="text-[18px]">Approval Request</strong>
				<br>
				<br>
				<p class="text-[16px]">
					As mentioned in the previous section, member users can only assign other members users in a workflow that
					are withing their organization or those members that are already created an account by the Organization. And
					based on the role, you assigned or you were assigned as you can provide a verdict for each workflow assigned
					to you. The verdict or decision available are as follows;
				</p>
				<br>
				<ol class="text-[16px]">
					<li class="ml-[30px] text-[#2C3E50] list-decimal">Approve/Viewed/Endorsed/Acknowledged which are positive verdicts.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Reject/Disapproved are negative verdict meaning that an assigned user
						does not approve the workflow or its content for example.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Revise meaning there are missing parts/files or mistakes done by the
						user initiating the workflow that is not agreeable to the specific assigned user.
					</li>
				</ol>
				<br>
				<p class="text-[16px]">
					To see and provide verdict to the workflows;
				</p>
				<br>
				<ol class="text-[16px]">
					<li class="ml-[30px] text-[#2C3E50] list-decimal">If you are logged into the web application, there is an option labeled
						as “Notification” located at the top right of the navigation bar
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">If you are not logged into the web application, you can check your
						Gmail account used to sign up in the system as Hashflow also sends email notification whenever a user is
						assigned to a workflow.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Members might not see the notifications instantly depending on the
						structure of the workflow. For broadcast workflows, all actors will receive notifications at the same
						time. For sequential, the notification will be sent one by one, after the current assigned user
						approved.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Upon seeing and receiving the notification in the web application and
						after clicking “Notification”, a page will be displayed which contains the notifications needed
						attention. Each notification contains the relevant information about the workflow, file attachments and
						the action each assigned user can take.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Whenever an assigned user provides a verdict, the web application will
						require the user to provide their password as a form of authentication and verification that you are
						providing the verdict as the person itself assigned.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">If you are not logged into the system and viewed the notification via
						Gmail. You can also view the information about the workflow. However, to provide a verdict, you can
						click the actions or buttons available in the email and you will be redirected to the web application
						where you will be required to log in first before proceeding to provide your verdict. The next steps are
						the same with item number 5.
					</li>
				</ol>
			</div>
		</div>
	</div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import '/src/assets/tailwind.css'; // added

export default {
	components: { SideBar },
}
</script>

