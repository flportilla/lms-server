const mongoose = require('mongoose')

const dbConnect = async (URI) => {

  try {
    await mongoose.connect(URI)
    console.log('Connected to MongoDB')

  } catch (error) {
    console.log(error)
    throw new Error("Couldn't connect to MongoDB")
  }
}

module.exports = {
  dbConnect
}