document.addEventListener("DOMContentLoaded", function () {
    const addressInput = document.getElementById('address');

    if (!addressInput) {
        console.error('Address input element not found');
        return;
    }

    try {
        const autocomplete = new google.maps.places.Autocomplete(addressInput, {
            types: ['address'],
            componentRestrictions: { country: 'ca' },
            fields: ['address_components']
        });

        autocomplete.addListener('place_changed', () => {
            try {
                const place = autocomplete.getPlace();
                
        
                if (!place || !place.address_components) {
                    console.warn("No valid address details available");
                    return;
                }

                place.address_components.forEach(component => {
                    const types = component.types;
                    
                    if (types.includes('locality')) {
                        const cityInput = document.getElementById('city');
                        if (cityInput) cityInput.value = component.long_name;
                    }
    
                    if (types.includes('administrative_area_level_1')) {
                        const provinceInput = document.getElementById('provinceOrTerritory');
                        if (provinceInput) provinceInput.value = component.short_name;
                    }
                
                    if (types.includes('postal_code')) {
                        const postalInput = document.getElementById('postalCode');
                        if (postalInput) postalInput.value = component.long_name;
                    }
                });
            } catch (error) {
                console.error('Error handling place selection:', error);
            }
        });

    } catch (error) {
        console.error('Error initializing Google Places Autocomplete:', error);
    }
});
