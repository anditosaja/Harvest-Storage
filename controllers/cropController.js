import Crop from '../models/Crop.js';

// GET semua data tanaman (mendukung query ?search= & ?status=)
export const getAllCrops = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    // Filter pencarian berdasarkan nama tanaman (case-insensitive)
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter berdasarkan status tanaman
    if (status) {
      query.status = status;
    }

    const crops = await Crop.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

// GET satu data tanaman berdasarkan ID
export const getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Data tanaman tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      data: crop,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Format ID tidak valid',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

// POST Tambah data tanaman baru
export const createCrop = async (req, res) => {
  try {
    const { name, category, quantity, status } = req.body;
    const newCrop = await Crop.create({ name, category, quantity, status });

    res.status(201).json({
      success: true,
      message: 'Tanaman berhasil ditambahkan ke penyimpanan',
      data: newCrop,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan data tanaman',
      error: error.message,
    });
  }
};

// PUT data tanaman berdasarkan ID
export const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Data tanaman tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data tanaman berhasil diperbarui',
      data: crop,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Format ID tidak valid',
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui data tanaman',
      error: error.message,
    });
  }
};

// DELETE data tanaman berdasarkan ID
export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Data tanaman tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      message: `Tanaman ${crop.name} berhasil dihapus dari penyimpanan`,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Format ID tidak valid',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus data tanaman',
      error: error.message,
    });
  }
};