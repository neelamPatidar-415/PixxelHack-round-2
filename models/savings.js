const mongoose = require("mongoose");

const savingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    default: () => new Date().toISOString(),
  },
  transactions: {
    type: [
      {
        amount: { type: Number, required: true },
        date: { type: String, default: () => new Date().toISOString() },
        note: { type: String },
      },
    ],
    default: function () {
      return this.currentAmount > 0
        ? [
            {
              amount: this.currentAmount,
              date: new Date().toISOString(),
              note: "Initial amount",
            },
          ]
        : [];
    },
  },
  isCompleted: {
    type: Boolean,
    default: function () {
      return this.currentAmount >= this.targetAmount;
    },
  },
});

module.exports = mongoose.model("savings", savingSchema);
