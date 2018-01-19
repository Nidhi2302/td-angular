import { Validators, FormGroup } from "@angular/forms";

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'onlyName': 'Only characters are allowed.',
            'invalidMobileNumber': "Invalid mobile number.",
            'notValidValue': `Value of ${validatorValue} is not valid.`
        };

        return config[validatorName];
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value != null) {
            if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z](?:[a-z0-9-]*[a-z0-9])?/)) {
                return null;
            } else {
                return { 'invalidEmailAddress': true };
            }
        }
        else {
            return null;
        }

    }

    static passwordValidator(control) {
        // {8,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        // Password must have at one uppercase letter, one lowercase letter, one number and one special character.
        if (control.value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@_#$%^&*])[a-zA-Z0-9!@_#$%^&*]{8,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static onlyTextValidator(control) {
        // {Firstname, Lastname} - Assert textbox only have text no special char and numbers.

        if (control.value.match(/^[a-zA-Z]*$/)) {
            return null;
        } else {
            return { 'onlyName': true };
        }
    }

    static mobileNumberValidator(control) {
        // Valid mobile number entry.
        // {+1 8087339090}, {+91 8087339090}, {+912 8087339090}, {8087339090}, {0808733909}, {+1-8087339090}, {+91-8087339090}, {+912-8087339090}, {+918087677876}, {+9108087735454}
        if (control.value != null) {
            if (control.value.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                return null;
            } else {
                return { 'invalidMobileNumber': true };
            }
        } else { return null; }
    }
    static patternValidation(pattern) {
        return Validators.compose([Validators.required, Validators.pattern(pattern)])
    }
    //checkPassword match 
    static checkPasswords(group: FormGroup) {
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notSame: true }
    }

    // static isLat(control){
    //     if (control.value.match(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)) {
    //         return null;
    //     } else {
    //         return { 'invalidLat': true };
    //     }
    // }

    // static isLng(control){
    //     if (control.value.match(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)) {
    //         return null;
    //     } else {
    //        return { 'invalidLng': true };
    //     }
    // } 
    
    static checkOnlyNumber(control){
        if (control.value.match(/^(?:[1-9]\d*|\d)$/)) {
            return null;
        } else {
            return { 'message':  ValidationService.getValidatorErrorMessage('notValidValue', 'length')};
        }
    }
    static isLat(control) {
       if (control.value != null) {
           console.log(control.value);
            if (control.value>=-90 && control.value<=90) {
                return null;
            } else {
                return { 'invalidLat': true };
            }
        } else { return null; }
    }
    static isLng(control) {
        if (control.value != null) {
            console.log(control.value);
             if (control.value>=-180 && control.value<=180) {
                 return null;
             } else {
                 return { 'invalidLng': true };
             }
         } else { return null; }
     }
}
