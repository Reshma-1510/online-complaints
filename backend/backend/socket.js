const Complaint = require('./models/Complaint');

function initSocket(io) {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinComplaint', (complaintId) => {
      socket.join(complaintId);
    });

    socket.on('leaveComplaint', (complaintId) => {
      socket.leave(complaintId);
    });

    socket.on('sendMessage', async ({ complaintId, user, text }) => {
      const message = { user: user.email, text };
      const complaint = await Complaint.findById(complaintId);
      complaint.messages.push(message);
      await complaint.save();

      io.to(complaintId).emit('message', message);
    });
  });
}

module.exports = initSocket;
