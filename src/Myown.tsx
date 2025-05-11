import { useForm } from "react-hook-form";
import {  z } from "zod";
import React  from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
//import React from 'react'
import {  useNavigate } from "react-router-dom";
import './myown.css'
const Myown = () => {
  const navigate=useNavigate();
const schema=z.object({
name:z.string().min(1,{message:"the name is required"}),
email:z.string().email({message:"the is required"}),
password:z.string().min(8,{message:"the password has atleast 8 characters"}),
phone: z.string()
    .regex(/^\+?[0-9]{10,15}$/, {message:"Invalid phone number"}),
  
address: z.string()
.min(1, { message: "Address is required" })
.regex(
    /^[\p{L}\d\s,'-]*$/u,  // Allows Unicode letters (e.g., é, ü)
    { message: "Only letters, numbers, spaces, and basic punctuation" }
)
})
type FormData=z.infer<typeof schema>
const{
    register,
    handleSubmit,
    formState:{errors},

}=useForm<FormData>({
resolver:zodResolver(schema)
})
const onsubmite=(data:FormData)=>{
console.log("the data is",{data});
}
  return (<section >
    <img src="src/images/cartdeliver.png" alt="tryagain" className="cart-images" />
     <div className="introduction"><em>wellcome to our delivery service</em></div>
     <div className="addvert">
     
     <div className="motivate"><p>🚚 Need your tech today?</p>
     <p className="solution"> We optimize upfront—with same-day delivery.</p>
     <p className="order"> 🚀lets start to order tech now</p>
     <button 
  className="menu" 
  onClick={() => navigate('/productitem')}
>
  select the menu
</button>
     </div>
     </div>
     
    <form onSubmit={handleSubmit(onsubmite)} className="form">
<input type="text" placeholder="enter your name"
 {...register("name")}
className="form-input"
/>
{errors.name&&<p>{errors.name.message}</p>}
<input type="text" placeholder="enter youremail"
{...register("email")}
className="form-input"
/>{errors.email&&<p>{errors.email.message}</p>}
<input type="password" placeholder="enter yourpassword"
 {...register("password")}
className="form-input"
/>{errors.password&&<p>{errors.password.message}</p>}
<input  placeholder="enter your address"
 {...register("address")}
className="form-input"
/>{errors.address&&<p>{errors.address.message}</p>}

<input type="tel" placeholder="enter your phone"
{...register("phone")}
className="form-input"
/>{errors.phone&&<p>{errors.phone.message}</p>}

<button type="submit" className="submit-btn-first">submite</button>

    </form>
    <footer>
  <div className="footer-container">
    <div className="footer-column brand">
      <h3>TechExpress</h3>
      <p>
        Same-day optimized tech delivery.<br />
        Because waiting is so 2020.
      </p>
  
    </div>

    <div className="footer-column services">
      <h4>Services</h4>
      <ul className="services">
        <li><a href="#">→ Device Setup</a></li>
        <li><a href="#">→ Same-Day Delivery</a></li>
        <li><a href="#">→ Data Transfer</a></li>
        <li><a href="#">→ Device Recycling</a></li>
      </ul>
    </div>

    <div className="footer-column support">
      <h4>Support</h4>
      <ul>
        <li><FaPhone /> (555) 123-4567</li>
        <li><FaEnvelope /> help@techexpress.com</li>
        <li><FaClock /> 24 hours daily</li>
        <li><a href="#">Track My Order →</a></li>
      </ul>
    </div>

    <div className="footer-column newsletter">
      <h4>Get Updates</h4>
      <p>Join for delivery perks & tech tips:</p>
      <div className="social-icons">
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaTwitter /></a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <div className="bottom-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Sitemap</a>
    </div>
  </div>
</footer>

  </section>
   
  )
}

export default Myown;
