import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    house: "",
    postalCode: "",
    zip: "",
    message: "",
    saveAddress: false,
    keepUpdated: false,
    shippingMethod: "express",
    promoCode: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const isCartEmpty = cartItems.length === 0;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      form.firstName &&
      form.lastName &&
      form.phone &&
      form.email &&
      form.address &&
      form.house &&
      form.postalCode &&
      form.zip
    ) {
      toast.error('this Feature Not Added Yet');
    }
  };

  if (isCartEmpty) {
    return (
      <div className="container text-center py-5 bg-dark text-light">
        <div className="mb-4">
          <svg width="184" height="152" viewBox="0 0 184 152">
          </svg>
        </div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven’t added any items to your cart yet.</p>
        <Link to="/" className="btn btn-lg text-light mb-3" style={{ backgroundColor: '#6666AF', transition: 'background-color 0.3s' }}>
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-md-5 text-light">
      <div className="row">

        <div className="col-lg-8 mb-4">
          <div className="card p-4 bg-dark border-0" style={{ transition: 'background-color 0.3s' }}>
            <h5 className="mb-3">Billing Details</h5>
            <form noValidate onSubmit={handleSubmit} className="text-light">
              <div className="row mb-3">
                {/** render inputs **/}
                <div className="col-md-6 mb-3">
                  <label className="form-label">First name</label>
                  <input
                    name="firstName"
                    className={`form-control bg-dark text-light border-light ${submitted && !form.firstName ? "is-invalid" : ""}`}
                    value={form.firstName}
                    onChange={handleChange}
                    style={{ transition: 'border-color 0.3s' }}
                  />
                  <div className="invalid-feedback">First name is required</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last name</label>
                  <input
                    name="lastName"
                    className={`form-control bg-dark text-light border-light ${submitted && !form.lastName ? "is-invalid" : ""}`}
                    value={form.lastName}
                    onChange={handleChange}
                    style={{ transition: 'border-color 0.3s' }}
                  />
                  <div className="invalid-feedback">Last name is required</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    name="phone"
                    className={`form-control bg-dark text-light border-light ${submitted && !form.phone ? "is-invalid" : ""}`}
                    value={form.phone}
                    onChange={handleChange}
                    style={{ transition: 'border-color 0.3s' }}
                  />
                  <div className="invalid-feedback">Phone is required</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className={`form-control bg-dark text-light border-light ${submitted && !form.email ? "is-invalid" : ""}`}
                    value={form.email}
                    onChange={handleChange}
                    style={{ transition: 'border-color 0.3s' }}
                  />
                  <div className="invalid-feedback">Email is required</div>
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  name="keepUpdated"
                  className="form-check-input"
                  id="keepUpdated"
                  checked={form.keepUpdated}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="keepUpdated">
                  Keep me up to date on news
                </label>
              </div>

              <hr className="border-light" />

              <h5 className="mb-3">Shipping Info</h5>
              <div className="row mb-3">
                {[
                  { value: "express", label: "Express delivery", note: "3–4 days via Fedex" },
                  { value: "post", label: "Post office", note: "20–30 days via post" },
                  { value: "pickup", label: "Self pick-up", note: "Come to our shop" },
                ].map((opt) => (
                  <div className="col-md-4 mb-3" key={opt.value}>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="shippingMethod"
                        id={opt.value}
                        value={opt.value}
                        className="form-check-input"
                        checked={form.shippingMethod === opt.value}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={opt.value}>
                        <strong>{opt.label}</strong>
                        <br />
                        <small className="text-muted" style={{ color: '#ccc' }}>{opt.note}</small>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row mb-3">
                <div className="col-sm-8 mb-3">
                  <label className="form-label">Address</label>
                  <input
                    name="address"
                    className={`form-control bg-dark text-light border-light ${submitted && !form.address ? "is-invalid" : ""}`}
                    value={form.address}
                    onChange={handleChange}
                    style={{ transition: 'border-color 0.3s' }}
                  />
                  <div className="invalid-feedback">Address is required</div>
                </div>
                <div className="col-sm-4 mb-3">
                  <label className="form-label">City</label>
                  <select
                    name="city"
                    className="form-select bg-dark text-light border-light"
                    value={form.city}
                    onChange={handleChange}
                    style={{ transition: 'border-color 0.3s' }}
                  >
                    <option value="" disabled>Select city</option>
                    <option>New York</option>
                    <option>Moscow</option>
                    <option>Samarqand</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 mb-3">
                  <label className="form-label">House</label>
                  <input
                    name="house"
                    className={`form-control bg-dark text-light border-light ${submitted && !form.house ? "is-invalid" : ""}`}
                    value={form.house}
                    onChange={handleChange}
                    style={{ transition: 'border-color 0.3s' }}
                  />
                  <div className="invalid-feedback">House is required</div>
                </div>
                <div className="col-sm-4 mb-3">
                  <label className="form-label">Postal code</label>
                  <input
                    name="postalCode"
                    className={`form-control bg-dark text-light border-light ${submitted && !form.postalCode ? "is-invalid" : ""}`}
                    value={form.postalCode}
                    onChange={handleChange}
                    style={{ transition: 'border-color 0.3s' }}
                  />
                  <div className="invalid-feedback">Postal code is required</div>
                </div>
                <div className="col-sm-4 mb-3">
                  <label className="form-label">Zip</label>
                  <input
                    name="zip"
                    className={`form-control bg-dark text-light border-light ${submitted && !form.zip ? "is-invalid" : ""}`}
                    value={form.zip}
                    onChange={handleChange}
                    style={{ transition: 'border-color 0.3s' }}
                  />
                  <div className="invalid-feedback">Zip is required</div>
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  name="saveAddress"
                  className="form-check-input"
                  id="saveAddress"
                  checked={form.saveAddress}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="saveAddress">
                  Save this address
                </label>
              </div>

              <div className="mb-4">
                <label className="form-label">Message to seller</label>
                <textarea
                  className="form-control bg-dark text-light border-light"
                  rows="3"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  style={{ transition: 'border-color 0.3s' }}
                ></textarea>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn text-light me-2"
                  style={{ backgroundColor: '#6666AF', transition: 'background-color 0.3s' }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-light"
                  style={{ backgroundColor: '#6666AF', transition: 'background-color 0.3s' }}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card p-3 bg-dark border-0" style={{ transition: 'background-color 0.3s' }}>
            <h5 className="text-light mb-3">Your Order</h5>
            <dl className="row text-light">
              <dt className="col-8">Total price:</dt>
              <dd className="col-4 text-end">${totalPrice.toFixed(2)}</dd>
              <dt className="col-8 text-danger">Discount:</dt>
              <dd className="col-4 text-end text-danger">- $200.00</dd>
              <dt className="col-8">Shipping cost:</dt>
              <dd className="col-4 text-end">+ $50.00</dd>
              <dt className="col-12"><hr className="border-light" /></dt>
              <dt className="col-8">Total:</dt>
              <dd className="col-4 text-end"><strong>${(totalPrice - 200 + 50).toFixed(2)}</strong></dd>
            </dl>

            <div className="input-group my-4">
              <input
                type="text"
                className="form-control bg-dark text-light border-light"
                placeholder="Promo code"
                name="promoCode"
                value={form.promoCode}
                onChange={handleChange}
                style={{ transition: 'border-color 0.3s' }}
              />
              <button className="btn text-light" style={{ backgroundColor: '#6666AF', transition: 'background-color 0.3s' }} type="button">
                Apply
              </button>
            </div>

            <h6 className="text-light mb-3">Items in cart</h6>
            {cartItems.map((item) => (
              <div className="d-flex align-items-center mb-3" key={item.id}>
                <span className="badge bg-secondary me-2">{item.quantity}</span>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="rounded border me-2"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <Link to={`/products/${item.id}`} className="flex-grow-1 text-decoration-none text-light">
                  {item.title}
                </Link>
                <div className="text-end text-light">${item.price}</div>
              </div>
            ))}
            {/* Closing cards */}
          </div>
        </div>
      </div>
    </div>
  );
}
