export const formFieldValidation = (formFields)=>{
    if(!formFields.get('firstName')){
        return {validation:false, msg:'Please enter your first name and make sure all other fields are filled in.'};
    }else if(!formFields.get('lastName')){
        return {validation:false, msg:'Please enter your last name and make sure all other fields are filled in.'};
    }else if(!formFields.get('email')){
        return {validation:false, msg:'Please enter your email and make sure all other fields are filled in.'};
    }else if(!formFields.get('password')){
        return {validation:false, msg:'Please enter a secure password and make sure all other fields are filled in.'};
    }else if(!formFields.get('confirmPassword')){
        return {validation:false, msg:'Please confirm that both passwords match and make sure all other fields are filled in.'};
    }else{
        return {validation:true, msg:''};
    }
};