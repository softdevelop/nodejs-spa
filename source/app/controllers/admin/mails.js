const EmailRegister = require('../../models/emailRegister.model');
const moment = require('moment');
const { smtpTransport } = require('../../../config/middleware/handlebars');
// show all holding
allHoldings = async (req, res) => {
  let holdings = await EmailRegister.find().exec();

  let response = {
    moment,
    titlePage: 'Signed Up Mails',
    holdings,
    notification: {}
  };
  return res.render('admin/holding/index', response);
};

// send invitation
sendInvitation = async (req, res) => {
  let holdings = await EmailRegister.find().exec();

  if (req.method == 'GET') {
    let response = {
      moment,
      titlePage: 'Send Mails',
      notification: {},
      holdings
    };
    return res.render('admin/holding/send-invite', response);
  }

  if (req.method == 'POST') {
    let { emails, subject, invitation } = req.body;

    for (let i = 0; i < emails.length; i++) {
      let mailOptions = {
        from: `'PSCD' ${process.env.MAIL_USERNAME}`,
        to: emails[i],
        subject: subject,
        html: invitation
      };

      smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(400).json({ success: false });
        } else {
          return res.status(200).json({ success: true });
        }
      });
    }
  }
}

// delete entertainer-type
deleteHoldingRecords = async (req, res) => {
  try {
    let data = req.body;
    let list_del = data._arr;
    list_del.map(async val => {
      let holding = await EmailRegister.deleteOne(
        { _id: val },
        (err, response) => {
          if (err) throw err;
        }
      );
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

module.exports = {
  allHoldings,
  deleteHoldingRecords,
  sendInvitation
};
