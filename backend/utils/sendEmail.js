// Mock email service for prototype/testing
// Can be replaced with Nodemailer/SendGrid for production

const sendEmail = async (options) => {
  console.log('====================================');
  console.log('       MOCK EMAIL SERVICE           ');
  console.log('====================================');
  console.log(`To: ${options.email}`);
  console.log(`Subject: ${options.subject}`);
  console.log('------------------------------------');
  console.log(`${options.message}`);
  console.log('====================================');
  
  // Return a resolved promise to simulate successful email send
  return Promise.resolve();
};

export default sendEmail;
