const nodemailer = require('nodemailer');

/**
 * NotificationService handles sending confirmation emails and SMS alerts
 * for bookings.
 */
const NotificationService = {
  /**
   * Sends a booking confirmation email with a simple invoice.
   * @param {Object} bookingData - The booking details.
   * @param {Object} customerData - The customer details.
   */
  sendEmailConfirmation: async (bookingData, customerData) => {
    console.log(`[EmailService] Preparing email for ${customerData.email}...`);

    try {
      // In a real production environment, you would use your own SMTP credentials (e.g., Gmail App Password).
      // For testing, we dynamically create a mock ethereal email account to preview the invoice.
      const testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });

      const checkInFormatted = new Date(bookingData.checkIn).toLocaleDateString();
      const checkOutFormatted = new Date(bookingData.checkOut).toLocaleDateString();
      const roomDetails = bookingData.roomId ? `${bookingData.roomId.category} (Room ${bookingData.roomId.roomNumber})` : 'Assigned Room';

      const mailOptions = {
        from: '"Yash Resort" <bookings@yashresort.com>',
        to: customerData.email,
        subject: 'Your Sanctuary Awaits - Booking Confirmation & Invoice',
        text: `Dear ${customerData.name},\n\nYour booking at Yash Resort is confirmed!\n\nDetails:\n- Room: ${roomDetails}\n- Check-in: ${checkInFormatted}\n- Check-out: ${checkOutFormatted}\n- Total Amount: ₹${bookingData.totalAmount}\n- Payment Status: ${bookingData.paymentStatus}\n\nWe look forward to welcoming you.`,
        html: `
          <div style="font-family: 'Georgia', serif; color: #333; border: 1px solid #D4AF37; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
            <h1 style="color: #D4AF37; text-align: center;">Booking Invoice & Confirmation</h1>
            <p>Dear <strong>${customerData.name}</strong>,</p>
            <p>Your booking at <strong>Yash Resort</strong> has been successfully confirmed. Below is your official invoice and booking summary.</p>
            <div style="background: #FDFBEE; padding: 20px; border-radius: 8px; border: 1px solid rgba(212,175,55,0.3); margin: 20px 0;">
              <h3 style="color: #D4AF37; margin-top: 0;">Reservation Details</h3>
              <p style="margin: 5px 0;"><strong>Guest Name:</strong> ${customerData.name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${customerData.email}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${customerData.phone}</p>
              <hr style="border: 0; border-top: 1px solid rgba(212,175,55,0.2); margin: 15px 0;" />
              <p style="margin: 5px 0;"><strong>Room:</strong> ${roomDetails}</p>
              <p style="margin: 5px 0;"><strong>Check-in:</strong> ${checkInFormatted}</p>
              <p style="margin: 5px 0;"><strong>Check-out:</strong> ${checkOutFormatted}</p>
              <p style="margin: 5px 0;"><strong>Guests:</strong> ${bookingData.guests} Person(s)</p>
              <hr style="border: 0; border-top: 1px solid rgba(212,175,55,0.2); margin: 15px 0;" />
              <p style="margin: 5px 0; font-size: 18px;"><strong>Total Paid / Payable:</strong> <span style="color: #D4AF37;">₹${bookingData.totalAmount}</span></p>
              <p style="margin: 5px 0;"><strong>Payment Status:</strong> ${bookingData.paymentStatus.toUpperCase()}</p>
              <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${bookingData.paymentMethod}</p>
            </div>
            <p>We look forward to welcoming you to your sanctuary.</p>
            <p style="text-align: center; color: #D4AF37; margin-top: 30px;"><strong>Yash Resort Management</strong></p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`[EmailService] Invoice Confirmation sent to ${customerData.email}`);
      console.log(`[EmailService] 🌟 VIEW INVOICE EMAIL HERE: ${nodemailer.getTestMessageUrl(info)}`);
      return { success: true };
    } catch (error) {
      console.error(`[EmailService] Error sending email: ${error.message}`);
      return { success: false, error: error.message };
    }
  },

  /**
   * Sends a booking confirmation SMS.
   * In a real app, you would integrate Twilio or similar.
   */
  sendSMSConfirmation: async (phone, bookingId) => {
    console.log(`[SMSService] Sending SMS to ${phone}: Your booking ${bookingId} is confirmed!`);
    // Simulate SMS API call
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500));
  }
};

module.exports = NotificationService;
