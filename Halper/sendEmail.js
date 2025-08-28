const nodemailer = require('nodemailer');

async function sendEmailer(email, Otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Auth_Email,
      pass: process.env.Auth_Password,
    },
  });
  (async () => {
    const info = await transporter.sendMail({
      from: process.env.Auth_Email,
      to: email,
      subject: 'Evato e-com by limon ✔',
      text: 'Otp code !',
      html: `'<body style=font-family:Poppins,Arial,sans-serif><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td style=padding:20px align=center><table cellpadding=0 cellspacing=0 border=0 width=600 class=content style="border-collapse:collapse;border:1px solid #ccc"><tr><td style=background-color:#345c72;padding:40px;text-align:center;color:#fff;font-size:24px class=header>Responsive Email Template<tr><td style=padding:40px;text-align:center;font-size:16px;line-height:1.6 class=body>Hello, All!<br>Lorem odio soluta quae dolores sapiente voluptatibus recusandae aliquam fugit ipsam.<br><br>otp is ${Otp}.<tr><td style="padding:0 40px 0 40px;text-align:center"><table cellpadding=0 cellspacing=0 style=margin:auto><tr><td style="background-color:#345c72;padding:10px 20px;border-radius:5px"align=center><a href=https://www.yourwebsite.com style=color:#fff;text-decoration:none;font-weight:700 target=_blank>Book a Free Consulatation</a></table><tr><td style=padding:40px;text-align:left;font-size:16px;line-height:1.6 class=body>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam corporis sint eum nemo animi velit exercitationem impedit.<tr><td style=background-color:#333;padding:40px;text-align:center;color:#fff;font-size:14px class=footer>Copyright © 2024 | Your brand name</table></table>'`,
    });
  })();
}

module.exports = sendEmailer;
