import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Schema المستخدمين
const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true }, // الاسم مطلوب
  email: { type: String, required: true, unique: true }, // البريد مطلوب ومميز
  password: { type: String, required: true }, // كلمة المرور مطلوبة
  role: { type: String, enum: ['admin', 'user'], default: 'user' } // الدور: admin أو user
}, { timestamps: true });

// تشفير كلمة المرور قبل الحفظ
adminUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// التحقق من كلمة المرور عند تسجيل الدخول
adminUserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// تصدير الموديل
const AdminUser = mongoose.model('AdminUser', adminUserSchema);
export default AdminUser;
