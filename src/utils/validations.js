export function validationRegister(values) {
    let errors = {};
    
    if (!values.name) {
        errors.name = 'Name required';
    } else if (values.name.length < 3 || values.name.length>19) {
        errors.name = 'Name must be between 3 to 20 characters';
    }
    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8 || values.password.length > 16) {
        errors.password = 'Password must be between 8 to 16 characters';
    }
    if (!values.password2) {
        errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
        errors.password2 = 'Passwords do not match';
    }
    return errors;
}

export const validationLogin = (values) => {
    let errors = {};
    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8 || values.password.length > 16) {
        errors.password = 'Password must be between 8 to 16 characters';
    }
    return errors;
}