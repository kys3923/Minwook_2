const Footer = (props) => {
  return (
    <div className="Footer_Container">
      <h1>footer</h1>
      <div className="Footer_Hours">
        <ul>
          <h4>Hours</h4>
          <li>Monday 12-9pm</li>
          <li>Tuesday Closed</li>
          <li>Wednesday 12-9pm</li>
          <li>Thursday 12-9pm</li>
          <li>Friday 12-9:30pm</li>
          <li>Saturday 12-9:30pm</li>
          <li>Sunday 12-9pm</li>
        </ul>
      </div>
      <div className="Footer_Contact">
        <ul>
          <h4>Contact</h4>
          <li>Address 67 Orange Turnpike, Sloatsburg, NY 10974</li>
          <li>(845) 712-5006</li>
        </ul>
      </div>
      <div className="Footer_Social">
        <ul>
          <h4>Social Media</h4>
          <li>list1</li>
        </ul>
      </div>
    </div>
  );
}
export default Footer;