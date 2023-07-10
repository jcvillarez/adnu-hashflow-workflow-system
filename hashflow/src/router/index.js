import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import SignupUserView from "@/views/SignupUserView.vue";
import SignupAdminView from "@/views/SignupAdminView.vue";
import SignupUserPending from "@/views/SignupUserPending.vue";
import WorkflowInitiation from "@/views/WorkflowInitiation.vue";
import OrgWorkflowInitiation from "@/views/organization/OrgWorkflowInitiation.vue";
import Admin from "@/views/admin/Admin.vue";
import ArchivedAccounts from "@/views/admin/ArchivedAccounts.vue";
import CreateAccount from "@/views/admin/CreateAccount.vue";
import DefineProcessWorkflow from "@/views/admin/DefineProcessWorkflow.vue";
import EditAdminProfile from "@/views/admin/EditAdminProfile.vue";
import AdminProfile from "@/views/admin/AdminProfile.vue";
import RecentWorkflow from "@/views/RecentWorkflow.vue";
import EditRecentWorkflow from "@/views/EditRecentWorkflow.vue";
import OrgRecentWorkflow from "@/views/organization/OrgRecentWorkflow.vue";
import OrgEditRecentWorkflow from "@/views/organization/OrgEditRecentWorkflow.vue";
import OrgPredefinedWorkflow from "@/views/organization/OrgPredefinedWorkflow.vue";
import OrgEditPredefinedWorkflow from "@/views/organization/OrgEditPredefinedWorkflow.vue";
import SignupAs from "@/views/SignupAs.vue";
import ApprovalPage from "@/views/ApprovalPage.vue";
import OrgApprovalPage from "@/views/organization/OrgApprovalPage.vue";
import NotificationApp from "@/views/NotificationApp.vue";
import OrgNotificationApp from "@/views/organization/OrgNotificationApp.vue";
import PasswordView from "@/views/PasswordView.vue";
import ReviseView from "@/views/ReviseView.vue";
import OrgReviseView from "@/views/organization/OrgReviseView.vue";
import OrganizationDashboard from "@/views/organization/OrganizationDashboard.vue";
import OrgPasswordView from "@/views/organization/OrgPasswordView.vue";
import TreeStructure from "@/views/TreeStructure.vue";
import OrgTreeStructure from "@/views/organization/OrgTreeStructure.vue";
import OrgRecentTreeStructure from "@/views/organization/OrgRecentTreeStructure.vue";
import RecentTreeStructure from "@/views/RecentTreeStructure.vue";
import AdminDefineTreeStructure from "@/views/admin/AdminDefineTreeStructure.vue";
import AdminEditTreeStructure from "@/views/admin/AdminEditTreeStructure.vue";
import OrgPreDefineTreeStructure from "@/views/organization/OrgPreDefineTreeStructure.vue";
import OrgComment from "@/views/organization/OrgComment.vue";
import emailVerifyView from "@/views/emailVerifyView.vue";
import emailVerifiedView from "@/views/emailVerifiedView.vue";
import UserComment from "@/views/UserComment.vue";
import HomePage from "@/views/HomePage.vue";
import IntroductionView from "@/views/IntroductionView.vue";
import AccountRegistration from "@/views/AccountRegistration.vue";
import OrganizationHow from "@/views/OrganizationHow.vue";
import PDFStamp from "@/views/PDFStamp.vue";
import MemberHow from "@/views/MemberHow.vue";
import UsersHow from "@/views/UsersHow.vue";
import TreeView from "@/views/TreeView.vue";
import ErrorView from "@/views/ErrorView.vue";
import SignupAdminPending from "@/views/SignUpAdminPending.vue";
import ChangePassword from "@/views/ChangePassword.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import OrgChangePassword from "@/views/organization/OrgChangePassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import UserChangePassword from "@/views/UserChangePassword.vue";
import ModeratorDashboard from "@/views/moderator/ModeratorDashboard.vue";
import OrgProgress from "@/views/organization/OrgProgress.vue";
import OrgProfile from "@/views/organization/OrgProfile.vue";
import UserProfile from "@/views/UserProfile.vue";
import UserProgress from '@/views/UserProgress.vue'
import ProcessWorkflow from "@/views/admin/ProcessWorkflow.vue";
import ViewProcessWorkflow from "@/views/admin/ViewProcessWorkflow.vue"
import AdminViewTreeStructure from "@/views/admin/AdminViewTreeStructure.vue";
import EditProcessWorkflow from "@/views/admin/EditProcessWorkflow.vue";
import OrgEditProfile from "@/views/organization/OrgEditProfile.vue";
import UserEditProfile from "@/views/UserEditProfile.vue";
import IndividualSignUp from "@/views/admin/IndividualSignUp.vue";
import BulkSignUp from "@/views/admin/BulkSignUp.vue";
import ModeratorProfile from "@/views/moderator/ModeratorProfile.vue";
import ModeratorChangePassword from "@/views/moderator/ModeratorChangePassword.vue";
import ModeratorEditProfile from "@/views/moderator/ModeratorEditProfile.vue";
import ModeratorNotification from "@/views/moderator/ModeratorNotification.vue";
import ModeratorApproval from "@/views/moderator/ModeratorApproval.vue";
import ModeratorPassword from "@/views/moderator/ModeratorPassword.vue";
import ModeratorAdminAccounts from "@/views/moderator/ModeratorAdminAccounts.vue";
import Parse from "parse";
const requireAuth = (to, from, next) => {
  const currentUser = Parse.User.current();

  if (!currentUser) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/accountRegistration",
    name: "AccountRegistration",
    component: AccountRegistration,
  },
  {
    path: "/introductionView",
    name: "IntroductionView",
    component: IntroductionView,
  },
  {
    path: "/memberHow",
    name: "MemberHow",
    component: MemberHow,
  },
  {
    path: "/usersHow",
    name: "UsersHow",
    component: UsersHow,
  },
  {
    path: "/organizationHow",
    name: "OrganizationHow",
    component: OrganizationHow,
  },
  {
    path: "/pdfStamp",
    name: "PDFStamp",
    component: PDFStamp,
  },
  {
    path: "/treeView",
    name: "TreeView",
    component: TreeView,
  },
  {
    path: "/moderatorAdminAccounts",
    name: "ModeratorAdminAccounts",
    component: ModeratorAdminAccounts,
    beforeEnter: requireAuth,
  },
  {
    path: "/moderatorDashboard",
    name: "ModeratorDashboard",
    component: ModeratorDashboard,
    beforeEnter: requireAuth,
  },
  {
    path: "/moderatorProfile",
    name: "ModeratorProfile",
    component: ModeratorProfile,
    beforeEnter: requireAuth,
  },
  {
    path: "/moderatorEditProfile",
    name: "ModeratorEditProfile",
    component: ModeratorEditProfile,
    beforeEnter: requireAuth,
  },
  {
    path: "/moderatorApproval",
    name: "ModeratorApproval",
    component: ModeratorApproval,
    beforeEnter: requireAuth,
  },
  {
    path: "/moderatorNotification",
    name: "ModeratorNotification",
    component: ModeratorNotification,
    beforeEnter: requireAuth,
  },
  {
    path: "/moderatorPassword",
    name: "ModeratorPassword",
    component: ModeratorChangePassword,
    beforeEnter: requireAuth,
  },
  {
    path: "/moderatorPasswordVerify",
    name: "ModeratorPasswordVerify",
    component: ModeratorPassword,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgProgress",
    name: "orgProgress",
    component: OrgProgress,
    beforeEnter: requireAuth,
  },
  {
    path: "/userProgress",
    name: "UserProgress",
    component: UserProgress,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgProfile",
    name: "OrgProfile",
    component: OrgProfile,
    beforeEnter: requireAuth,
  },
  {
    path: "/userProfile",
    name: "UserProfile",
    component: UserProfile,
    beforeEnter: requireAuth,
  },
  {
    path: "/userEditProfile",
    name: "userEditProfile",
    component: UserEditProfile,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/orgChangePassword",
    name: "OrgChangePassword",
    component: OrgChangePassword,
    beforeEnter: requireAuth,
  },
  {
    path: "/userChangePassword",
    name: "UserChangePassword",
    component: UserChangePassword,
    beforeEnter: requireAuth,
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    component: ChangePassword,
    beforeEnter: requireAuth,
  },
  {
    path: "/resetPassword",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/errorView",
    name: "ErrorView",
    component: ErrorView,
    beforeEnter: requireAuth,
  },
  {
    path: "/userComment",
    name: "UserComment",
    component: UserComment,
    beforeEnter: requireAuth,
  },
  {
    path: "/signupas",
    name: "SignupAs",
    component: SignupAs,
  },
  {
    path: "/signupPending",
    name: "SignUpAdminPending",
    component: SignupAdminPending,
  },
  {
    path: "/reviseView",
    name: "ReviseView",
    component: ReviseView,
    beforeEnter: requireAuth,
  },
  {
    path: "/email-verification",
    name: "EmailVerify",
    component: emailVerifyView,
    beforeEnter: requireAuth,
  },
  {
    path: "/email-verify",
    name: "EmailVerified",
    component: emailVerifiedView,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgReviseView",
    name: "orgReviseView",
    component: OrgReviseView,
    beforeEnter: requireAuth,
  },
  {
    path: "/recentWorkflow",
    name: "recentWorkflow",
    component: RecentWorkflow,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgPrefinedWorkflow",
    name: "orgPredefinedWorkflow",
    component: OrgPredefinedWorkflow,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgRecentWorkflow",
    name: "orgRecentWorkflow",
    component: OrgRecentWorkflow,
    beforeEnter: requireAuth,
  },
  {
    path: "/userdashboard",
    name: "home",
    component: DashboardView,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgDashboard",
    name: "orgDashboard",
    component: OrganizationDashboard,
    beforeEnter: requireAuth,
  },
  {
    path: "/verifypassword",
    name: "PasswordView",
    component: PasswordView,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgVerifyPassword",
    name: "orgPasswordView",
    component: OrgPasswordView,
    beforeEnter: requireAuth,
  },
  {
    path: "/signupuser",
    name: "SignupUser",
    component: SignupUserView,
  },
  {
    path: "/signupUserPending",
    name: "SignupUserPending",
    component: SignupUserPending,
  },
  {
    path: "/signupadmin",
    name: "SignupAdmin",
    component: SignupAdminView,
  },
  {
    path: "/individualSignup",
    name: "IndividualSignUp",
    component: IndividualSignUp,
  },
  {
    path: "/bulkSignUp",
    name: "BulkSignUp",
    component: BulkSignUp,
  },
  {
    path: "/workflowInitiation",
    name: "workflowInitiation",
    component: WorkflowInitiation,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgWorkflowInitiation",
    name: "orgWorkflowInitiation",
    component: OrgWorkflowInitiation,
    beforeEnter: requireAuth,
  },
  {
    path: "/editWorkflow",
    name: "editRecentWorkflow",
    component: EditRecentWorkflow,
    beforeEnter: requireAuth,
  },
  {
    path: "/OrgEditWorkflow",
    name: "orgEditRecentWorkflow",
    component: OrgEditRecentWorkflow,
    beforeEnter: requireAuth,
  },
  {
    path: "/OrgEditWorkflowAdmin",
    name: "orgEditPredefinedWorkflow",
    component: OrgEditPredefinedWorkflow,
    beforeEnter: requireAuth,
  },
  {
    path: "/adminDashboard",
    name: "admin",
    component: Admin,
    beforeEnter: requireAuth,
  },
  {
    path: "/archivedAccounts",
    name: "archivedAccounts",
    component: ArchivedAccounts,
    beforeEnter: requireAuth,
  },
  {
    path: "/createAccount",
    name: "CreateAccount",
    component: CreateAccount,
    beforeEnter: requireAuth,
  },
  {
    path: "/processWorkflow",
    name: "ProcessWorkflow",
    component: ProcessWorkflow,
    beforeEnter: requireAuth,
  },
  {
    path: "/viewProcessWorkflow",
    name: "ViewProcessWorkflow",
    component: ViewProcessWorkflow,
    beforeEnter: requireAuth,
  },
  {
    path: "/viewTreeStructure",
    name: "AdminViewTreeStructure",
    component: AdminViewTreeStructure,
    beforeEnter: requireAuth,
  },
  {
    path: "/editProcessWorkflow",
    name: "EditProcessWorkflow",
    component: EditProcessWorkflow,
    beforeEnter: requireAuth,
  },
  {
    path: "/defineprocessworkflow",
    name: "DefineProcessWorkflow",
    component: DefineProcessWorkflow,
    beforeEnter: requireAuth,
  },
  {
    path: "/adminProfile",
    name: "AdminProfile",
    component: AdminProfile,
    beforeEnter: requireAuth,
  },
  {
    path: "/editprofile",
    name: "EditAdminProfile",
    component: EditAdminProfile,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgEditProfile",
    name: "OrgEditProfile",
    component: OrgEditProfile,
    beforeEnter: requireAuth,
  },
  {
    path: "/approvals",
    name: "approvalPage",
    component: ApprovalPage,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgApprovals",
    name: "orgApprovalPage",
    component: OrgApprovalPage,
    beforeEnter: requireAuth,
  },
  {
    path: "/notifications",
    name: "notifications",
    component: NotificationApp,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgNotifications",
    name: "orgNotifications",
    component: OrgNotificationApp,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgTreeStructure",
    name: "OrgTreeStructure",
    component: OrgTreeStructure,
    beforeEnter: requireAuth,
  },
  {
    path: "/TreeStructure",
    name: "TreeStructure",
    component: TreeStructure,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgRecentTreeStructure",
    name: "OrgRecentTreeStructure",
    component: OrgRecentTreeStructure,
    beforeEnter: requireAuth,
  },
  {
    path: "/RecentTreeStructure",
    name: "RecentTreeStructure",
    component: RecentTreeStructure,
    beforeEnter: requireAuth,
  },
  {
    path: "/adminDefineTreeStructure",
    name: "AdminDefineTreeStructure",
    component: AdminDefineTreeStructure,
    beforeEnter: requireAuth,
  },
  {
    path: "/adminEditTreeStructure",
    name: "AdminEditTreeStructure",
    component: AdminEditTreeStructure,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgPreDefineTreeStructure",
    name: "OrgPreDefineTreeStructure",
    component: OrgPreDefineTreeStructure,
    beforeEnter: requireAuth,
  },
  {
    path: "/orgComment",
    name: "OrgComment",
    component: OrgComment,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
