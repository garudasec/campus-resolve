import mongoose from "mongoose";


const issueSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Attendance','Fine','Result','Network','Portal','Infrastructure','Other'],
        required: true
    },
    priority: {
        type: String,
        enum: ['Low','Medium','High'],
        default: "Medium",
        required: true
    },
    status: {
        type: String,
        enum: ['Open','In Progress','Resolved','Rejected'],
        default: "Open"

    },
    assignedDepartment: {
        type: String,
        enum: ['Academic','Accounts','Examination','IT','Facilities','Other'],
        default: null
    },
    adminRemark: {
        type: String,
        default: ""
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
}, {timestamps: true})


const Issue = mongoose.model('Issue', issueSchema)

export default Issue