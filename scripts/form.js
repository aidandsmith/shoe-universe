const form = document.querySelector('form');

const email = document.getElementById('clientmail');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const address = document.getElementById('address');
const city = document.getElementById('city');
const provinceOrTerritory = document.getElementById('provinceOrTerritory');
const postalCode = document.getElementById('postalCode');
const phone = document.getElementById('phone');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkInputs();
});

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const isValidPhone = phone => {
    const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    return re.test(String(phone));
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

