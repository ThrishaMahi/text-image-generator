import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import defaultImage from '../../Assets/default_image.svg'; // Adjusted import path

const ImageGeneratorComponent = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
            "User-Agent": "Chrome"
          },
          body: JSON.stringify({
            prompt: inputRef.current.value,
            n: 1,
            size: "512x512",
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        setImageUrl(data.data[0].url);
        setLoading(false);
      } else {
        console.error('Empty or undefined data received from the API');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className='ai-image-generator'>
      <div className="header"><span>AI</span>IMAGE <span>GENERATOR</span></div>
      <div className="img-loading">
        <div className="image">
          <img src={imageUrl === "/" ? defaultImage : imageUrl} alt="" />
          <div className="loading" />
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
        <div className="generate-btn" onClick={generateImage}>Generate</div>
      </div>
    </div>
  );
};

export default ImageGeneratorComponent;

