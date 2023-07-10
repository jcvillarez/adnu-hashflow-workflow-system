<template>
	<SideBar class="z-[999]" />

	<div class="fixed flex flex-col ml-[260px] h-full">
		<div class="flex flex-row p-[5px]">
			<div class="flex flex-row items-center justify-center gap-5 w-full">
				<img class="w-[50px] h-auto" src="@/assets/hashflow-logo.png" alt="Hashflow Logo"
					onclick="location.href='/';">
			</div>
		</div>
		<div class="font-['Inter'] text-left w-auto z-[1] overflow-x-hidden grow p-[50px]">
			<span class="font-black text-[30px]">HASHFLOW: Organization</span>
			<br>
			<br>
			<p class="text-[16px]">
				Organization is a type of user that represents the existing organizations in the real world. This type of
				user
				can create user accounts of its members, workflow templates labeled as Pre-defined Templates which can be
				used
				by all member users and delete member accounts if necessary. Organization has a specific process for account
				registration or sign up. Go here and follow each instruction.

			</p>
			<br>
			<br>
			<div id="org-dashboard" class="dashboard">
				<strong class="text-[18px]">Dashboard</strong>
				<br>
				<br>
				<p class="text-[16px]">
					The Dashboard for Organization displays different information compared to Individual Users. It displays
					the
					list of members of a specific organization and their account details. Each member will only be displayed
					if
					the Organization created an account for them. Dashboard for the Organization accounts also is the first
					page
					whenever an Organization logs into the system. The Navigation Bar located at the top of each web page,
					displays links, features or options for each type of user. For the Organization it has four; Dashboard,
					New,
					Profile and Logout.
				</p>
				<br>
				<div class="dashboard-list">
					<table class="font-['Inter'] text-[13px]">
						<tr>
							<td class="text-left bg-white w-[125px] font-bold">New</td>
							<td class="text-left bg-white">is the link or option where it has two (2) sub-options; Account
								and
								Workflow. Simply, this is where Organization can create member user accounts and workflow
								templates labeled as Pre-defined Templates in the system.
							</td>
						</tr>
						<tr>
							<td class="text-left bg-white w-[125px] font-bold">Profile</td>
							<td class="text-left bg-white">the user profile information page of the Organization.</td>
						</tr>
						<tr>
							<td class="text-left bg-white w-[125px] font-bold">Logout</td>
							<td class="text-left bg-white">logs out the user.</td>
						</tr>
					</table>
				</div>

			</div>
			<br>
			<br>
			<div id="member-account">
				<strong class="text-[18px]">Create Member Account</strong>
				<br>
				<br>
				<p class="text-[16px]">
					Organization type of user can create member user accounts within the web application in two ways; single
					user account creation and multiple user account creation. To start creating user accounts;
				</p>
				<br>
				<ol class="text-[16px]">
					<li class="ml-[30px] text-[#2C3E50] list-decimal">On any page, hover your cursor over the “Notification”
						located at the
						top right of the navigation bar,
						which will display two options.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Choose Account or User Account.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">A page with two other options will appear; on the left
						side is for the
						single account creation and on
						the right is the multiple account creation.
					</li>
				</ol>
				<br>
				<br>
				<strong class="text-[18px]">Single Account Creation</strong>
				<br>
				<br>

				<ol class="text-[16px]">
					<li class="ml-[30px] text-[#2C3E50] list-decimal">Upon clicking, a simple form will appear which
						requires the
						Organization to fill all fields to
						successfully create the user account.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">A message will appear whenever successful or there is
						an error
						encountered.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">If successful, the Organization can see accounts
						created in the
						Dashboard.
					</li>
				</ol>
				<br>
				<br>
				<strong class="text-[18px]">Multiple Account Creation</strong>
				<br>
				<br>
				<ol class="text-[16px]">
					<li class="ml-[30px] text-[#2C3E50] list-decimal">Upon clicking the button for multiple user account
						creation, it will
						display a template CSV or Comma
						Separated Values file and a file uploader.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Then, Organization are required to download the
						template CSV file by
						clicking the filename highlighted.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">AThe template CSV file is where Organization will
						input and provide the
						user account details for each
						member user. Fully filling all the fields inside the template CSV file is required.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">Opening the template CSV file on softwares like Google
						Sheets or
						Microsoft Excel or any similar
						softwares is allowed however be mindful to save the file as CSV as it was only the format the web
						application follows in turning the data provided into user accounts.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">After filling out for all intended member users,
						upload the edited CSV
						file in the file uploader in the
						web application in the same page and wait for its completion and confirmation.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">If successful, the Organization can see accounts
						created in the
						Dashboard.
					</li>
				</ol>


				<br>
				<br>
				<div id="workflow-template">
					<strong class="text-[18px]">Create Workflow Template</strong>
					<br>
					<br>
					<p class="text-[16px]">
						Pre-defined Templates are workflow templates created by the Organization within the system that
						reflect
						on the existing workflows in their day-to-day operations and transactions. Pre-defined Templates are
						usable to all member users of the Organization within the system. To start;
					</p>
					<br>
					<ol class="text-[16px]">
						<li class="ml-[30px] text-[#2C3E50] list-decimal">In the “New” located at the top right of the
							Navigation Bar, choose
							or click Workflow or Pre-defined
							Template.
						</li>

						<li class="ml-[30px] text-[#2C3E50] list-decimal">A page with two fields will be displayed which are
							both required to
							fill. Process name and Parent
							Office. Parent Office indicates which office or department originated.
						</li>

						<li class="ml-[30px] text-[#2C3E50] list-decimal">After filling out, you have to create its workflow
							structure,
							assign the appropriate actors or
							member users and their respective roles in the workflow. Refer to the Introduction and here for
							more
							context and discussion.
						</li>

						<li class="ml-[30px] text-[#2C3E50] list-decimal">By clicking the button at the button, the
							Pre-defined workflow
							template is created.
						</li>

						<li class="ml-[30px] text-[#2C3E50] list-decimal">All Member users can see the newly created
							workflow template in
							“Workflow” => “Pre-defined
							Template”.
						</li>
					</ol>
					<br>
				</div>
				<br>

				<div id='delete-account'>
					<strong class="text-[18px]">Monitor/Delete Member Account</strong>
					<br>
					<br>
					<p class="text-[16px]">
						To delete a user account;
					</p>
					<br>
					<ol class="text-[16px]">
						<li class="ml-[30px] text-[#2C3E50] list-decimal">Log into the web application using the
							organization account.
						</li>

						<li class="ml-[30px] text-[#2C3E50] list-decimal">In the Dashboard of the Organization, you can view
							and select which
							member user account to delete on
							the button located on the far right side of each member user account details displayed.
						</li>
					</ol>
				</div>

				<br>
				<br>
				<div id='org-profile'>
					<strong class="text-[18px]">Organization Profile</strong>
					<br>
					<br>
					<p class="text-[16px]">
						This page displays the user profile information of the Organization. At the same time, Organization
						can
						update their profile information and password if necessary. To view the Profile;
					</p>
					<br>
					<ol class="text-[16px]">
						<li class="ml-[30px] text-[#2C3E50] list-decimal">In any page, click the “Profile” located at the
							top right of the
							navigation bar.
						</li>

						<li class="ml-[30px] text-[#2C3E50] list-decimal">A page which displays the profile information of
							your organization
						will be displayed.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">To change the profile information, on the same
						page, click on
						“Update Profile” where a simple form
						will appear which you can modify the profile information of your organization if necessary.
					</li>

					<li class="ml-[30px] text-[#2C3E50] list-decimal">To change or update your password, on the same
						page, click on
						“Change Password” where you can update
						your password. Click submit to confirm the changes.
					</li>
				</ol>
			</div>
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

