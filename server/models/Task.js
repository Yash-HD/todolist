const mongoose = require('mongoose'); 

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,      
    required: true     
  },
  completed: {
    type: Boolean,     
    default: false     
  },
  userId:{
    type: String,
    required: true
  }

});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
