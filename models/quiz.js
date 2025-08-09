const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  quizId: { type: String, required: true },
  currentQuestionIndex: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  answers: [
    {
      questionId: String,
      selectedOption: String,
      isCorrect: Boolean
    }
  ],
  completed: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("quiz", quizSchema);
