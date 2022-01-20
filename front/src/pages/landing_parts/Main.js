import Maps from './Maps'
import IntroAndOrder from './IntroAndOrder';
import Menu from './MenuComponents/Menu';

const Main = (props) => {
  return (
    <div className="mainContainer">
      <h3>Main Container</h3>
      <IntroAndOrder />
      <Menu />
      <Maps />
    </div>
  );
}
export default Main;