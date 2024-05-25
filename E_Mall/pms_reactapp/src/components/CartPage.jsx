import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import {getCartTotal,removeItem,addToRequestData,addToCart,setCartId,emptyTheCart,} from "./redux/CartSlice";
import {getBookingCartByUserId,createBookingCart,updateBookingCart,createRequest,createSpaceBookingWithCart} from "./API";
import { useNavigate } from "react-router";

const CartPage = () => {
  const { cart,totalPrice,requestData, cartId ,userId} = useSelector((state) => state.allCart);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCart, setUserCart] = useState(null);
  const createRequestCalled = useRef(false);
  const [createBookingCartCalled, setCreateBookingCartCalled] = useState(false);


  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  useEffect(() => {
    fetchUserCart();
    console.log(cart);
  }, []);


  const fetchUserCart = async () => {
    try {
      const userCartData = await getBookingCartByUserId(localStorage.getItem("userId"));
      console.log(userCartData);

      if (userCartData && userCartData.bookingCartId) {
        setUserCart(userCartData);
        dispatch(setCartId(userCartData.bookingCartId));

        const existingRequests = userCartData.requests || [];
        existingRequests.forEach((request) => {
          const cartItem = {
            spaceId: request.spaceId,
            location: request.location,
            categoryId: request.categoryId,
            rentType: {
              rentTypeId: request.rentTypeId,
              rentTypeName: request.rentTypeName,
              cost: request.cost,
            },
            termId: request.termId,
            startDate: request.startDate, // Assuming these properties are available
            endDate: request.endDate,
            // Add other properties as needed
          };

          dispatch(addToCart(cartItem));
        });
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  const finalise = async () => {
    try {
      await fetchUserCart();

      if (createRequestCalled.current) {
        console.log("Create request already called. Skipping...");
      } else {
        const requestDataList = [];

        cart.forEach((cartItem) => {
          const requestData1 = {
            spaceId: cartItem.spaceId,
            requestDate: new Date(),
            startDate: cartItem.startDate,
            endDate: cartItem.endDate,
            referralId: localStorage.getItem("refId"),
            categoryId: cartItem.categoryId,
            termId: cartItem.termId,
            userId: userId,
            rentTypeId: cartItem.rentType.rentTypeId,
          };

          requestDataList.push(requestData1);
        });

        if (requestDataList.length > 0) {
          await createRequests(requestDataList);
        }

        const requestIds = requestData.map((item) => item.requestId);

        if (userCart && !(userCart.msg) && requestIds.length > 0) {
          await updateBookingCart(
            userCart.bookingCartId,
            requestIds,
            totalPrice,
            userId
          );
          console.log("Updated user cart", requestIds, "reqids");
        } else {
          if (!createBookingCartCalled) {
            console.log("inside create request", requestIds);
            const response = await createBookingCart(
              requestIds,
              totalPrice,
              userId
            );
            console.log("New user cart created:", response);
            dispatch(addToCart(response));
            setCreateBookingCartCalled(true);
          }
        }

        createRequestCalled.current = true;
        await createSpaceBookingWithCart(cartId,userId);
        dispatch(setCartId(0));
        dispatch(getCartTotal());
        dispatch(emptyTheCart());
      }
    } catch (error) {
      console.error("Error finalizing cart:", error);
    }
  };




  const createRequests = async (requestDataList) => {
    try {
      for (const item of requestDataList) {
        const response = await createRequest(JSON.stringify(item));
        console.log("Created request:", response.requestData);
        dispatch(addToRequestData(response));
      }
    } catch (error) {
      console.error("Error creating requests:", error);
    }
  };


  return (
    <div>
      <Container>
      <Table striped bordered hover>
        <thead className="bg-primary-subtle">
          <tr style={{fontWeight:"bold"}}>
            <th>Space ID</th>
            <th>Location</th>
            <th>Category ID</th>
            <th>Rent Type ID</th>
            <th>Rent Type Name</th>
            <th>Cost</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>User ID</th>
            {/* <th>Date</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((data) => (
            <tr key={data.spaceId}>
              <td>{data?.spaceId}</td>
              <td>{data?.location}</td>
              <td>{data?.categoryId}</td>
              <td>{data?.rentType?.rentTypeId}</td>
              <td>{data?.rentType?.rentTypeName}</td>
              <td>{data?.rentType?.cost}</td>
              <td>{data?.startDate}</td>
              <td>{data?.endDate}</td>
              <td>{userId}</td>
              <td>
                <button
                  className="btn-danger"
                  onClick={() => dispatch(removeItem(data.spaceId))}
                >
                  remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-center">
        <p className="lead">Total Cost: ${totalPrice}</p>
      </div>

      <div className="d-flex justify-content-end">
        <Button variant="info" className="btn-lg me-2" onClick={()=>navigate("/customer-dashboard")}>
          Continue Shopping
        </Button>
        <Button variant="primary" onClick={finalise} className="btn-lg">
          Checkout
        </Button>
      </div>
    </Container>
    </div>
    
  );
};

export default CartPage;
