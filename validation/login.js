const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    console.log(data);
    
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    let error = {};
  
    if(!validator.isEmail(data.email)) error.email = 'Email is not valid';
    if(validator.isEmpty(data.email)) error.email = 'Email field is Required';
    if(validator.isEmpty(data.password)) error.password = 'Password field is Required';

    return {
        error,
        isValid: isEmpty(error),
    }
}
