import mongoose from 'mongoose';

const TableBookingSchema = new mongoose.Schema(
  {
    bookingCode: {
      type: String,
      required: true,
      unique: true
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    restaurantName: {
      type: String,
      required: true
    },
    guestName: {
      type: String,
      required: true
    },
    guestPhone: {
      type: String,
      required: true
    },
    guestEmail: {
      type: String
    },
    numGuests: {
      type: String,
      required: true,
      default: '2 Guests'
    },
    bookingDate: {
      type: String,
      required: true
    },
    specialRequests: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Completed', 'Cancelled'],
      default: 'Confirmed'
    }
  },
  { timestamps: true }
);

const TableBooking = mongoose.model('TableBooking', TableBookingSchema);
export default TableBooking;
