const mongoose = require('mongoose')
const Schema = mongoose.Schema

const connectionSchema = Schema({
    eventName: {
        type: String,
        required: [true, 'Event name is required']
    },
    eventHost: {
        type: String,
        required: [true, 'Event host is required']
    },
    description: {
        type: String, 
        required: [true, 'Event description is requied'],
        minLength: [10, 'description should be at least 10 character']
    },
    type:{
        type: String,
        required:[true, 'Event type is required'],
        validate: {
            validator: function(v) {
              if(v == 'Vendor' || v =='Panel' || v =='Game'){
                return true
              }
              else{
                return false
              }
              
            },
            message: props => `${props.value} is not a valid value`
          },
    },
    date: {
        type: Date,
        required: [true, 'Event Date is required'],
        min: ['2023-01-30', 'Event is between Jan 30 and 31, 2023'],
        max:['2023-01-31', 'Event is between Jan 30 and 31, 2023']
    },
    startDateTime:{
        type: Date,
        required: [true, 'Event start time is required'],
        //custom validator for time
        validate: {
            validator: function(v) {
              if (v.getFullYear()==2023){
                if (v.getMonth()==0){
                    if (v.getDate()==30 || v.getDate() == 31){
                        if(v.getHours()>=9 && v.getHours()<=19){
                            return true
                        }
                    }
                }
              }
              else{
                return false
              }
            },
            message: 'Event on Jan 30 and 31, 2023, between 9am to 9pm'
          }
    },
    stopDateTime:{
        type: Date,
        required: [true, 'Event start time is required'],
        //custom validator for time
        validate: {
            validator: function(v) {
              if (v.getFullYear()==2023){
                if (v.getMonth()==0){
                    if (v.getDate()==30 || v.getDate() == 31){
                        if(v.getHours()>=9 && v.getHours()<=21){
                            return true
                        }
                    }
                }
              }
              else{
                return false
              }
            },
            message: 'Event on Jan 30 and 31, 2023, between 9am to 9pm'
          }
    },
    location: {
        type: String,
        required: [true, 'location is require']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    specialReq:{
        type: String
    }
})

//collection name is stories in the DB
module.exports = mongoose.model('Connection', connectionSchema)