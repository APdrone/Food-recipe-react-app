'use client';

import { useRef, useState } from 'react';
import classes from './imagePicker.module.css';
import Image from 'next/image';

const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();
  const handlePickClick = () => {
    imageInput.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log('no files load');
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log('working load');
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="image selected by user" fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png,image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
