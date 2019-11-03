const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    console.log(data);
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    let error = {};
    if(!validator.isLength(data.name, { min: 2 ,max: 30 })){
        error.name = 'Name length must be greater then 2 and less then 30';
    }
    
    if(!validator.isLength(data.password, { min: 8 ,max: 30 })){
        error.password = 'Password length must be greater then 8 and less then 30';
    }
    if(validator.isEmpty(data.name)) error.name = 'Name field is Required';
    if(validator.isEmpty(data.email)) error.email = 'Email field is Required';
    if(!validator.isEmail(data.email)) error.email = 'Email is not valid';
    if(validator.isEmpty(data.password)) error.password = 'Password field is Required';
    if(validator.isEmpty(data.password2)) error.password2 = 'Confirm field Password is Required';

    if(!validator.equals(data.password, data.password2)){
        error.confirmpassword = 'Password not match '
    }
    return {
        error,
        isValid: isEmpty(error),
    }
}
