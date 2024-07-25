const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { ObjectId } = mongoose.Schema.Types; // Use ObjectId correctly

const otpSchema = new mongoose.Schema({
    otp: {
        type: String, // Store OTP as a string for hashing
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userId: {
        type: ObjectId,
        ref: "Users",
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    // expiresAt: {
    //     type: Date,
    //     default: Date.now() + 10 * 60 * 1000,
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // },
},
    {
        timestamps: true,
    }
);

// Method to verify OTP
otpSchema.methods.verifyOtp = async function (otp) {
    return bcrypt.compare(otp, this.otp);
};

// Pre-save hook to hash OTP
otpSchema.pre("save", async function (next) {
    if (this.isModified("otp")) {
        this.otp = await bcrypt.hash(this.otp, 12);
    }
    next();
});

// Update the updatedAt field before saving
otpSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const OtpModel = mongoose.model("OTPs", otpSchema);

module.exports = OtpModel;
