const nodemailer= require('nodemailer');

let sendSimpleEmail=async(dataSent)=>{
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "www.namkhanh@gmail.com", // generated ethereal user
          pass: "rwjfmdkroivrzbvi", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Nam dz 👻" <www.namkhanh@gmail.com>', // sender address
        to: dataSent.receiverEmail, // list of receivers
        subject: "Medical Examination Order Information ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<h2>Greetings ${dataSent.name}!</h2>
                <p>You Received This Email Because You Booked a BookingCare appointment</p>
                <p>Booking Details</p>
                <div><b>Time: ${dataSent.time}</b></div>
                <div><b>Doctor: ${dataSent.doctorName}</b></div>
                <div>Confirm Ìnfomation</div>
                <div><a href="${dataSent.redirect}">Click Here</a></div>`, // html body
      });
      console.log(';;;',dataSent)
}

let DeniedEmail=async(dataSent)=>{
  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "www.namkhanh@gmail.com", // generated ethereal user
        pass: "rwjfmdkroivrzbvi", // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Admin System 💩💩 👻" <www.namkhanh@gmail.com>', // sender address
      to: dataSent.email, // list of receivers
      subject: "Medical Examination Order Information ✔ 👹👹👹", // Subject line
      text: "Hello world?", // plain text body
      html:`<h2>Greetins ${dataSent.name}!</h2>
      <p>You Received This Email Because You Booked a BookingCare appointment Failed</p>
      <p>We are very sorry for this incident</p>
      <div><b>Please try to book another doctor in another time, Thank you!!!!</b></div>`, 
    });
}

let AcceptEmail=async(dataSent)=>{
  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "www.namkhanh@gmail.com", // generated ethereal user
        pass: "rwjfmdkroivrzbvi", // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Admin System 💩💩 👻" <www.namkhanh@gmail.com>', // sender address
      to: dataSent.email, // list of receivers
      subject: "New Status 👹👹👹", // Subject line
      text: "Hello world?", // plain text body
      html:`<h2>Xin Chào ${dataSent.name}!</h2>
      <p>Bạn Nhận Được Email Này vì đã đặt lịch khám bẹnh Nam dz</p>
      <p>Thông Tin đặt lịch khám bệnh</p>
      <div><b>Thời Gian: ${dataSent.timeType}</b></div>
      <div><b>Bác Sĩ: ${dataSent.email}</b></div>
      <div>Xác Nhận Thông Tin</div>`, 
      // attachments:[
      //   {
      //     filename:'text.jpg',
      //     content:dataSent.image.split("base64,")[1],
      //     encoding:'base64'
      //   }
      // ]// html bodyml body
    });
}

module.exports={sendSimpleEmail,DeniedEmail,AcceptEmail}