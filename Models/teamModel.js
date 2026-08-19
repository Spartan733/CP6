const mongoose = require('mongoose')

const teamShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        
    }
)