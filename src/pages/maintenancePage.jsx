import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    IconButton,
    Input,
    Textarea,
  
  } from "@material-tailwind/react";
  import { UsersIcon } from "@heroicons/react/24/solid";
  import { PageTitle, Footer } from "@/widgets/layout";
  import { FeatureCard, TeamCard } from "@/widgets/cards";
  import { featuresData, teamData, contactData } from "@/data";
  import HomePageCarousel from "@/widgets/layout/homePageCarousel";

export function MaintenancePage() {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
        {/* <svg className="mx-auto mb-4 w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M331.8 224.1c28.29 0 54.88 10.99 74.86 30.97l19.59 19.59c40.01-17.74 71.25-53.3 81.62-96.65c5.725-23.92 5.34-47.08 .2148-68.4c-2.613-10.88-16.43-14.51-24.34-6.604l-68.9 68.9h-75.6V97.2l68.9-68.9c7.912-7.912 4.275-21.73-6.604-24.34c-21.32-5.125-44.48-5.51-68.4 .2148c-55.3 13.23-98.39 60.22-107.2 116.4C224.5 128.9 224.2 137 224.3 145l82.78 82.86C315.2 225.1 323.5 224.1 331.8 224.1zM384 278.6c-23.16-23.16-57.57-27.57-85.39-13.9L191.1 158L191.1 95.99l-127.1-95.99L0 63.1l96 127.1l62.04 .0077l106.7 106.6c-13.67 27.82-9.251 62.23 13.91 85.39l117 117.1c14.62 14.5 38.21 14.5 52.71-.0016l52.75-52.75c14.5-14.5 14.5-38.08-.0016-52.71L384 278.6zM227.9 307L168.7 247.9l-148.9 148.9c-26.37 26.37-26.37 69.08 0 95.45C32.96 505.4 50.21 512 67.5 512s34.54-6.592 47.72-19.78l119.1-119.1C225.5 352.3 222.6 329.4 227.9 307zM64 472c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24S88 434.7 88 448C88 461.3 77.25 472 64 472z"/></svg> */}
        <img className="inline" src="https://cdn.pixabay.com/photo/2017/06/20/08/12/maintenance-2422173__340.png"
          alt="tailwindcss maintenance"/>
        <h1 className="blink_text mb-4 text-4xl font-bold tracking-tight leading-none text-red-700 lg:mb-6 md:text-4xl xl:text-5xl dark:text-white">This Site is under construction!!</h1>
        {/* <p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">Our Enterprise administrators are performing scheduled maintenance.</p> */}
    </div>

    <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              {/* <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                <UsersIcon className="h-6 w-6 text-blue-gray-900" />
              </div> */}
              {/* <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Latest News
              </Typography> */}
              {/* <Typography className="mb-8 font-normal text-blue-gray-500">
                Read about what's happening in Chhattisgarh Municipal
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography> */}
              {/* <Button variant="outlined">read more</Button> */}
            </div>
            {/* <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg shadow-gray-500/10">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.jpeg"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold"
                  >
                    Top Notch Stories
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Typography>
                </CardBody>
              </Card>
            </div> */}
          </div>
          <div className="bg-blue-gray-50/50">
        <Footer />
      </div>

</section>

  )
}

export default MaintenancePage