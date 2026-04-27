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

    // In a real production environment, you would use your own SMTP credentials.
    // For this beginner-friendly version, we use a mock transport or a placeholder.
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email', // Example mock service
      port: 587,
      secure: false,
      auth: {
        user: 'mock-user@ethereal.email',
        pass: 'mock-password'
      }
    });

    const mailOptions = {
      from: '"Yash Resort" <bookings@yashresort.com>',
      to: customerData.email,
      subject: 'Your Sanctuary Awaits - Booking Confirmation',
      text: `Dear ${customerData.name},\n\nYour booking at Yash Resort is confirmed!\n\nDetails:\n- Room: ${bookingData.roomId}\n- Check-in: ${bookingData.checkIn}\n- Check-out: ${bookingData.checkOut}\n- Total Amount: ₹${bookingData.totalAmount}\n- Payment Status: ${bookingData.paymentStatus}\n\nWe look forward to welcoming you.`,
      html: `
        <div style="font-family: 'Georgia', serif; color: #333; border: 1px solid #D4AF37; padding: 20px; border-radius: 10px;">
          <h1 style="color: #D4AF37; text-align: center;">Booking Confirmation</h1>
          <p>Dear ${customerData.name},</p>
          <p>Your booking at <strong>Yash Resort</strong> has been successfully confirmed.</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Room ID:</strong> ${bookingData.roomId}</p>
            <p><strong>Check-in:</strong> ${bookingData.checkIn}</p>
            <p><strong>Check-out:</strong> ${bookingData.checkOut}</p>
            <p><strong>Total Amount:</strong> ₹${bookingData.totalAmount}</p>
            <p><strong>Payment Status:</strong> ${bookingData.paymentStatus}</p>
          </div>
          <p>We look forward to welcoming you to your sanctuary.</p>
          <p style="text-align: center; color: #D4AF37;"><strong>Yash Resort Management</strong></p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`[EmailService] Confirmation sent to ${customerData.email}`);
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
