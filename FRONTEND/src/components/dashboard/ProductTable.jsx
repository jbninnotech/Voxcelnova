import {

  FaTrash,

  FaBoxOpen,

} from "react-icons/fa";


export default function ProductTable({

  products,

  loading,

  onDelete,

}) {

  if (
    loading
  ) {

    return (

      <div
        className="text-center py-5"
      >

        Loading products...

      </div>

    );

  }


  if (
    !products ||
    products.length === 0
  ) {

    return (

      <div
        className="text-center py-5"
      >

        <FaBoxOpen
          style={{
            fontSize:
              "45px",

            color:
              "#94A3B8",

            marginBottom:
              "15px",
          }}
        />


        <h5>
          No Products Found
        </h5>


        <p
          style={{
            color:
              "#64748B",
          }}
        >
          Start by adding your first product.
        </p>

      </div>

    );

  }


  return (

    <div
      className="table-responsive"
    >

      <table
        className="table align-middle mb-0"
      >

        <thead
          style={{
            background:
              "#F8FAFC",
          }}
        >

          <tr>

            <th>
              Product
            </th>

            <th>
              SKU
            </th>

            <th>
              Category
            </th>

            <th>
              Price
            </th>

            <th>
              Stock
            </th>

            <th>
              Status
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {products.map(
            (
              product
            ) => {

              const imageUrl =
                product.thumbnail?.url ||
                product.images?.[0]?.url;


              return (

                <tr
                  key={
                    product._id
                  }
                >

                  <td>

                    <div
                      className="d-flex align-items-center gap-3"
                    >

                      <img

                        src={
                          imageUrl ||
                          "https://via.placeholder.com/80"
                        }

                        alt={
                          product.name
                        }

                        style={{
                          width:
                            "55px",

                          height:
                            "55px",

                          objectFit:
                            "cover",

                          borderRadius:
                            "10px",

                          border:
                            "1px solid #E5E7EB",

                        }}

                      />


                      <div>

                        <div
                          className="fw-bold"
                          style={{
                            color:
                              "#071A36",
                          }}
                        >
                          {product.name}
                        </div>


                        <small
                          style={{
                            color:
                              "#64748B",
                          }}
                        >
                          {product.material ||
                            "No material"}
                        </small>

                      </div>

                    </div>

                  </td>


                  <td>
                    {product.sku}
                  </td>


                  <td>

                    <span
                      style={{
                        background:
                          "#EAF4FF",

                        color:
                          "#0D6EFD",

                        padding:
                          "6px 10px",

                        borderRadius:
                          "20px",

                        fontSize:
                          "12px",

                        fontWeight:
                          600,

                      }}
                    >
                      {product.category}
                    </span>

                  </td>


                  <td
                    className="fw-bold"
                  >
                    ₹{product.price}
                  </td>


                  <td>

                    <span
                      className={
                        product.stock > 0
                          ? "text-success fw-semibold"
                          : "text-danger fw-semibold"
                      }
                    >
                      {product.stock}
                    </span>

                  </td>


                  <td>

                    <span
                      style={{
                        color:
                          product.isActive
                            ? "#16A34A"
                            : "#DC2626",

                        fontWeight:
                          600,

                        fontSize:
                          "13px",

                      }}
                    >
                      {product.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>


                  <td>

                    <button

                      type="button"

                      onClick={
                        () =>
                          onDelete(
                            product._id
                          )
                      }

                      className="btn btn-sm"

                      style={{
                        background:
                          "#FEE2E2",

                        color:
                          "#DC2626",

                      }}

                    >

                      <FaTrash />

                    </button>

                  </td>

                </tr>

              );

            }
          )}

        </tbody>

      </table>

    </div>

  );

}