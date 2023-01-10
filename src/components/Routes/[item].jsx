import { Link } from "react-router-dom";
// import { ArrowBackIcon } from "../Icons";
import { ArrowBackIcon } from "../../Icons/Sidebar/Icons"
import GestureDetection from "../../pages/GestureDetection";

const Item = (props) => {
  const { page } = props;
  if (page === "homepage") {
    // return <div id="page">{page}</div>;
    return <GestureDetection/>
  } else {
    return (
      <div id="page">
        <Link to="/">
          <button className="btn">
            <ArrowBackIcon /> Back to Home
          </button>
        </Link>
        {page}
      </div>
    );
  }
};

export default Item;