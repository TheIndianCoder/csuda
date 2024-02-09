import React from "react";
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
import { PageTitle, Footer,Navbar } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import HomePageCarousel from "@/widgets/layout/homePageCarousel";
import Card1 from "@/widgets/layout/card";

export function Home() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-5 ">
        <div className="absolute top-0 h-auto w-full bg-cover bg-center">
          <HomePageCarousel />
        </div>
      </div>
      <section className="-mt-80 bg-gray-300 px-4  pt-0">
        <div className="container mx-auto">
          <Card1 />
        </div>
      </section>
      <div className="bg-blue-gray-50/50 -mt-70">
        <Footer />
      </div>
    </>
  );
}

export default Home;
