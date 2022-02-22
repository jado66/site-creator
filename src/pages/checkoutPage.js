import { useState, useEffect } from 'react';
import Navbar from '../components/pageComponents/Navbar';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default function CheckoutPage(props) {
  
  const [promoCodeInput, setPromoCodeInput] = useState("")
  const [promoCodeKey, setPromoCodeKey] = useState("")
  const [appliedPromoCode, applyPromoCode] = useState(null)
  const [country, setCountry] = useState("US")
  const [region, setRegion] = useState("")

  const checkForPromoCode = () => {
    if (promoCodeInput in props.promoCodes){
      setPromoCodeKey(promoCodeInput)
      // 
      applyPromoCode(props.promoCodes[promoCodeInput])
    }
    else{
      alert("nope")
    }
  }

  let totalPrice = 0

  const cartItems = Object.keys(props.cart).map((itemName,index)=>{

    const price = parseFloat(props.cart[itemName].price.slice(1))*parseInt(props.cart[itemName].quantity)
    let priceError = false;

    if (price){
      totalPrice += price
    }
    else{
      priceError = true;
    }

    

    return (<li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0"> {props.cart[itemName].name}: <input type={"number"} value={props.cart[itemName].quantity} style={{border:"none",width: `${props.cart[itemName].quantity.toString().length+3}ch`}}
                                          onChange={(evt)=>{props.cartCallbacks.setCartItemQuantity(itemName,evt.target.value)}}/>{priceError&&<FontAwesomeIcon style={{color:"red"}} icon = {faExclamationCircle}/>}</h6>
              <small className="text-muted">{props.cart[itemName].description}</small>
            </div>
            <span className="text-muted">{`${price.toFixed(2)}$`}</span>
          </li>)})

  // TODO this needs to happen in the backend as to not let people create whatever prices they want
  let priceOff = 0;

  if (appliedPromoCode){
    if (appliedPromoCode.type === "Free"){
      priceOff = totalPrice
    }
    else if (appliedPromoCode.type === "$ Off"){
      priceOff = appliedPromoCode.value;

      if (priceOff > totalPrice){
        priceOff = totalPrice
      }
    }
    else {
      priceOff = totalPrice * (appliedPromoCode.value/100);
    }
  }
  

  const actualPrice = totalPrice - priceOff




  return (
      
      <div id = "outerSection" className="container ">
          

        <div id = "innerSection" className="col justify-items-baseline p-5 boxShadow h-100" style={{backgroundColor:props.webStyle.lightAccent}}>
        <Navbar cart ={props.cart} userIsAdmin = {props.userIsAdmin} pages = {props.pages} pageCallbacks = {props.pageCallbacks} socialMedias = {props.socialMedias} webStyle = {props.webStyle}/>
          <div className="py-5">
            {/* <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"> */}
            <h2>Checkout form</h2>
            <p className="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
          </div>
          <div className="row p-3">
           
            <div className={"p-4 boxShadow "+(props.webStyle.isMobile? "col-12 my-3 order-2":"col-8 me-3 my-3")} style={{backgroundColor:props.webStyle.lightShade}}>
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" noValidate="">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder=""  required/>
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" required/>
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                {/* <div className="mb-3">
                  <label htmlFor="username">Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">@</span>
                    </div>
                    <input type="text" className="form-control" id="username" placeholder="Username" required/>
                    <div className="invalid-feedback" style={{width: "100%"}}>
                      Your username is required.
                    </div>
                  </div>
                </div> */}

                <div className="mb-3">
                  <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address">Street Address</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required=""/>
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                  <input type="text" className="form-control" id="address2" placeholder="Apartment or suite"/>
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country">Country</label>
                    <CountryDropdown
                      required
                      priorityOptions={[ "US","CA","GB","MX"]}
                      className="custom-select d-block w-100" id="country" 
                      value={country}
                      onChange={setCountry} />
                    
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state">Region</label>
                    <RegionDropdown
                      className="custom-select d-block w-100" id="state" required
                      defaultOptionLabel="Select Region"
                      country={country}
                      value={region}
                      onChange={setRegion} />
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" className="form-control" id="zip" placeholder="" required=""/>
                    <div className="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>
                <hr className="mb-4"/>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="same-address"/>
                  <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="save-info"/>
                  <label className="custom-control-label" htmlFor="save-info">Save this information htmlFor next time</label>
                </div>
                <hr className="mb-4"/>

                <h4 className="mb-3">Payment</h4>

                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked="" required=""/>
                    <label className="custom-control-label" htmlFor="credit">Credit card</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                    <label className="custom-control-label" htmlFor="debit">Debit card</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                    <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-name">Name on card</label>
                    <input type="text" className="form-control" id="cc-name" placeholder="" required=""/>
                    <small className="text-muted">Full name as displayed on card</small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-number">Credit card number</label>
                    <input type="text" className="form-control" id="cc-number" placeholder="" required=""/>
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">Expiration</label>
                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required=""/>
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">CVV</label>
                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required=""/>
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr className="mb-4"/>
                <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
              </form>
            </div>

            <div className={" my-3 p-4 boxShadow "+(props.webStyle.isMobile? "col-12 order-1":"col ms-3 h-100")} style={{backgroundColor:props.webStyle.lightShade}}>
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                {/* <span className="badge badge-secondary badge-pill">3</span> */}
              </h4>
              <ul className="list-group mb-3">
                {
                  
                  cartItems         
              
                }

                
                {promoCodeKey &&<li className="list-group-item d-flex justify-content-between bg-light">
                   <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>{promoCodeKey}</small>
                  </div>
                  <span className="text-success">-${priceOff.toFixed(2)}</span>
                </li>}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${actualPrice.toFixed(2)}</strong>
                </li>
              </ul>

              <form className="form-group">
                <div className="input-group">
                  <input type="text" className="form-control" value={promoCodeInput} onChange={(evt)=>{setPromoCodeInput(evt.target.value)}} placeholder="Promo code"/>
                  <div className="input-group-append">
                    <button type='button' onClick={checkForPromoCode} className="btn btn-secondary">Redeem</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1 pb-4">© 2022-2025 Life By LaRae</p>
        {/* <ul className="list-inline">
          <li className="list-inline-item"><a href="#">Privacy</a></li>
          <li className="list-inline-item"><a href="#">Terms</a></li>
          <li className="list-inline-item"><a href="#">Support</a></li>
        </ul> */}
      </footer>
      </div>
      
      

      
    // </div>
    )
   
  }