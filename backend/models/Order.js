import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem'
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  isVeg: { type: Boolean, default: true },
  isBeer: { type: Boolean, default: false }
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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
    items: [OrderItemSchema],
    itemTotal: {
      type: Number,
      required: true
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    packagingFee: {
      type: Number,
      default: 10
    },
    taxes: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    grandTotal: {
      type: Number,
      required: true
    },
    appliedCoupon: {
      type: String,
      default: ''
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    deliveryNote: {
      type: String,
      default: ''
    },
    orderStatus: {
      type: String,
      enum: [
        'Placed',
        'Accepted',
        'Preparing',
        'Out for Delivery',
        'Delivered',
        'Cancelled'
      ],
      default: 'Placed'
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'UPI', 'Credit/Debit Card', 'Net Banking'],
      default: 'UPI'
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Completed'
    },
    riderDetails: {
      name: { type: String, default: 'Vikram S.' },
      phone: { type: String, default: '+91 98765 12345' },
      vehicle: { type: String, default: 'Electric Scooter (Insulated Beer Box)' }
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;
