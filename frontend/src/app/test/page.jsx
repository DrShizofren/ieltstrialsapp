"use client"
import { useState } from "react";

export default function ProfileImageUploader() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    
    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/webp")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    } else {
      alert("Please upload a PNG, JPEG, or WebP file.");
    }
  };

  const handleSubmit = () => {
    if (!image) {
      alert("No image selected!");
      return;
    }
    alert("Image uploaded successfully!");
    // In a real-world case, you'd send the 'image' file to a backend API
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px", width: "320px", margin: "40px auto" }}>
      
      <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} style={{ display: "none" }} id="fileInput" />
      <label htmlFor="fileInput" style={{ cursor: "pointer", backgroundColor: "#e0e0e0", padding: "8px", borderRadius: "8px" }}>Choose a Profile Image</label>
      {preview && <img src={preview} alt="Profile Preview" style={{ width: "96px", height: "96px", borderRadius: "50%", objectFit: "cover", border: "1px solid #000" }} />}
      <button onClick={handleSubmit} style={{ backgroundColor: "#007bff", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Upload</button>
    </div>
  );
}
