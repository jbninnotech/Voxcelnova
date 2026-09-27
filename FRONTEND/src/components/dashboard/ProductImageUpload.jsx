import React, { useRef } from "react";
import { FiUpload, FiX, FiImage } from "react-icons/fi";

export default function ProductImageUpload({
  images,
  setImages,
}) {
  const inputRef = useRef(null);

  const handleFiles = (fileList) => {
    const selectedFiles = Array.from(fileList);

    const validFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    const combined = [...images, ...validFiles].slice(0, 10);

    setImages(combined);
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();

    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={styles.uploadBox}
      >
        <div style={styles.uploadIcon}>
          <FiUpload />
        </div>

        <h4 style={styles.title}>
          Drag & drop images here
        </h4>

        <p style={styles.text}>
          or click to browse from your computer
        </p>

        <span style={styles.info}>
          JPG, PNG, WEBP • Maximum 10 images
        </span>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleInputChange}
          style={{ display: "none" }}
        />
      </div>

      {images.length > 0 && (
        <div style={styles.previewGrid}>
          {images.map((image, index) => (
            <div
              key={`${image.name}-${index}`}
              style={styles.preview}
            >
              <img
                src={URL.createObjectURL(image)}
                alt={image.name}
                style={styles.image}
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                style={styles.remove}
              >
                <FiX />
              </button>

              {index === 0 && (
                <span style={styles.primary}>
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div style={styles.empty}>
          <FiImage />
          <span>No images selected</span>
        </div>
      )}

    </div>
  );
}

const styles = {
  uploadBox: {
    border: "1px dashed #38506f",
    borderRadius: "14px",
    padding: "40px 20px",
    textAlign: "center",
    background: "#0b1220",
    cursor: "pointer",
  },

  uploadIcon: {
    width: "50px",
    height: "50px",
    margin: "0 auto 15px",
    borderRadius: "50%",
    background: "rgba(37,99,235,0.12)",
    color: "#60a5fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  title: {
    margin: 0,
    fontSize: "15px",
    color: "#dbe6f5",
  },

  text: {
    margin: "7px 0",
    fontSize: "13px",
    color: "#7889a3",
  },

  info: {
    fontSize: "11px",
    color: "#566982",
  },

  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "15px",
  },

  preview: {
    height: "105px",
    borderRadius: "9px",
    overflow: "hidden",
    position: "relative",
    background: "#0b1220",
    border: "1px solid #27354b",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  remove: {
    position: "absolute",
    top: "5px",
    right: "5px",
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.7)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  primary: {
    position: "absolute",
    bottom: "5px",
    left: "5px",
    background: "#2563eb",
    color: "#fff",
    fontSize: "10px",
    padding: "3px 7px",
    borderRadius: "5px",
  },

  empty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    color: "#53647d",
    fontSize: "12px",
    marginTop: "15px",
  },
};