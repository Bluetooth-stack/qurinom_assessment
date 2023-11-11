import React, { useState } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

function FileInput({ id, fileHandleFunc }) {
    const [selected, setSelected] = useState(null);

    function onChangeHandle(e) {
        if (e.target.files[0]){
            setSelected(e.target.files[0]?.name);
            fileHandleFunc(e.target.files[0])
        }
    }

    return (
        <div className='fileInputHolder'>
            <label className='labelDesign' htmlFor={id}>
                {
                    selected ?
                        <>
                            <span style={{ color: 'var(--blue)', fontWeight: '500' }} >{selected}</span>
                            <ModeEditOutlineOutlinedIcon className='editIcon' />
                        </>
                        :
                        <>
                            {<UploadFileOutlinedIcon />} <span>Files</span>
                        </>
                }
            </label>
            <input type='file' id={id} style={{ display: 'none' }} onChange={onChangeHandle} />
        </div>
    )
}

export default FileInput