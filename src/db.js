import mongoose from 'mongoose'

const rateSchema = new mongoose.Schema({
  seriesId:   { type: Number, required: true, index: true },
  seriesKey:  { type: String, required: true, index: true },
  value:      { type: Number, required: true },
  refDate:    { type: String, required: true },
  synced_at:  { type: Date, default: Date.now }
})

rateSchema.index({ seriesKey: 1, refDate: -1 })

export const Rate = mongoose.model('Rate', rateSchema)
