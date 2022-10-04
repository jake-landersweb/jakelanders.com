import Image from "../components/image"

import { AiOutlineInstagram } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'
import { AiFillGithub } from 'react-icons/ai'
import { TbBrandTwitter } from 'react-icons/tb'
import Label from "../components/label"
import ExperienceCell from "../components/experienceCell"
import SkillsCell from "../components/skillsCell"
import ProjectCell from "../components/projectCell"
import Form from "../components/form/form"
import Head from "next/head"

const Home = () => {
  return <>
    <Head>
      <title>Jake Landers</title>
      <meta name="keywords" content="jake,landers,developer,northwest,pnw,portland,software,coding,blog,swiftui,flutter,python,dart,swift,go,api,nextjs" id="keywords" />
    </Head>
    <div className="space-y-16 md:space-y-32">
      <div className="space-y-16 items-center">
        <div className="grid place-items-center">
          <h2 className="text-4xl md:text-6xl lg:text-8xl">Jake Landers</h2>
        </div>
        <div className="grid place-items-center space-y-8">
          <p data-aos="fade-up" data-aos-offset="200" data-aos-delay="0" className="text-txt-500 text-lg font-medium text-center max-w-[750px]">Hello! My name is Jake Landers and I am a Fullstack Software Developer based out of Portland, OR. If I am not developing at some of the finest tech companies in the Pacific Northwest, I am working on remote projects for clients worldwide or on my personal passion projects.</p>
          <p data-aos="fade-up" data-aos-offset="200" data-aos-delay="100" className="text-txt-500 text-lg font-medium text-center max-w-[750px]">I have a wide variety of skills. From mobile apps using frameworks like Flutter and SwiftUI, web development using NextJS, database development using AWS DynamoDB, MongoDB, and MySQL, cloud infrastructure using Docker and a specialty in Kubernetes, to computational genomics and much more.</p>
        </div>
        <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="200" className="grid place-items-center space-y-8">
          <Image props={{
            src: "/images/jake.jpg",
            alt: "jake hockey",
            divClass: "w-[170px] h-[170px]",
            imgClass: "rounded-full aspect-square"
          }} />
          <div className="flex space-x-8">
            <a href="https://www.instagram.com/landers_99/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <AiOutlineInstagram size={40} />
            </a>
            <a href="https://www.linkedin.com/in/jake-landers-b96721227/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <FaLinkedinIn size={40} />
            </a>
            <a href="https://github.com/jake-landersweb" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <AiFillGithub size={40} />
            </a>
            <a href="https://mobile.twitter.com/xchecksports" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <TbBrandTwitter size={40} />
            </a>
          </div>
        </div>
      </div>
      <div className="grid place-items-center space-y-16">
        <Label text={"Experience"} />
        <div className="space-y-8">
          <div data-aos="fade-up" data-aos-offset="200">
            <ExperienceCell props={{
              title: "New Relic",
              dateRange: "May 2022 - August 2022",
              imageSrc: "/images/newrelic.png",
              imageAlt: "newrelic",
              description: "I worked at New Relic as a software engineering intern on the database team. As a member, I worked on the migration of database orchestration to Amazon Elastic Kubernetes Service (EKS). I explored how New Relic could leverage the CrunchyData PostgreSQL operator and created an inventory templating system for kuberntes deployments using CUE and Go."
            }} />
          </div>
          <div data-aos="fade-up" data-aos-offset="200">
            <ExperienceCell props={{
              title: "Sapphire",
              dateRange: "January 2022 - Present",
              imageSrc: "/svg/sapphire.svg",
              imageAlt: "Sapphire logo",
              description: "A family business I started with my father during the development of Crosscheck Sports. We build some of the best software in the pacific northwest pulling in expertise from our careers in the industry working for some of the top tech companies in the world."
            }} />
          </div>
          <div data-aos="fade-up" data-aos-offset="200">
            <ExperienceCell props={{
              title: "Research Instructor",
              dateRange: "June 2020 - Present",
              imageSrc: "/images/wsu.png",
              imageAlt: "wsu logo",
              description: "Every semester I recruit a group of students and teach a weekly class teaching the basics of computational research. From undergrads, grad students, and professors, we go over industry standard tools like VCFTools, BCFTools, Plink, SamTools, BamTools, Python, R, and working with linux servers over ssh."
            }} />
          </div>
        </div>
      </div>
      <div className="grid place-items-center space-y-16">
        <Label text={"Projects"} />
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="0">
            <ProjectCell props={{
              title: "Crosscheck Sports",
              imageSrc: "/images/xcheck.png",
              imageAlt: "crosscheck logo",
              description: "A full production sports team management app driven by Flutter and DynamoDB. Create teams, seasons, events, polls, and rosters, all tied together with a powerful custom field engine. Other features include chat, stat tracking, event checkin and commenting, auto notifications and much more.",
              link: "https://www.crosschecksports.com"
            }} />
          </div>
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="25">
            <ProjectCell props={{
              title: "Enterprise Emailer",
              imageSrc: "/images/dart.png",
              imageAlt: "dart logo",
              description: "This is a full featured stack email service queue I built to deal with the wait times in sending 20+ emails at once. Built in dart, email records get added to a MySQL database on request and every minute a separate function scans the table for any new records and sends them, massively cutting down on latency when sending emails.",
              link: "https://github.com/jake-landersweb/dart_mailer"
            }} />
          </div>
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="50">
            <ProjectCell props={{
              title: "Calorie Me",
              imageSrc: "/images/calorieme.png",
              imageAlt: "calorie me logo",
              description: "A hyper ellegant calorie tracking app, this was an experiment on what I could accomplish spending a weekend building a mobile app. Built with SwiftUI, this was a case study into how document style databases work, and utilizes a custom built database on the backend to store data with persistence.",
              link: "https://apps.apple.com/us/app/calorie-me/id1608922326",
              imageClass: "rounded-full"
            }} />
          </div>
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="75">
            <ProjectCell props={{
              title: "jakelanders.com",
              imageSrc: "/svg/logo.svg",
              imageAlt: "jake logo",
              description: "A blog as an excuse to delve into the world of gitops. Posts are all hosted in github with a config yaml file and an image. This information is periodically added to a basic database and used to drive the blog. Any updates on the github pages change the content in the blog. A comment section is also provided using github issues.",
              link: "https://www.jakelanders.com/blog",
              imageClass: ""
            }} />
          </div>
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="100">
            <ProjectCell props={{
              title: "Neural Network",
              imageSrc: "/images/nn.png",
              imageAlt: "neural network",
              description: "Implementation of a functioning neural network implemented entirely in the dart programming language without the aid of packages. Dense layers, activation functions, loss functions, optimizers trained on the mnist dataset to guess handwritten digits. Created out of my curiosity on how the math behind neural networks work.",
              link: "https://nn.jakelanders.com",
              imageClass: ""
            }} />
          </div>
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="125">
            <ProjectCell props={{
              title: "Sapphire Marketing Site",
              imageSrc: "/svg/sapphire.svg",
              imageAlt: "Sapphire logo",
              description: "Marketing website for my business built with NextJS. Focused on creating a beautiful user experience and flawless design. This website really helped hone my React skills, and combined with this website has made me confident on building any sort of website/application needed of anyone.",
              link: "https://sapphirenw.com",
              imageClass: ""
            }} />
          </div>
        </div>
      </div>
      <div className="grid place-items-center space-y-16">
        <Label text={"Skills & Technologies"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8s overflow-hidden md:overflow-visible">
          <div data-aos="fade-up-right" data-aos-offset="200" data-aos-delay="0">
            <SkillsCell props={{
              title: "Flutter",
              imageSrc: "/images/flutter.png",
              imageAlt: "flutter logo",
              description: "If I had to pick one language to program the rest of my life in, I would choose Dart, the language that powers Flutter. Building beautiful cross platform applications is a joy in this framework, and is one of the technologies I would consider myself to be an expert in.",
              subTitle: "My Stack",
              body: <>
                <ul className="list-disc px-4 py-2">
                  <li>Provider for state management</li>
                  <li>Custom Widgets for mixing iOS and Android UI</li>
                  <li>NoSQL databases to deliver top performance</li>
                </ul>
              </>
            }} />
          </div>
          <div data-aos="fade-up-left" data-aos-offset="200" data-aos-delay="200">
            <SkillsCell props={{
              title: "NextJS",
              imageSrc: "/images/nextjs.png",
              imageAlt: "nextjs logo",
              description: "NextJS is a Javascript framework that takes React to the next level. While it uses the React DOM, it has a number of optimizations to make it the best framework on the market today. In fact, this very website and blog were built completely in NextJS.",
              subTitle: "How I Use It",
              body: <>
                <ul className="list-disc px-4 py-2">
                  <li>The amazing Tailwind CSS for styling</li>
                  <li>React-Icons for a verbose icon library</li>
                  <li>MySQL databases for consistent content</li>
                </ul>
              </>
            }} />
          </div>
          <div data-aos="fade-up-right" data-aos-offset="200" data-aos-delay="0">
            <SkillsCell props={{
              title: "Databases",
              imageSrc: "/images/mongodb.png",
              imageAlt: "mongodb logo",
              description: "I am extremely comfortable with both relational and non-relational database paradigms. NoSQL is where I am most comfortable, but I also know when the right time to use a relational database is. My favorite from each type is MongoDB for NoSQL and MySQL for SQL.",
              subTitle: "Technologies I Use",
              body: <>
                <ul className="list-disc px-4 py-2">
                  <li>AWS DynamoDB & MongoDB</li>
                  <li>MySQL & Postgresql</li>
                  <li>Redis & Casandra</li>
                </ul>
              </>
            }} />
          </div>
          <div data-aos="fade-up-left" data-aos-offset="200" data-aos-delay="200">
            <SkillsCell props={{
              title: "SwiftUI",
              imageSrc: "/images/swift.png",
              imageAlt: "swift logo",
              description: "The framwork I learned to code on. Apple's SwiftUI is one of the most powerful UI Frameworks from a technical and impactful perspective. Ellegant UI's that work for iOS, MacOS, and iPadOS are easily share the same codebase in this framework.",
              subTitle: "How I Use This",
              body: <>
                <ul className="list-disc px-4 py-2">
                  <li>Building Native iOS and iPadOS Apps</li>
                  <li>All MacOS applications</li>
                  <li>iOS widgets for Flutter applications</li>
                </ul>
              </>
            }} />
          </div>
          <div data-aos="fade-up-right" data-aos-offset="200" data-aos-delay="0">
            <SkillsCell props={{
              title: "Web APIs",
              imageSrc: "/images/go.png",
              imageAlt: "go logo",
              description: "Building fast, performant web apis is one of the most necessary components of any online technology. I have loads of experience in a wide variety of api frameworks. Lately, I have been using Go to build c-level fast memory safe apis for a variety of projects.",
              subTitle: "My Frameworks",
              body: <>
                <ul className="list-disc px-4 py-2">
                  <li>Python Flask</li>
                  <li>Dart Shelf</li>
                  <li>Go Chi</li>
                </ul>
              </>
            }} />
          </div>
          <div data-aos="fade-up-left" data-aos-offset="200" data-aos-delay="200">
            <SkillsCell props={{
              title: "Container Orchestration",
              imageSrc: "/images/kubernetes.png",
              imageAlt: "kuberentes logo",
              description: "Hosting web infrastructure at scale is a complex issue with many viable solutions. I have intamite experience with Docker and Kubernetes from my time at New Relic while creating a new database orchestration system. This website is also hosted inside a docker container.",
              subTitle: "My Scope",
              body: <>
                <ul className="list-disc px-4 py-2">
                  <li>Docker Containers</li>
                  <li>Amazon Elatstic Kubernetes Service (EKS)</li>
                  <li>CrucnhyData Postgres operator</li>
                </ul>
              </>
            }} />
          </div>
        </div>
      </div>
      <div className="grid place-items-center space-y-16">
        <div id="contact" className="pt-12">
          <Label text={"Contact"} />
        </div>
        <div data-aos="fade-up" data-aos-offset="200">
          <Form props={{}} />
        </div>
      </div>
    </div>
  </>
}

export default Home
