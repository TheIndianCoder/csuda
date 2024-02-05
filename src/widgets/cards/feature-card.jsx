import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
// import * from "../../../public/logos/Property_Tax/"
import { Link } from "react-router-dom";

export function FeatureCard({ color, icon, title, description, listIcons, listNames, listRoutes }) {
  let i = -1;
  return (
    <Card className="rounded-2xl shadow-lg shadow-gray-500/10">
      <CardBody className="px-8">
        <Typography variant="h5" className="mb-2" color="blue-gray">
          {title}
        </Typography>
        <Typography className="font-normal text-blue-gray-600">
          {description}
        </Typography>
        <ul>
          {
            listIcons.map((item, index) => {
              i++;
              return (
                <div key={index} className="content-center hover:text-blue-600  hover:rounded-md	hover:border-blue-400" >
                  <li className="list-none content-center	">
                    {/* <div className=""> */}
                      <IconButton variant="gradient"
                        size="sm"
                        color={color}
                        className="pointer-events-none mb-6 rounded-full content-center	"
                      >
                        <img src={item} />
                      </IconButton>
                    {/* </div> */}
                    <Link to={listRoutes[i]} className="text-sm pl-1 align-sub ">{listNames[i]}</Link>
                  </li>
                </div>

              )
            })
          }
        </ul>

      </CardBody>
    </Card>
  );
}

FeatureCard.defaultProps = {
  color: "blue",
};

FeatureCard.propTypes = {
  color: PropTypes.oneOf([
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
};

FeatureCard.displayName = "/src/widgets/layout/feature-card.jsx";

export default FeatureCard;
