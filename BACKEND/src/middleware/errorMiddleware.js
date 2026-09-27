import multer from "multer";


const errorMiddleware =
  (
    error,
    req,
    res,
    next
  ) => {

    console.error(
      "SERVER ERROR:",
      error
    );


    /* MULTER ERROR */

    if (
      error instanceof
      multer.MulterError
    ) {

      if (
        error.code ===
        "LIMIT_FILE_SIZE"
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Each image must be smaller than 5MB.",

        });

      }


      if (
        error.code ===
        "LIMIT_UNEXPECTED_FILE"
      ) {

        return res.status(400).json({

          success:
            false,

          message:
            "Too many images or incorrect image field name.",

        });

      }


      return res.status(400).json({

        success:
          false,

        message:
          error.message,

      });

    }


    return res.status(

      error.statusCode ||
      500

    ).json({

      success:
        false,

      message:
        error.message ||
        "Internal server error.",

    });

  };


export default errorMiddleware;