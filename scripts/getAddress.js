document.addEventListener("DOMContentLoaded", function () {
    const addressInput = document.getElementById('address');
    const autocomplete = new google.maps.places.Autocomplete(addressInput, {
        types: ['address'],
        componentRestrictions: { country: 'ca' },
        fields: ['address_components'],
    });

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.address_components) {
            console.log("No details available for input: '" + place.name + "'");
            return;
        }

        const addressComponents = place.address_components;
        addressComponents.forEach(component => {
            const types = component.types;
            if (types.includes('locality')) {
                document.getElementById('city').value = component.long_name;
            }
            if (types.includes('administrative_area_level_1')) {
                document.getElementById('provinceOrTerritory').value = component.short_name;
            }
            if (types.includes('postal_code')) {
                document.getElementById('postalCode').value = component.long_name;
            }
        });
    });
});
