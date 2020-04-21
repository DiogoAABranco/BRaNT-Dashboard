import React,{Fragment, useState} from 'react'

//https://www.youtube.com/watch?v=b6Oe2puTdMQ
const FileUploader = () => {
    const [file,setFile] = useState('');
    const [filename, setFilename] = useState('Escolher ficheiro');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);
        
    }


    return <Fragment>

    <form onSubmit={onSubmit}>
        <div className="custom-file mt-2">
            <input type="file" className="custom-file-input" id="customFile" lang="pt-pt" onChange={onChange}/>
            <label className="custom-file-label" htmlFor="customFile">{filename}</label>

        </div>
        
    </form>
    
</Fragment>
}
    

export default FileUploader