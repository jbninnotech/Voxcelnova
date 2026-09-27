const Product = require("../models/Product");
const Inventory = require(
  "../models/Inventory"
);
const Production = require(
  "../models/Production"
);

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalProducts =
      await Product.countDocuments();

    const totalInventory =
      await Inventory.countDocuments();

    const activeProduction =
      await Production.countDocuments({
        status: "Running",
      });

    const lowStock =
      await Inventory.countDocuments({
        $expr: {
          $lte: [
            "$quantity",
            "$minimumStock",
          ],
        },
      });

    const completedProduction =
      await Production.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$completedQuantity",
            },
          },
        },
      ]);

    return res.status(200).json({
      success: true,

      data: {
        totalProducts,
        totalInventory,
        activeProduction,
        lowStock,

        totalCompletedUnits:
          completedProduction.length > 0
            ? completedProduction[0].total
            : 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};