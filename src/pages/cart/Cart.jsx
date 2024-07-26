import {
  Box,
  Button,
  Paper,
  styled,
  IconButton,
  Badge,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import "./Cart.css";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "../../Redux/cartSlic";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const { selectedProducts } = useSelector((state) => state.cart);
  let subtotal = 0;
  return (
    <Box>
      {selectedProducts.map((item) => {
        subtotal += Number(item.price) * Number(item.Quantity);
        return (
          <Paper key={item.id} dir="rtl" className="item-container">
            <div className="img-title-parent">
              <img src={item.imageLink[1]} alt={item.productName} />
              <p className="product-name">{item.productName}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ color: "#1976d2", ml: "10px" }}
                onClick={() => {
                  dispatch(increaseQuantity(item));
                }}
              >
                <Add />
              </IconButton>

              <StyledBadge badgeContent={item.Quantity} color="secondary" />

              <IconButton
                sx={{ color: "#1976d2", mr: "10px" }}
                onClick={() => {
                  dispatch(decreaseQuantity(item));
                }}
              >
                <Remove />
              </IconButton>
            </div>

            <div className="price">
              {Number(item.price) * Number(item.Quantity)}$
            </div>

            <Button
              sx={{ display: { xs: "none", md: "block" } }}
              variant="text"
              color="error"
              onClick={() => dispatch(deleteProduct(item))}
            >
              delete
            </Button>
            <IconButton
              onClick={() => {
                dispatch(deleteProduct(item));
              }}
            >
              <Delete
                sx={{ display: { xs: "block", md: "none" } }}
                color="error"
              />
            </IconButton>
          </Paper>
        );
      })}
      <Paper
        sx={{
          width: "200px",
          display: "flex",
          flexDirection: "column",
          mx: "auto",
          mt: "60px",
        }}
      >
        <Typography alignSelf={"center"} variant="h6" p={2}>
          Cart summary{" "}
        </Typography>
        <Divider />
        <Stack
          padding={"5px"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1">subtotal</Typography>
          <Typography variant="body1">{subtotal}$</Typography>
        </Stack>
        <Divider />
        <Button fullWidth color="primary" padding="10px" variant="contained">
          Checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
