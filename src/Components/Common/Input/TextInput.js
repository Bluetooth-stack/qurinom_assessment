import React from 'react'

function TextInput({ rows, cols, value, setValue, required, placeholder }) {
    return (
        <section className='inputHolder'>
            <textarea className='input'
                rows={rows}
                cols={cols}
                value={value}
                onChange={(e) => { setValue(e.target.value) }}
                required={required}
                placeholder={placeholder}
            ></textarea>
            <div className='bottom'></div>
        </section>
    )
}

export default TextInput