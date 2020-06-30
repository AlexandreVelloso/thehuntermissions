import React, { useState, useEffect } from 'react';

import './styles.css';

export default function Checkbox({ id, label, checked, onChange }: { id: number, label: string, checked: boolean, onChange: any }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    function handleOnChange() {
        const newState = !isChecked;
        setIsChecked(newState);
        onChange(id, newState);
    }

    return (
        <label className="checkbox-container">
            {label}
            <input value={id} type="checkbox" checked={isChecked} onChange={handleOnChange} />
            <span className="checkmark"></span>
        </label>
    );
}