import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama tanaman wajib diisi'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Kategori wajib diisi (contoh: Sayuran, Buah, Biji-bijian)'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Jumlah wajib diisi'],
      min: [0, 'Jumlah tidak boleh kurang dari 0'],
    },
    status: {
      type: String,
      enum: ['Ditanam', 'Siap Panen', 'Sudah Dipanen'],
      default: 'Ditanam',
    },
  },
  {
    timestamps: true,
  }
);

const Crop = mongoose.model('Crop', cropSchema);
export default Crop;