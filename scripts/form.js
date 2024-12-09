const form = document.querySelector('form');

const email = document.getElementById('clientmail');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const address = document.getElementById('address');
const city = document.getElementById('city');
const provinceOrTerritory = document.getElementById('provinceOrTerritory');
const postalCode = document.getElementById('postalCode');
const phone = document.getElementById('phone');
const cardName = document.getElementById('nameOnCard');
const ccn = document.getElementById('ccn');
const cvv = document.getElementById('cvv');
const expiry = document.getElementById('expiry');
const tos = document.getElementById('tos');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (cardName) {
        checkInputs2();
    } else {
        checkInputs();
    }
});

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const isValidPhone = phone => {
    const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    return re.test(String(phone));
};

const isValidCCN = ccn => {
    const re = /^(?:\d{4} ){3}\d{4}$|^\d{16}$|^(?:\d{4} \d{6} \d{5})$|^\d{15}$/;
    return re.test(String(ccn));
};

const isValidCVV = cvv => {
    const re = /^[0-9]{3,4}$/;
    return re.test(String(cvv));
};

const isValidExpiry = expiry => {
    const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    return re.test(String(expiry));
};

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const checkInputs = () => {
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();
    const provinceOrTerritoryValue = provinceOrTerritory.value;
    const postalCodeValue = postalCode.value.trim();
    
    if (addressValue === '') {
        setError(address, 'Address cannot be blank');
    } else if (addressValue.length < 5) {
        setError(address, 'Address is too short');
    } else {
        setSuccess(address);
    }

    if(cityValue === '') {
        setError(city, 'City cannot be blank');
    } else {
        setSuccess(city);
    }

    if(provinceOrTerritoryValue === '') {
        setError(provinceOrTerritory, 'Please select a province or territory');
    } else {
        setSuccess(provinceOrTerritory);
    }

    if(postalCodeValue === '') {
        setError(postalCode, 'Postal Code cannot be blank');
    } else {
        setSuccess(postalCode);
    }

    if(emailValue === '') {
        setError(email, 'Email cannot be blank');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Email is not valid');
    } else {
        setSuccess(email);
    }

    if(firstnameValue === '') {
        setError(firstname, 'First name cannot be blank');
    } else {
        setSuccess(firstname);
    }

    if(lastnameValue === '') {
        setError(lastname, 'Last name cannot be blank');
    } else {
        setSuccess(lastname);
    }

    if(phoneValue === '') {
        setError(phone, 'Phone cannot be blank');
    } else if (!isValidPhone(phoneValue)) {
        setError(phone, 'Phone number is not valid');
    } else {
        setSuccess(phone);
    }

    if(addressValue !== '' && 
       emailValue !== '' && 
       phoneValue !== '' && 
       firstnameValue !== '' && 
       lastnameValue !== '' && 
       cityValue !== '' &&
       provinceOrTerritoryValue !== '' &&
       postalCodeValue !== '' &&
       isValidEmail(emailValue) && 
       isValidPhone(phoneValue)) {
        window.location.href = 'checkout2.html';
    }
};

const checkInputs2 = () => {
    const cardNameValue = cardName.value.trim();
    const ccnValue = ccn.value.trim();
    const cvvValue = cvv.value.trim();
    const expiryValue = expiry.value.trim();

    if(cardNameValue === '') {
        setError(cardName, 'Card name cannot be blank');
    } else {
        setSuccess(cardName);
    }

    if(ccnValue === '') {
        setError(ccn, 'Credit card number cannot be blank');
    } else if (!isValidCCN(ccnValue)) {
        setError(ccn, 'Credit card number is not valid');
    } else {
        setSuccess(ccn);
    }

    if(cvvValue === '') {
        setError(cvv, 'CVV cannot be blank');
    } else if (!isValidCVV(cvvValue)) {
        setError(cvv, 'CVV is not valid');
    } else {
        setSuccess(cvv);
    }

    if(expiryValue === '') {
        setError(expiry, 'Expiry date cannot be blank');
    } else if (!isValidExpiry(expiryValue)) {
        setError(expiry, 'Expiry date is not valid');
    } else {
        setSuccess(expiry);
    }

    if(!tos.checked) {
        setError(tos, 'You must agree to the Terms and Conditions');
    } else {
        setSuccess(tos);
    }

    if(cardNameValue !== '' && 
       ccnValue !== '' && 
       cvvValue !== '' && 
       expiryValue !== '' && 
       tos.checked &&
       isValidCCN(ccnValue) && 
       isValidCVV(cvvValue) && 
       isValidExpiry(expiryValue)) {
        window.location.href = 'confirmation.html';
    }
};

