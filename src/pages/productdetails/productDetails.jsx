import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../Redux/productsApi";
import {
  Box,
  CircularProgress,
  Typography,
  Badge,
  Button,
  IconButton,
  styled,
} from "@mui/material";
import React, { useRef, useState } from "react";
import DetailsThumb from "./DetailsThump";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlic";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import "./details.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#1976d2",
      color: "#fff",
    },
  }));

  const { selectedProducts, selectedProductsID } = useSelector(
    (state) => state.cart
  );
  const { id } = useParams();
  const productId = parseInt(id, 10); // Ensure id is a number

  const { data, error, isLoading } = useGetProductByIdQuery();

  const [index, setIndex] = useState(0);
  const myRef = useRef(null);

  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  const productQuantity = (num) => {
    const product = selectedProducts.find((item) => item.id === num);
    return product ? product.Quantity : 0;
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    console.error("Error fetching product:", error);
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h1" color="error">
          ERROR
        </Typography>
      </Box>
    );
  }

  if (data) {
    const product = data.find((item) => item.id === productId);
    if (!product) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h1" color="error">
            Product Not Found
          </Typography>
        </Box>
      );
    }

    return (
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={product.imageLink[index]} alt={product.productName} />
          </div>

          <div className="box">
            <div className="row">
              <h2>{product.productName}</h2>
              <span>${product.price}</span>
            </div>
            <p>{product.description}</p>
            <DetailsThumb
              images={product.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {selectedProductsID.includes(product.id) ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "33px",
                }}
              >
                <IconButton
                  color="primary"
                  sx={{ mr: "10px" }}
                  onClick={() => dispatch(decreaseQuantity(product))}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <StyledBadge
                  badgeContent={productQuantity(product.id)}
                  color="secondary"
                />
                <IconButton
                  color="primary"
                  sx={{ ml: "10px" }}
                  onClick={() => dispatch(increaseQuantity(product))}
                >
                  <Add fontSize="small" />
                </IconButton>
              </div>
            ) : (
              <Button
                sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                variant="contained"
                color="primary"
                onClick={() => dispatch(addProduct(product))}
              >
                <ShoppingCart sx={{ fontSize: "18px", mr: 1 }} /> Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ProductDetails;
