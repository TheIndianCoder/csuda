import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";
import { Home, Profile, SignIn, SignUp, MaintenancePage } from "@/pages";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  return (
    <footer className=" px-4 pt-8 pb-6 bg-blue-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" className="mb-4" color="white">
              {title}
            </Typography>
            <Typography className="font-normal text-blue-gray-200">
              {description}
            </Typography>
            <div className="mx-auto mt-6 mb-8 flex justify-center gap-2 md:mb-0 lg:justify-start">
              {socials.map(({ color, name, path }) => (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton color="white" className="rounded-full">
                    <Typography color={color}>
                      <i className={`fa-brands fa-${name}`} />
                    </Typography>
                  </IconButton>
                </a>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-medium uppercase text-gray-100"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        variant="small"
                        className="mb-2 block font-normal text-blue-gray-100 hover:text-red-600 hover:bg-gray-900 hover:bg-opacity-10 rounded transition duration-300"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-200 "
            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "Rajnandgaon Municipal",
  description:
    "A property of Government of Chhattisgarh",
  socials: [
    {
      color: "blue",
      name: "facebook",
      path: "",
    },
    {
      color: "light-blue",
      name: "twitter",
      path: "",
    },
    {
      color: "purple",
      name: "instagram",
      path: "",
    },
  ],
  menus: [
    {
      name: "useful links",
      items: [
        { name: "About Us", path: "" },
        { name: "CM Office", path: "https://cmo.cg.gov.in/" },
        {
          name: "CITIZEN SERVICES",
          path: "http://citizenportal.cgpolice.gov.in:8080/citizen/login.htm?lang=en&stov=B91S-L19U-S7QP-DIQJ-VBSL-T5JP-XJNG-USHR",
        },
        {
          name: "@gov.in ईमेल सेवा",
          path: "https://eforms.nic.in/OnlineForms/",
        },
      ],
    },
    {
      name: "other resources",
      items: [
        {
          name: "Contact Us",
          path: "#",
        },
        {
          name: "Official Login",
          path: "/sign-in",
          element: <SignIn />,
        },
      ],
    },
  ],
  copyright: (
    <>
      <p className="text-white"> Copyright © {year} Rajnandgaon Municipal - Developed & Maintained by{" "}</p>
      <a
        href="https://www.uinfotechnology.com/"
        target="_blank"
        className="text-white hover:text-red-700"
      >
        Uinfo Technology Pvt. Ltd.
      </a>
      
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
