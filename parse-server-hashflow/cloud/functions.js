Parse.Cloud.define('hello', req => {
  req.log.info(req);
  return 'Hi';
});

Parse.Cloud.define('asyncFunction', async req => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  req.log.info(req);
  return 'Hi async';
});

Parse.Cloud.beforeSave('Test', () => {
  throw new Parse.Error(9001, 'Saving test objects is not available.');
});

Parse.Cloud.define("deleteUser", async (request) => {
  const { userId } = request.params;

  const query = new Parse.Query(Parse.User);
  const user = await query.get(userId, { useMasterKey: true });

  if (!user) {
    throw new Error("User not found");
  }

  await user.destroy({ useMasterKey: true });
});

Parse.Cloud.define("archiveUser", async (request) => {
  const { userId } = request.params;

  try {
    // Fetch the user object
    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId);

    // Set the "archived" field to true
    user.set("archived", true);

    // Save the updated user object
    await user.save(null, { useMasterKey: true });

    return "User archived successfully";
  } catch (error) {
    throw new Error("Failed to archive user: " + error.message);
  }
});

Parse.Cloud.define("unArchiveUser", async (request) => {
  const { userId } = request.params;

  try {
    // Fetch the user object
    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId);

    // Set the "archived" field to true
    user.set("archived", false);

    // Save the updated user object
    await user.save(null, { useMasterKey: true });

    return "User archived successfully";
  } catch (error) {
    throw new Error("Failed to archive user: " + error.message);
  }
});

Parse.Cloud.define('sendEmail', async request => {
  const nodemailer = require('nodemailer');

  const approver = request.params.approver;
  // Extract the email addresses of users with the "Approver" role from the schema array
  const approverEmails = approver.filter(user => user.role === "Approver").map(user => user.email);

  // Create a transporter object using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hashfloww@gmail.com',
      pass: 'jectucpkweubzowz',
    },
  });

  // Create the email message
  const ApprovalButton = `http://localhost:8080/orgVerifyPassword?approvalId=${request.params.id}&verdict=${request.params.approved}`;
  const RejectButton = `http://localhost:8080/orgVerifyPassword?approvalId=${request.params.id}&verdict=${request.params.reject}`;
  const ReviseButton = `http://localhost:8080/orgReviseView?approvalId=${request.params.id}&edit=${request.params.revise}`;
  const message = {
    from: 'Hashflow <hashfloww@gmail.com>',
    to: approverEmails.join(', '),
    subject: request.params.name,
    html: `
            <p>Greetings Sir/Maam,</p>
            <p>${request.params.firstname} sent you a file concerning his/her ${
  request.params.name
} and in need
            of your immediate response. Here are the details:</p>
            <ul>
              <li>Workflow Name: ${request.params.name}</li>
              <li>Date Initiated: ${request.params.date}</li>
              <li>Description: ${request.params.message}</li>
              <li>Files Included:
                ${request.params.file.map(file => {
    return `<a class="file" href="${file.url}" target="_blank" rel="noopener">${file.name}</a>`;
  })}
              </li>
            </ul>
            <p>Click the button below to approve, reject or revise the file.</p>
            <a href="${ApprovalButton}">
              <button>
                Approve
              </button>
            </a>
            <a href="${RejectButton}">
            <button>
              Reject
            </button> 
            </a>
            <a href="${ReviseButton}">
            <button>
              Revise
            </button> 
            </a>

            <p>Thank you!</p>
            <p>Hashflow Team</p>
          `,
  };

  // Send the email
  try {
    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
});

Parse.Cloud.define('sendChildrenEmail', async request => {
  const nodemailer = require('nodemailer');

  const approver = request.params.approver;

  // Extract the email addresses of users with the "Approver" role from the children nodes in the schema
  const extractApproverEmails = (nodes) => {
    let emails = [];
    for (const node of nodes) {
      if (node.role === "Approver") {
        emails.push(node.email);
      }
      emails = [...emails, ...extractApproverEmails(node.children)];
    }
    return emails;
  };

  const approverEmails = extractApproverEmails(approver);

  // Create a transporter object using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hashfloww@gmail.com',
      pass: 'jectucpkweubzowz',
    },
  });

  // Create the email message
  const ApprovalButton = `http://localhost:8080/orgVerifyPassword?approvalId=${request.params.id}&verdict=${request.params.approved}`;
  const RejectButton = `http://localhost:8080/orgVerifyPassword?approvalId=${request.params.id}&verdict=${request.params.reject}`;
  const ReviseButton = `http://localhost:8080/orgReviseView?approvalId=${request.params.id}&edit=${request.params.revise}`;
  const message = {
    from: 'Hashflow <hashfloww@gmail.com>',
    to: approverEmails.join(', '),
    subject: request.params.name,
    html: `
            <p>Greetings Sir/Maam,</p>
            <p>${request.params.firstname} sent you a file concerning his/her ${
  request.params.name
} and in need
            of your immediate response. Here are the details:</p>
            <ul>
              <li>Workflow Name: ${request.params.name}</li>
              <li>Date Initiated: ${request.params.date}</li>
              <li>Description: ${request.params.message}</li>
              <li>Files Included:
                ${request.params.file.map(file => {
    return `<a class="file" href="${file.url}" target="_blank" rel="noopener">${file.name}</a>`;
  })}
              </li>
            </ul>
            <p>Click the button below to approve, reject or revise the file.</p>
            <a href="${ApprovalButton}">
              <button>
                Approve
              </button>
            </a>
            <a href="${RejectButton}">
            <button>
              Reject
            </button> 
            </a>
            <a href="${ReviseButton}">
            <button>
              Revise
            </button> 
            </a>

            <p>Thank you!</p>
            <p>Hashflow Team</p>
          `,
  };

  // Send the email
  try {
    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
});

Parse.Cloud.define('sendVerificationEmail', async request => {
  const { username } = request.params;

  try {
    const user = await new Parse.Query(Parse.User)
      .equalTo('username', username)
      .first({ useMasterKey: true });

    if (!user) {
      throw new Error('User not found');
    }

    const verificationToken = new Date().getTime().toString(); // generate a verification token
    user.set('emailVerified', false);
    user.set('verificationEmailToken', verificationToken);
    await user.save(null, { useMasterKey: true }); // save the updated user object

    const verificationLink = `http://localhost:8080/email-verify?token=${verificationToken}`; // replace with your verification link
    await Parse.Cloud.sendEmail({
      to: username,
      subject: 'Verify your email address',
      text: `Please click the following link to verify your email address: ${verificationLink}`,
    });
  } catch (error) {
    console.log(error);
  }
});

Parse.Cloud.define('verifyEmail', async request => {
  const { token } = request.params;

  try {
    const user = await new Parse.Query(Parse.User)
      .equalTo('verificationEmailToken', token)
      .first({ useMasterKey: true });

    if (!user) {
      throw new Error('Invalid token');
    }

    user.set('emailVerified', true);
    user.set('verificationEmailToken', null);
    await user.save(null, { useMasterKey: true }); // save the updated user object

    return { message: 'Email successfully verified' };
  } catch (error) {
    console.log(error);
    throw new Error('Error verifying email');
  }
});

Parse.Cloud.define('sendUserEmail', async request => {
  const nodemailer = require('nodemailer');

  const approver = request.params.approver;
  // Extract the email addresses of users with the "Approver" role from the schema array
  const approverEmails = approver.filter(user => user.role === "Approver").map(user => user.email);

  // Create a transporter object using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hashfloww@gmail.com',
      pass: 'jectucpkweubzowz',
    },
  });

  // Create the email message
  const ApprovalButton = `http://localhost:8080/verifypassword?approvalId=${request.params.id}&verdict=${request.params.approved}`;
  const RejectButton = `http://localhost:8080/verifypassword?approvalId=${request.params.id}&verdict=${request.params.reject}`;
  const ReviseButton = `http://localhost:8080/reviseView?approvalId=${request.params.id}&edit=${request.params.revise}`;
  const message = {
    from: 'Hashflow <hashfloww@gmail.com>',
    to: approverEmails.join(', '),
    subject: request.params.name,
    html: `
            <p>Greetings Sir/Maam,</p>
            <p>${request.params.firstname} sent you a file concerning his/her ${
  request.params.name
} and in need
            of your immediate response. Here are the details:</p>
            <ul>
              <li>Workflow Name: ${request.params.name}</li>
              <li>Date Initiated: ${request.params.date}</li>
              <li>Description: ${request.params.message}</li>
              <li>Files Included:
                ${request.params.file.map(file => {
    return `<a class="file" href="${file.url}" target="_blank" rel="noopener">${file.name}</a>`;
  })}
              </li>
            </ul>
            <p>Click the button below to approve, reject or revise the file.</p>
            <a href="${ApprovalButton}">
              <button>
                Approve
              </button>
            </a>
            <a href="${RejectButton}">
            <button>
              Reject
            </button> 
            </a>
            <a href="${ReviseButton}">
            <button>
              Revise
            </button> 
            </a>

            <p>Thank you!</p>
            <p>Hashflow Team</p>
          `,
  };

  // Send the email
  try {
    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
});

Parse.Cloud.define('sendApplicationEmail', async request => {
  const nodemailer = require('nodemailer');

  const orgEmail = request.params.orgEmail;
  // Create a transporter object using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hashfloww@gmail.com',
      pass: 'jectucpkweubzowz',
    },
  });

  // Create the email message
  const message = {
    from: 'Hashflow <hashfloww@gmail.com>',
    to: orgEmail,
    subject: 'Application for Signing Up',
    html: `
            <p>Greetings Sir/Maam,</p>
            <p>This is to verify that you have send an application to have an account in our system. 
               The details you've sent to us are:
            </p>
            <ul>
              <li>Organization Name: ${request.params.orgName}</li>
              <li>Organization Email: ${request.params.orgEmail}</li>
              <li>Date Created: ${request.params.date}</li>
              <li>Address: ${request.params.address}</li>
              <li>Files Included:
                ${request.params.file.map(file => {
    return `<a class="file" href="${file.url}" target="_blank" rel="noopener">${file.name}</a>`;
  })}
              </li>
            </ul>
            <p>Thank you!</p>
            <p>Hashflow Team</p>
          `,
  };

  // Send the email
  try {
    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
});

Parse.Cloud.define('sendHashflowEmail', async request => {
  const nodemailer = require('nodemailer');

  const orgEmail = request.params.orgEmail;
  // Create a transporter object using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hashfloww@gmail.com',
      pass: 'jectucpkweubzowz',
    },
  });

  // Create the email message
  const message = {
    from: `${request.params.orgName} <${orgEmail}>`,
    to: 'Hashflow <hashfloww@gmail.com>',
    subject: 'Application for Signing Up',
    html: `
            <p>Greetings Sir/Maam,</p>
            <p>This is to inform you that we, ${request.params.orgName} send an application to have an account in your system. 
               The details that we have provided to you are:
            </p>
            <ul>
              <li>Organization Name: ${request.params.orgName}</li>
              <li>Organization Email: ${request.params.orgEmail}</li>
              <li>Date Created: ${request.params.date}</li>
              <li>Address: ${request.params.address}</li>
              <li>Files Included:
                ${request.params.file.map(file => {
    return `<a class="file" href="${file.url}" target="_blank" rel="noopener">${file.name}</a>`;
  })}
              </li>
            </ul>
            <p>Waiting for immediate and fast transaction with you.</p>
            <p> Regards, </p>
            <p>${request.params.orgName}</p>
          `,
  };

  // Send the email
  try {
    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
});

Parse.Cloud.define("generateResetToken", async (request) => {
  const nodemailer = require("nodemailer");
  const { username } = request.params;
  const userQuery = new Parse.Query(Parse.User);
  userQuery.equalTo("username", username);
  const user = await userQuery.first({ useMasterKey: true });
  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = Math.random().toString(36).slice(-8);
  user.set("resetToken", resetToken);
  await user.save(null, { useMasterKey: true });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hashfloww@gmail.com",
      pass: "jectucpkweubzowz",
    },
  });

  const resetLink = `http://localhost:8080/resetPassword?token=${resetToken}`;
  const mailOptions = {
    from: "Hashflow <hashfloww@gmail.com>",
    to: username,
    subject: "Password Reset",
    html: `<p>Click this link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
  return "Reset token sent";
});

Parse.Cloud.define("resetPassword", async (request) => {
  const { token, newPassword } = request.params;

  const userQuery = new Parse.Query(Parse.User);
  userQuery.equalTo("resetToken", token);
  const user = await userQuery.first({ useMasterKey: true });
  if (!user) {
    throw new Error("Invalid or expired token");
  }

  user.setPassword(newPassword);
  user.unset("resetToken");
  await user.save(null, { useMasterKey: true });

  return "Password reset successfully";
});

Parse.Cloud.define('cancelWorkflow', async request => {
  const nodemailer = require('nodemailer');

  const approver = request.params.approver;
  // Extract the email addresses of users with the "Approver" role from the schema array
  const approverEmails = approver.filter(user => user.role === "Approver").map(user => user.email);

  // Create a transporter object using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hashfloww@gmail.com',
      pass: 'jectucpkweubzowz',
    },
  });

  // Create the email message
  const message = {
    from: 'Hashflow <hashfloww@gmail.com>',
    to: approverEmails.join(', '),
    subject: 'Cancelled Workflow',
    html: `
            <p>Greetings Sir/Maam,</p>
            <p>${request.params.firstname} cancelled what he/she initiated workflow about 
            ${request.params.name} due to an unforeseen circumstances.</p>


            <p>Thank you!</p>
            <p>Hashflow Team</p>
          `,
  };

  // Send the email
  try {
    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
});

Parse.Cloud.define('sendAccount', async request => {
  const nodemailer = require('nodemailer');

  // Create a transporter object using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hashfloww@gmail.com',
      pass: 'jectucpkweubzowz',
    },
  });
  const message = {
    from: 'Hashflow <hashfloww@gmail.com>',
    to: request.params.email,
    subject: 'Account Creation Details',
    html: `
            <p>Greetings Sir/Maam,</p>
            <p>Hashflow approved your request to have an account in our system. The login credentials in your organization are: </p>
            <ul>
              <li>Organization Name: ${request.params.orgName}</li>
              <li>Organization Address: ${request.params.address}</li>
              <li>Organization Email: ${request.params.email}</li>
              <li>Organization Password: ${request.params.password}</li>
            </ul>

            <p> Please changed your password after you login for security purposes. </p>
            <p>Thank you!</p>
            <p>Hashflow Team</p>
          `,
  };

  // Send the email
  try {
    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
});

Parse.Cloud.define('sendOrganizationAccount', async request => {
  const nodemailer = require('nodemailer');

  // Create a transporter object using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hashfloww@gmail.com',
      pass: 'jectucpkweubzowz',
    },
  });
  const message = {
    from: 'Hashflow <hashfloww@gmail.com>',
    to: request.params.email,
    subject: 'Account Creation Details',
    html: `
            <p>Greetings Sir/Maam,</p>
            <p>${request.params.orgName} created you an account in our organization. The login credentials are: </p>
            <ul>
              <li>Organization Name: ${request.params.orgName}</li>
              <li>Organization Address: ${request.params.address}</li>
              <li>Organization Contact: ${request.params.contact}</li>
              <li>Organization Email: ${request.params.email}</li>
              <li>Organization Password: ${request.params.password}</li>
            </ul>

            <p> Please changed your password after you login for security purposes. </p>
            <p>Thank you!</p>
            <p>${request.params.orgName} Team</p>
          `,
  };

  // Send the email
  try {
    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
});
