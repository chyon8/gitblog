import { useState } from 'react';

function useFormInput(initialValue) {

    
    function handleChange(e) {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    };
}