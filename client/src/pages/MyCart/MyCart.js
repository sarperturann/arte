import React, { useEffect, useState } from "react";
import "./MyCart.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const gcloud = "https://arte-386819.uc.r.appspot.com";

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [images, setImages] = useState([]); // State for images
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(gcloud + '/api/v1/carts/2');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchArtworks = async () => {
      if (cart && cart.artworks && cart.artworks.length > 0) {
        try {
          const artworkRequests = cart.artworks.map(async (artworkId) => {
            const response = await axios.get(gcloud + `/api/v1/artwork/get/${artworkId}`);
            return response.data;
          });

          const artworksData = await Promise.all(artworkRequests);
          setArtworks(artworksData);
        } catch (error) {
          console.error('Error fetching artworks:', error);
        }
      }
    };

    fetchArtworks();
  }, [cart]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(gcloud + '/api/v1/images/get_all');
        setImages(response.data.slice(0, artworks.length)); // Use only the necessary number of images
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [artworks]);

  useEffect(() => {
    if (artworks.length > 0) {
      const totalPrice = artworks.reduce((sum, artwork) => sum + artwork.price, 0);
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [artworks]);

  const removeArtwork = async (artworkId) => {
    try {
      await axios.put(gcloud + `/api/v1/carts/2/remove_artwork?artworkId=${artworkId}`);
      const updatedArtworks = artworks.filter((artwork) => artwork.id !== artworkId);
      setArtworks(updatedArtworks);
      toast.success("Artwork removed from the cart");
    } catch (error) {
      console.error('Error removing artwork:', error);
      toast.error("Failed to remove artwork from the cart");
    }
  };

  return (
    <div className="mycart">
      <nav>
        <h1>Your Shopping Cart</h1>
        <div>
          <strong>Total: $ {totalPrice}</strong>
          {cart && cart.artworks && cart.artworks.length > 0 ? (
            <button
              onClick={() => navigate("/placeorder")}
              disabled={cart.artworks.length === 0}
              style={{ backgroundColor: "var(--lightGreen2)" }}
            >
              Place Order
            </button>
          ) : (
            <button
              style={{ backgroundColor: "blue" }}
              onClick={() => {}}
            >
              Update Cart
            </button>
          )}
        </div>
      </nav>
      <section>
        {artworks.length > 0 ? (
          artworks.map((artwork, index) => (
            <div key={artwork.id} className="cartItem">
              <span
                className="removeButton"
                onClick={() => removeArtwork(artwork.id)}
              >
                <MdDeleteOutline />
              </span>
              <img src={images[index]} alt={artwork.title} /> {/* Use the corresponding image based on the index */}
              <div className="cartItemMiddleArea">
                <div className="cartItemAbout">
                  <h4>{artwork.title}</h4>
                  <p>Artwork ID: {artwork.id}</p>
                </div>
              </div>
              <h2>
                Total: $ {artwork.price} <br />
              </h2>
            </div>
          ))
        ) : (
          <div className="notLoggedin">
            <AiOutlineShoppingCart />
            <p>Your e-way cart is empty.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ShoppingCart;
