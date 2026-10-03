import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { validateCouponApi } from "../services/orderService";

const CartContext = createContext();
const CART_STORAGE_KEY = "voxcel_nova_cart";
const COUPON_STORAGE_KEY = "voxcel_nova_coupon";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = sessionStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const savedCoupon = sessionStorage.getItem(COUPON_STORAGE_KEY) || localStorage.getItem(COUPON_STORAGE_KEY);
      return savedCoupon ? JSON.parse(savedCoupon) : null;
    } catch (error) {
      return null;
    }
  });

  /* =====================================================
     PERSISTENCE (SESSIONSTORAGE)
  ===================================================== */
  useEffect(() => {
    try {
      sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      // Clean old localStorage key if present
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        sessionStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        sessionStorage.removeItem(COUPON_STORAGE_KEY);
      }
      localStorage.removeItem(COUPON_STORAGE_KEY);
    } catch (e) {}
  }, [appliedCoupon]);

  /* =====================================================
     ADD TO CART
  ===================================================== */
  const addToCart = ({
    product,
    quantity = 1,
    size = "",
    color = "",
  }) => {
    if (!product?._id) {
      return { success: false, message: "Invalid product" };
    }

    const minimumOrder = Number(product.minimumOrderQuantity) || 1;
    const requestedQuantity = Math.max(Number(quantity) || 1, minimumOrder);
    const selectedPrice =
      product.salePrice !== null &&
      product.salePrice !== undefined &&
      Number(product.salePrice) > 0
        ? Number(product.salePrice)
        : Number(product.price) || 0;

    const availableStock = typeof product.stock === "number" ? product.stock : 999;

    setCartItems((previousItems) => {
      const existingIndex = previousItems.findIndex(
        (item) =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex !== -1) {
        const updatedItems = [...previousItems];
        const newQty = Math.min(
          updatedItems[existingIndex].quantity + requestedQuantity,
          availableStock
        );
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: newQty,
          subtotal: updatedItems[existingIndex].price * newQty,
        };
        return updatedItems;
      }

      const cartItem = {
        cartItemId: `${product._id}-${size}-${color}-${Date.now()}`,
        productId: product._id,
        name: product.name,
        slug: product.slug || "",
        image:
          product.thumbnail ||
          product.images?.[0]?.url ||
          (typeof product.images?.[0] === "string" ? product.images[0] : ""),
        price: selectedPrice,
        originalPrice: Number(product.price) || 0,
        salePrice: product.salePrice ?? null,
        quantity: Math.min(requestedQuantity, availableStock),
        subtotal: selectedPrice * Math.min(requestedQuantity, availableStock),
        size,
        color,
        availableSizes: product.sizes || ["S", "M", "L", "XL", "XXL"],
        stock: availableStock,
        sku: product.sku || "",
        category: product.category || "",
        minimumOrderQuantity: minimumOrder,
      };

      return [...previousItems, cartItem];
    });

    return {
      success: true,
      message: "Product added to cart",
    };
  };

  /* =====================================================
     REMOVE FROM CART
  ===================================================== */
  const removeFromCart = (cartItemId) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item.cartItemId !== cartItemId && item.productId !== cartItemId
      )
    );
  };

  /* =====================================================
     CHANGE ITEM SIZE
  ===================================================== */
  const changeItemSize = (cartItemId, newSize) => {
    setCartItems((previousItems) => {
      const targetItem = previousItems.find(
        (item) => item.cartItemId === cartItemId || item.productId === cartItemId
      );
      if (!targetItem) return previousItems;

      const existingMatch = previousItems.find(
        (item) =>
          item.productId === targetItem.productId &&
          item.size === newSize &&
          item.color === targetItem.color &&
          item.cartItemId !== targetItem.cartItemId
      );

      if (existingMatch) {
        return previousItems
          .filter((item) => item.cartItemId !== targetItem.cartItemId)
          .map((item) => {
            if (item.cartItemId === existingMatch.cartItemId) {
              const mergedQty = Math.min(
                item.quantity + targetItem.quantity,
                item.stock || 999
              );
              return {
                ...item,
                quantity: mergedQty,
                subtotal: item.price * mergedQty,
              };
            }
            return item;
          });
      } else {
        return previousItems.map((item) => {
          if (item.cartItemId === cartItemId || item.productId === cartItemId) {
            return {
              ...item,
              size: newSize,
              cartItemId: `${item.productId}-${newSize}-${item.color}-${Date.now()}`,
            };
          }
          return item;
        });
      }
    });
  };

  /* =====================================================
     UPDATE QUANTITY
  ===================================================== */
  const updateQuantity = (cartItemId, newQuantity) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.cartItemId !== cartItemId && item.productId !== cartItemId) {
          return item;
        }

        const minOrder = Number(item.minimumOrderQuantity) || 1;
        const maxStock = Number(item.stock) > 0 ? Number(item.stock) : 999;
        const validQuantity = Math.min(
          Math.max(Number(newQuantity) || minOrder, minOrder),
          maxStock
        );

        return {
          ...item,
          quantity: validQuantity,
          subtotal: Number(item.price || 0) * validQuantity,
        };
      })
    );
  };

  const increaseQuantity = (cartItemId) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.cartItemId !== cartItemId && item.productId !== cartItemId) {
          return item;
        }
        const maxStock = Number(item.stock) > 0 ? Number(item.stock) : 999;
        const newQty = Math.min(item.quantity + 1, maxStock);
        return {
          ...item,
          quantity: newQty,
          subtotal: item.price * newQty,
        };
      })
    );
  };

  const decreaseQuantity = (cartItemId) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.cartItemId !== cartItemId && item.productId !== cartItemId) {
          return item;
        }
        const minOrder = Number(item.minimumOrderQuantity) || 1;
        const newQty = Math.max(item.quantity - 1, minOrder);
        return {
          ...item,
          quantity: newQty,
          subtotal: item.price * newQty,
        };
      })
    );
  };

  /* =====================================================
     COUPON MANAGEMENT
  ===================================================== */
  const applyCoupon = async (code) => {
    try {
      const data = await validateCouponApi(code, cartTotal);
      if (data.success && data.coupon) {
        setAppliedCoupon(data.coupon);
        return { success: true, message: data.message };
      }
      return { success: false, message: "Invalid coupon" };
    } catch (err) {
      return { success: false, message: err.message || "Invalid coupon code" };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  const deliveryCharge = useMemo(() => {
    if (cartItems.length === 0) return 0;
    if (appliedCoupon?.code === "FREESHIP") return 0;
    return cartTotal > 1000 ? 0 : 99;
  }, [cartTotal, cartItems, appliedCoupon]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return appliedCoupon.discount || 0;
  }, [appliedCoupon]);

  const finalTotal = useMemo(() => {
    return Math.max(0, cartTotal + deliveryCharge - discountAmount);
  }, [cartTotal, deliveryCharge, discountAmount]);

  const isInCart = (productId, size = "", color = "") => {
    return cartItems.some(
      (item) =>
        item.productId === productId &&
        (!size || item.size === size) &&
        (!color || item.color === color)
    );
  };

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    deliveryCharge,
    discountAmount,
    finalTotal,
    appliedCoupon,
    addToCart,
    removeFromCart,
    changeItemSize,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};

export default CartContext;