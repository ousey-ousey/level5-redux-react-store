import "./Home.css";
import React from "react";
import {
  Typography,
  Button,
  Stack,
  Box,
  CircularProgress,
  IconButton,
  Badge,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Add, Error, Remove, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlic";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../Redux/productsApi";

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { selectedProductsID, selectedProducts } = useSelector(
    (state) => state.cart
  );

  const productQuantity = (num) => {
    const product = selectedProducts.find((item) => item.id === num);
    return product ? product.Quantity : 0;
  };

  const { data, error, isLoading } = useGetProductsQuery();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#1976d2",
      color: "#fff",
    },
  }));

  if (error) {
    return (
      <Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Error />
          <Typography variant="h5" sx={{ color: red[500] }}>
            There is an Error in data
          </Typography>
        </div>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (data) {
    return (
      <Stack
        direction={"row"}
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item, index) => (
          <Card
            className="cardo"
            sx={{ maxWidth: 277, mb: 6, mx: 2 }}
            key={index}
          >
            <CardMedia
              component="img"
              height="194"
              image={item.imageLink[1]}
              alt="Product image"
              onClick={() => {
                navigate(`/ProductDetails/${item.id}`);
              }}
            />
            <CardContent
              onClick={() => {
                navigate(`/ProductDetails/${item.id}`);
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{ justifyContent: "space-between" }}
              disableSpacing
            >
              {selectedProductsID.includes(item.id) ? (
                <div
                  dir="rtl"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <IconButton
                    color="primary"
                    sx={{ ml: "10px" }}
                    onClick={() => {
                      dispatch(increaseQuantity(item));
                    }}
                  >
                    <Add />
                  </IconButton>
                  <StyledBadge
                    badgeContent={productQuantity(item.id)}
                    color="secondary"
                  />

                  <IconButton
                    color="primary"
                    sx={{ mr: "10px" }}
                    onClick={() => {
                      dispatch(decreaseQuantity(item));
                    }}
                  >
                    <Remove />
                  </IconButton>
                </div>
              ) : (
                <Button
                  sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(addProduct(item));
                  }}
                >
                  <ShoppingCart sx={{ fontSize: "18px", mr: 1 }} /> Add to cart
                </Button>
              )}
              <Typography
                mr={1}
                variant="body1"
                color={theme.palette.error.light}
              >
                {item.price}$
              </Typography>
            </CardActions>
          </Card>
        ))}
      </Stack>
    );
  }

  return null;
};

export default Home;
