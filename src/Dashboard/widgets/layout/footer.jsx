import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController } from "@/Dashboard/context";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
//${openSidenav == true ? `xl:ml-80` : ``}
  return (
    <footer className="">
      <div className={` flex w-full h-10 flex-wrap items-center justify-center lg:fixed lg:bottom-0 lg:inset-x-0 bg-green-500 text-white gap-6 px-2 md:justify-between`}>
        {/* <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, Developed with{" "}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5" /> by{" "}
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500"
          >
            {brandName}
          </a>{" "}
          . Proposed by Sri Publication.
        </Typography> */}
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                // href={path}
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-black cursor-pointer"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Pixel Solutions",
  brandLink: "",
  routes: [
    { name: "Rajnandgaon Municipal", path: "#" },
    // { name: "About Us", path: "" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
