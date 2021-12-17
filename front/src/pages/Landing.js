import Maps from './landing_parts/Maps';
import IntroAndOrder from './landing_parts/IntroAndOrder';
import Menu from './landing_parts/Menu';

const Landing = (props) => {
  return (
    <div className="landingContainer">
      <h3>landing section</h3>
      <IntroAndOrder />
      <Menu />
      <Maps />
    </div>
  );
}
export default Landing;