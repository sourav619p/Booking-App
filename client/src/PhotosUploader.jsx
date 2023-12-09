import axios from "axios";
import { useState } from "react";

export default function PhotosUploader({addedPhotos, onChange}){
    const [photoLink,setPhotoLink] = useState('');

    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink})
        onChange(prev => {
          return [...prev, filename];
        });
        setPhotoLink('');
      }
    
      function uploadPhoto(ev){
      const files = ev.target.files;
      const data = new FormData();
      for (let i =0 ;i < files.length; i++){
        data.append('photos',files[i]);
      }
      axios.post('/upload', data ,{
        headers: {'Content-Type':'multipart/form-data'}
      }).then(response => {
        console.log(response,"-----------response") 
        const {data:filenames} = response;
        onChange(prev => {
          return [...prev, ...filenames];
        });
      })
      }

      function removePhoto(ev,filename){
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)])
      }

      function selectAsMainPhoto(ev,filename){
        ev.preventDefault();
       onChange([filename,...addedPhotos.filter(photo => photo !== filename)]);
      }

    return(
        <>
        <div className="flex gap-2">
        <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a link ...jpg'} />
        <button onClick={addPhotoByLink} className="bg-gray-200 rounded-2xl">Add&nbsp;photo</button>
      </div>
      <div className="mt-2 flex gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 && addedPhotos.map(link => (
          <div key={link} className="relative">
            <img className="rounded-2xl max-w-20 max-h-20" src={'http://localhost:4000/uploads/'+link} alt="" />
            <button onClick={ev => removePhoto(ev,link)} className="cursor-pointer absolute bottom-1 right-2 rounded bg-primary border border-white bg-opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            </button>
            <button onClick={ev => selectAsMainPhoto(ev,link)} className="cursor-pointer absolute bottom-1 left-2 rounded bg-primary border border-white bg-opacity-50">
            {link === addedPhotos[0] && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="yellow" className="w-6 h-6">
            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
            )}
            {link !== addedPhotos[0] && (
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-6 h-6">
               <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
               </svg>
            )}
            </button>
          </div>
        ))}
      <label className=" cursor-pointer border bg-transparent flex items-center rounded-2xl p-2 mt-2 text-gray-600">
      <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
        Upload
        </label>
      </div>
      </>
    )
}