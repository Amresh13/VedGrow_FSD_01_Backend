import mongoose from 'mongoose';
import slugify from 'slugify';

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tag name is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [50, 'Tag name cannot exceed 50 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

tagSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

export default mongoose.model('Tag', tagSchema);
