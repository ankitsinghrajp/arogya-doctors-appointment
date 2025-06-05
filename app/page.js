import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { creditBenefits, features, testimonials } from "@/lib/data";
import { ArrowRight, Check, CheckCircleIcon, Quote, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HOME() {
  return (
    <div>
      <section className="relative overflow-hidden py-32 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5 ">
              <Badge
                variant={"outline"}
                className={
                  "bg-blue-900/30 shadow-md shadow-black/20 border-blue-700/30 px-4 py-2 text-blue-300 text-sm font-medium "
                }
              >
                {" "}
                Care That Lifts You Up{" "}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                <span className="text-shadow-md text-shadow-gray-900">
                  Instant Care Access{" "}
                </span>
                <br />{" "}
                <span className="text-transparent bg-clip-text pr-2 bg-gradient-to-b from-blue-500  to-blue-600">
                  one tap away
                </span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Schedule appointments, video chat with doctors, and take control
                of your care — all in one place.
              </p>

              <div className="flex items-center gap-4">
                <Button
                  asChild
                  size={"lg"}
                  className={
                    "bg-blue-600 shadow-md shadow-black/20 text-white hover:bg-blue-700"
                  }
                >
                  <Link href={"/onboarding"}>
                    Get Started
                    <ArrowRight className="h-4 w-4 mr-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size={"lg"}
                  className={
                    "bg-white/90 shadow-md shadow-black/20 text-gray-900"
                  }
                >
                  <Link className="" href={"/doctors"}>
                    Find Doctors
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] rounded-xl overflow-hidden lg:h-[500px]">
              <Image
                src={"/banner.png"}
                alt="Doctor Consultation"
                fill
                priority
                className="object-cover md:pt-14 rounded-xl "
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-shadow-md text-shadow-gray-900 font-bold md:text-4xl lg:text-5xl text-white mb-4">
              How It Works?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform brings quality healthcare to your fingertips—quick,
              simple, and secure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {features.map((feature, index) => {
              return (
                <Card
                  key={index}
                  className={
                    "bg-[#292a2d] border-2 cursor-pointer border-blue-900/20 hover:border-blue-800/40 transition-all duration-300  shadow-md shadow-black/20"
                  }
                >
                  <CardHeader>
                    <div className="bg-blue-900/20 p-3 rounded-lg w-fit mb-3">
                      {feature.icon}
                    </div>
                    <CardTitle className={"text-xl font-semibold text-white"}>
                      {feature.title}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              className={
                "bg-blue-900/30 shadow-md shadow-black/20 border-blue-700/30 px-4 py-2 mb-4 text-blue-300 text-sm font-medium "
              }
              variant={"outline"}
            >
              Affordable. Reliable. Caring.
            </Badge>
            <h2 className="text-3xl text-shadow-md text-shadow-gray-900 font-bold md:text-4xl lg:text-5xl text-white mb-4">
              Consultation Packages
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find the right consultation bundle that matches your medical
              needs.
            </p>
          </div>

          <div>
            {/* Pricing table would go here */}
            <Card className={'mt-12 bg-muted/40 border-blue-900/30 shadow-md shadow-black/20'}>
              <CardHeader>
                <CardTitle className={'text-xl font-semibold text-white flex items-center'}>
                  <Stethoscope className="h-5 w-5 mr-2 text-blue-400"/>
                  How Our Credit System Works?
                  </CardTitle>
               
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {creditBenefits.map((benefit,index)=>{
                     return (
                      <li key={index} className="flex items-start">
                        <div className="flex items-center gap-3">
                          <CheckCircleIcon className="h-6 w-6 text-blue-400 bg-blue-900/50 p-1 rounded-full"/>
                          <p className="text-muted-foreground"
                            dangerouslySetInnerHTML={{__html: benefit}}
                          />
                        </div>
                      </li>
                     )


                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

            <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
            variant={'outline'}
            className={'bg-blue-900/30 border-blue-700/30 px-4 py-2 text-blue-400 text-sm font-medium mb-4'}
            >
                 Success Stories
            </Badge>
            <h2 className="text-3xl text-shadow-md text-shadow-gray-900 font-bold md:text-4xl lg:text-5xl text-white mb-4">
              What Our Users Say?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Feedback from patients and healthcare experts using our service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {testimonials.map((testimonial, index) => {
              return (
                <Card
                  key={index}
                  className={
                    "bg-[#292a2d] border-2 cursor-pointer border-blue-900/20 hover:border-blue-800/40 transition-all duration-300  shadow-md shadow-black/20"
                  }
                >
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center mr-4">
                      <span className="text-blue-400 font-bold">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

          <section className="py-20">
        <div className="container mx-auto px-4">
          <Card
          className={'bg-gradient-to-r from-blue-900/30 to-blue-950/20 border-blue-800/20 '}
          >
             <CardContent className={'pt-8 md:p-12 lg:p-16 relative overflow-hidden'}>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Take Charge Of Your Wellbeing Now?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Join thousands who’ve transformed their healthcare journey with ease. Start today and experience care the way it’s meant to be.
                    </p>
                   <div className="flex gap-4 flex-row">
                    <Button 
                    size={'lg'}
                    className={'bg-blue-600 text-white hover:bg-blue-700'}
                     asChild
                     >
                        <Link href={'/sign-up'}>
                              Sign Up Now
                        </Link>
                    </Button>
                    <Button 
                    size={'lg'}
                    className={'border-blue-700/30 hover:bg-muted'}
                    variant={'outline'}
                     asChild
                     >
                        <Link href={'/sign-up'}>
                              View Pricing
                        </Link>
                    </Button>
                   </div>
                  </div>
             </CardContent>
          </Card>
              
          
        </div>
      </section>
    </div>
  );
}
