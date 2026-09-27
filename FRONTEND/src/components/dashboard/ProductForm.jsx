import {
  useState,
} from "react";

import ProductImageUpload from "./ProductImageUpload";

import {
  createProduct,
} from "../../services/productService";


export default function ProductForm({

  onSuccess,

}) {

  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    message,
    setMessage,
  ] = useState("");


  const [
    error,
    setError,
  ] = useState("");


  const [
    images,
    setImages,
  ] = useState([]);


  const [
    formData,
    setFormData,
  ] = useState({

    name:
      "",

    sku:
      "",

    category:
      "",

    price:
      "",

    stock:
      "",

    description:
      "",

    material:
      "",

    sizes:
      "",

    colors:
      "",

  });


  const categories = [

    "T-Shirts",

    "Shirts",

    "Polo T-Shirts",

    "Hoodies & Sweatshirts",

    "School Uniforms",

    "College Uniforms",

    "Corporate Uniforms",

    "Hospital Uniforms",

    "Hotel & Hospitality Uniforms",

    "Sportswear",

    "Custom Printed Clothing",

    "Bulk Orders",

    "Industrial Safety Uniforms",

    "Custom Manufacturing",

  ];


  const handleChange =
    (event) => {

      const {
        name,
        value,
      } =
        event.target;


      setFormData({

        ...formData,

        [name]:
          value,

      });

    };


  const handleSubmit =
    async (
      event
    ) => {

      event.preventDefault();

      setError("");
      setMessage("");


      if (
        images.length ===
        0
      ) {

        setError(
          "Please upload at least one product image."
        );

        return;

      }


      try {

        setLoading(
          true
        );


        const data =
          new FormData();


        data.append(
          "name",
          formData.name
        );


        data.append(
          "sku",
          formData.sku
        );


        data.append(
          "category",
          formData.category
        );


        data.append(
          "price",
          formData.price
        );


        data.append(
          "stock",
          formData.stock
        );


        data.append(
          "description",
          formData.description
        );


        data.append(
          "material",
          formData.material
        );


        /* Convert comma-separated text into JSON arrays */

        const sizes =
          formData.sizes

            .split(",")

            .map(
              (item) =>
                item.trim()
            )

            .filter(
              Boolean
            );


        const colors =
          formData.colors

            .split(",")

            .map(
              (item) =>
                item.trim()
            )

            .filter(
              Boolean
            );


        data.append(
          "sizes",
          JSON.stringify(
            sizes
          )
        );


        data.append(
          "colors",
          JSON.stringify(
            colors
          )
        );


        images.forEach(
          (image) => {

            data.append(
              "images",
              image
            );

          }
        );


        const response =
          await createProduct(
            data
          );


        setMessage(
          response.message ||
          "Product added successfully."
        );


        setFormData({

          name:
            "",

          sku:
            "",

          category:
            "",

          price:
            "",

          stock:
            "",

          description:
            "",

          material:
            "",

          sizes:
            "",

          colors:
            "",

        });


        setImages([]);


        if (
          onSuccess
        ) {

          setTimeout(
            () => {

              onSuccess();

            },
            800
          );

        }

      } catch (error) {

        setError(
          error.message ||
          "Failed to add product."
        );

      } finally {

        setLoading(
          false
        );

      }

    };


  return (

    <form
      onSubmit={
        handleSubmit
      }
    >

      {message && (

        <div
          className="alert alert-success"
        >
          {message}
        </div>

      )}


      {error && (

        <div
          className="alert alert-danger"
        >
          {error}
        </div>

      )}


      <div
        className="row g-4"
      >

        {/* PRODUCT NAME */}

        <div
          className="col-md-6"
        >

          <label
            className="form-label fw-semibold"
          >
            Product Name
          </label>


          <input

            type="text"

            name="name"

            value={
              formData.name
            }

            onChange={
              handleChange
            }

            className="form-control"

            placeholder="Premium Cotton T-Shirt"

            required

          />

        </div>


        {/* SKU */}

        <div
          className="col-md-6"
        >

          <label
            className="form-label fw-semibold"
          >
            SKU
          </label>


          <input

            type="text"

            name="sku"

            value={
              formData.sku
            }

            onChange={
              handleChange
            }

            className="form-control"

            placeholder="TS-001"

            required

          />

        </div>


        {/* CATEGORY */}

        <div
          className="col-md-6"
        >

          <label
            className="form-label fw-semibold"
          >
            Category
          </label>


          <select

            name="category"

            value={
              formData.category
            }

            onChange={
              handleChange
            }

            className="form-select"

            required

          >

            <option value="">
              Select Category
            </option>


            {categories.map(
              (
                category
              ) => (

                <option
                  key={
                    category
                  }

                  value={
                    category
                  }
                >
                  {category}
                </option>

              )
            )}

          </select>

        </div>


        {/* MATERIAL */}

        <div
          className="col-md-6"
        >

          <label
            className="form-label fw-semibold"
          >
            Material
          </label>


          <input

            type="text"

            name="material"

            value={
              formData.material
            }

            onChange={
              handleChange
            }

            className="form-control"

            placeholder="100% Cotton"

          />

        </div>


        {/* PRICE */}

        <div
          className="col-md-6"
        >

          <label
            className="form-label fw-semibold"
          >
            Price (₹)
          </label>


          <input

            type="number"

            name="price"

            value={
              formData.price
            }

            onChange={
              handleChange
            }

            className="form-control"

            min="0"

            required

          />

        </div>


        {/* STOCK */}

        <div
          className="col-md-6"
        >

          <label
            className="form-label fw-semibold"
          >
            Stock
          </label>


          <input

            type="number"

            name="stock"

            value={
              formData.stock
            }

            onChange={
              handleChange
            }

            className="form-control"

            min="0"

            required

          />

        </div>


        {/* SIZES */}

        <div
          className="col-md-6"
        >

          <label
            className="form-label fw-semibold"
          >
            Available Sizes
          </label>


          <input

            type="text"

            name="sizes"

            value={
              formData.sizes
            }

            onChange={
              handleChange
            }

            className="form-control"

            placeholder="S, M, L, XL, XXL"

          />

        </div>


        {/* COLORS */}

        <div
          className="col-md-6"
        >

          <label
            className="form-label fw-semibold"
          >
            Available Colors
          </label>


          <input

            type="text"

            name="colors"

            value={
              formData.colors
            }

            onChange={
              handleChange
            }

            className="form-control"

            placeholder="Black, White, Blue"

          />

        </div>


        {/* DESCRIPTION */}

        <div
          className="col-12"
        >

          <label
            className="form-label fw-semibold"
          >
            Product Description
          </label>


          <textarea

            name="description"

            value={
              formData.description
            }

            onChange={
              handleChange
            }

            className="form-control"

            rows="5"

            placeholder="Write complete product description..."

          />

        </div>


        {/* IMAGES */}

        <div
          className="col-12"
        >

          <label
            className="form-label fw-semibold mb-3"
          >
            Product Images
          </label>


          <ProductImageUpload

            images={
              images
            }

            setImages={
              setImages
            }

          />

        </div>


        {/* BUTTON */}

        <div
          className="col-12"
        >

          <button

            type="submit"

            disabled={
              loading
            }

            className="btn"

            style={{
              background:
                "linear-gradient(135deg, #0D6EFD, #2563EB)",

              color:
                "#FFFFFF",

              padding:
                "13px 35px",

              borderRadius:
                "10px",

              fontWeight:
                600,

              minWidth:
                "180px",

            }}

          >

            {loading
              ? "Uploading..."
              : "Add Product"}

          </button>

        </div>

      </div>

    </form>

  );

}