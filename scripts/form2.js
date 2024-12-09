const form = document.querySelector('form');
const cardName = document.getElementById('nameOnCard');
const ccn = document.getElementById('ccn');
const cvv = document.getElementById('cvv');
const expiry = document.getElementById('expiry');
const tos = document.getElementById('tos');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkInputs2();
});

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
    const inputControl = element.closest('.input-control');
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.closest('.input-control');
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
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