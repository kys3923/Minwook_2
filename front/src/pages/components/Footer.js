const Footer = (props) => {
  return (
    <div className="Footer_Container">
      <div className="Footer_Hours">
        <h4>Opening Hours</h4>
        <ul className="footer_days">
          <li>Monday</li>
          <li>Tuesday</li>
          <li>Wednesday</li>
          <li>Thursday</li>
          <li>Friday</li>
          <li>Saturday</li>
          <li>Sunday</li>
        </ul>
        <ul className="footer_hours_detail">
          <li>12-9pm</li>
          <li>Closed</li>
          <li>12-9pm</li>
          <li>12-9pm</li>
          <li>12-9:30pm</li>
          <li>12-9:30pm</li>
          <li>12-9pm</li>
        </ul>
      </div>
      <div className="Footer_Contact">
          <h4>Contact Info</h4>
        <ul>
          <li>67 Orange Turnpike, Sloatsburg, NY 10974</li>
          <li>(845) 712-5006</li>
        </ul>
      </div>
      <div className="Footer_Social">
          <h4>Connect</h4>
        <ul>
          <li>facebook</li>
          <li>instagram</li>
          <li>twitter</li>
        </ul>
      </div>
      <div className="copyrights">
        <p>© 2022 Sushivill. All Rights Reserved. developed & designed by YK Technology Corporation</p>
      </div>
    </div>
  );
}
export default Footer;