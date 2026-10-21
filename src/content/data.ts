import type { Site, Post } from './types'

export const site: Site = {
  "name": "Jake Landers",
  "tagline": "I build things: apps, infrastructure, and whatever else I get curious about.",
  "bio": [
    "I'm a software engineer in New York City. My day job is on the platform team at Vantage, where I build telemetry ingestion that costs a fraction of what the big vendors charge. Nights and weekends, I ship my own products: a social food app, an app that turns saved posts into places to go, and a sports team manager that has been through three rewrites.",
    "I'm all over the stack, and I like it that way. I've built native and cross-platform mobile apps, web apps, database operators on Kubernetes, OpenTelemetry pipelines on AWS, LLM extraction pipelines, and a neural network from scratch in Dart. I also spent a few years teaching computational research tools to students and professors."
  ],
  "location": "New York, NY",
  "email": "me@jakelanders.com",
  "links": [
    {
      "label": "GitHub",
      "href": "https://github.com/jake-landersweb"
    },
    {
      "label": "LinkedIn",
      "href": "https://www.linkedin.com/in/jake-landers-b96721227/"
    },
    {
      "label": "Instagram",
      "href": "https://www.instagram.com/landers_99/"
    },
    {
      "label": "Twitter",
      "href": "https://mobile.twitter.com/xchecksports"
    }
  ],
  "jobs": [
    {
      "org": "Vantage",
      "role": "Senior Software Engineer, Platform",
      "dates": "July 2026 - Present",
      "blurb": "I'm building an OpenTelemetry collector endpoint from scratch on AWS, tuned for cost and throughput: it runs at about 1/20th of what New Relic or Datadog charge for the same volume. I also built the compaction system behind it on S3 Tables."
    },
    {
      "org": "CloudZero",
      "role": "Software Engineer",
      "dates": "December 2024 - March 2026",
      "blurb": "I helped build a Kubernetes cost telemetry pipeline from scratch on a team of five."
    },
    {
      "org": "New Relic",
      "role": "Software Engineer, Database Team",
      "dates": "May 2022 - December 2024",
      "blurb": "I worked on a database-as-a-service system hosted on AWS EKS, with custom operators and manifest state management in CUE."
    },
    {
      "org": "Sapphire",
      "role": "Software development",
      "dates": "January 2022 - Present",
      "blurb": "I work on software for businesses at a small agency. The agency now focuses on helping businesses adopt AI."
    },
    {
      "org": "Computational research workshops",
      "role": "Research Instructor",
      "dates": "June 2020 - 2023",
      "blurb": "I taught a weekly class on computational research for students and professors. Topics included genomics tools, Python, R, and Linux servers over SSH."
    }
  ],
  "education": [],
  "projects": [
    {
      "name": "finds",
      "year": "2026",
      "blurb": "A social app for scanning, ranking, and sharing snacks, drinks, and pantry staples, built with Steven Cloud. The pairwise ranking logic is shared between the mobile client and the backend, and background workers ingest and enrich the product catalog.",
      "tech": [
        "TypeScript",
        "React Native",
        "Expo",
        "Hono",
        "PostgreSQL",
        "Typesense"
      ],
      "links": [
        {
          "label": "Website",
          "href": "https://finds.nyc"
        },
        {
          "label": "App Store",
          "href": "https://apps.apple.com/us/app/finds-snacks-with-friends/id6798069948"
        }
      ]
    },
    {
      "name": "Envoyr",
      "year": "2025–2026",
      "blurb": "Pulls real places out of shared social posts, articles, and screenshots, then surfaces nearby saves with location-triggered nudges. Uses LLM extraction, Overture Maps place resolution in DuckDB, offline sync, and native iOS background scoring. Now being rebuilt as Places.",
      "tech": [
        "TypeScript",
        "React Native",
        "PostgreSQL / PostGIS",
        "PowerSync",
        "DuckDB",
        "Swift"
      ],
      "links": [
        {
          "label": "Website",
          "href": "https://envoyr.app"
        },
        {
          "label": "App Store",
          "href": "https://apps.apple.com/app/envoyr/id6758253836"
        }
      ]
    },
    {
      "name": "Crosscheck Sports",
      "year": "2022–2026",
      "blurb": "Team management for recreational sports: rosters, schedules, and attendance. The original Flutter app is being rewritten as a web app that imports league schedules with deterministic scrapers and AI-generated extraction recipes, and collects attendance by text message.",
      "tech": [
        "TypeScript",
        "TanStack Start",
        "Hono",
        "PostgreSQL",
        "Telnyx",
        "Flutter"
      ],
      "links": [
        {
          "label": "Website",
          "href": "https://www.crosschecksports.com"
        },
        {
          "label": "App Store",
          "href": "https://apps.apple.com/us/app/crosscheck-sports/id1585600361"
        },
        {
          "label": "Google Play",
          "href": "https://play.google.com/store/apps/details?id=com.landersweb.pnflutter"
        }
      ]
    },
    {
      "name": "Workout Notepad",
      "year": "Retired 2025",
      "blurb": "An exercise tracker for weight lifting, with fast workout logging and progress visualizations.",
      "tech": [],
      "links": []
    },
    {
      "name": "Calorie Me",
      "blurb": "A calorie tracker built over a weekend in SwiftUI. It uses a custom document database for persistent storage.",
      "tech": [
        "SwiftUI"
      ],
      "links": [
        {
          "label": "App Store",
          "href": "https://apps.apple.com/us/app/calorie-me/id1608922326"
        }
      ]
    },
    {
      "name": "Neural Network",
      "blurb": "A neural network written in Dart without packages. It implements dense layers, activation and loss functions, and optimizers to recognize handwritten MNIST digits.",
      "tech": [
        "Dart"
      ],
      "links": [
        {
          "label": "Demo",
          "href": "https://nn.jakelanders.com"
        },
        {
          "label": "Source",
          "href": "https://github.com/jake-landersweb/dart_nn"
        }
      ]
    }
  ],
  "skills": {
    "languages": [
      "TypeScript",
      "Go",
      "Swift",
      "Dart",
      "Python",
      "R",
      "CUE"
    ],
    "mobile": [
      "React Native",
      "Expo",
      "SwiftUI",
      "Flutter"
    ],
    "web": [
      "React",
      "TanStack Start",
      "Hono",
      "Next.js"
    ],
    "data": [
      "PostgreSQL",
      "PostGIS",
      "Drizzle",
      "DuckDB",
      "ClickHouse",
      "Typesense",
      "DynamoDB",
      "MongoDB",
      "Redis",
      "Cassandra"
    ],
    "infrastructure": [
      "Kubernetes",
      "AWS",
      "AWS EKS",
      "Docker",
      "Pulumi",
      "Terraform",
      "Linux",
      "OpenTelemetry",
      "S3 Tables / Iceberg"
    ],
    "AI": [
      "LLM extraction pipelines",
      "Neural networks from scratch"
    ],
    "research": [
      "VCFtools",
      "BCFtools",
      "PLINK",
      "SAMtools",
      "BamTools"
    ]
  }
}
export const posts: Post[] = [
  {
    "slug": "migrating-from-openai",
    "title": "Migrating Away from the OpenAI API",
    "date": "2023-12-07",
    "summary": "Compare Python API examples for OpenAI and Anthropic to reduce vendor lock-in.",
    "tags": [
      "ai",
      "python",
      "llm"
    ]
  },
  {
    "slug": "swift-vs-flutter-profile",
    "title": "SwiftUI Vs Flutter: Profile View",
    "date": "2022-12-20",
    "summary": "Compare a profile view built in SwiftUI and Flutter.",
    "tags": [
      "swiftui",
      "flutter",
      "dart",
      "mobile"
    ]
  },
  {
    "slug": "flutter-wizard",
    "title": "Smooth Wizard Widget for Flutter Apps",
    "date": "2022-10-26",
    "summary": "Build an animated wizard for creating data in Flutter apps.",
    "tags": [
      "flutter",
      "dart",
      "ui"
    ]
  },
  {
    "slug": "crosscheck-createteam",
    "title": "Creating a Sports Team With Crosscheck Sports",
    "date": "2022-10-26",
    "summary": "Create a team, season, and roster in Crosscheck Sports.",
    "tags": [
      "crosscheck",
      "flutter"
    ]
  },
  {
    "slug": "dart-neuralnetwork",
    "title": "Dart Neural Network Part 1: Implementation",
    "date": "2022-10-05",
    "summary": "Implement a neural network in Dart without packages.",
    "tags": [
      "dart",
      "neuralnetwork",
      "ai"
    ]
  },
  {
    "slug": "unix-beginnersguide",
    "title": "Unix Setup Guide",
    "date": "2022-08-23",
    "summary": "Set up a terminal and create and execute files for a WSU workshop.",
    "tags": [
      "unix",
      "wsu"
    ]
  },
  {
    "slug": "swiftui-loadingplaceholder",
    "title": "SwiftUI - API Load Placeholder",
    "date": "2022-07-24",
    "summary": "Show placeholder content while SwiftUI loads API data.",
    "tags": [
      "swiftui",
      "mobile"
    ]
  },
  {
    "slug": "swift-vs-flutter-loginui",
    "title": "Swift vs Flutter - LoginUI",
    "date": "2022-07-24",
    "summary": "Compare the same login screen implemented in Flutter and SwiftUI.",
    "tags": [
      "flutter",
      "swiftui",
      "mobile"
    ]
  },
  {
    "slug": "flutter-sheetselector",
    "title": "Modal Floating Bottom Sheet in Flutter",
    "date": "2022-07-24",
    "summary": "Build a floating bottom sheet in Flutter for iOS and Android.",
    "tags": [
      "flutter",
      "mobile"
    ]
  },
  {
    "slug": "flutter-pullrefresh",
    "title": "Pull-to-refresh in Flutter",
    "date": "2022-07-24",
    "summary": "Implement pull-to-refresh animations in Flutter.",
    "tags": [
      "flutter",
      "mobile",
      "widget"
    ]
  },
  {
    "slug": "flutter-loginscreen",
    "title": "Login UI in Flutter",
    "date": "2022-07-24",
    "summary": "Build a Flutter login screen based on Crosscheck Sports.",
    "tags": [
      "flutter",
      "mobile",
      "svg"
    ]
  },
  {
    "slug": "flutter-iosmenu",
    "title": "iOS Style Login Screen in Flutter",
    "date": "2022-07-24",
    "summary": "Build an iPad-style menu in Flutter with Provider and Sprung.",
    "tags": [
      "flutter",
      "mobile"
    ]
  },
  {
    "slug": "swiftui-asyncimage",
    "title": "SwiftUI 3 - AsyncImage with Dynamic Codable Session",
    "date": "2022-07-22",
    "summary": "Load remote images and decode API data with SwiftUI 3.",
    "tags": [
      "swiftui",
      "mobile"
    ]
  }
]

// Optional assets keyed by project name; the shared Project type has no image field.
export const projectImages: Record<string, string> = {
  "Workout Notepad": "/images/workout-notepad.png",
  "Crosscheck Sports": "/images/xcheck.png",
  "Calorie Me": "/images/calorieme.png",
  "Neural Network": "/images/nn.png"
}

export const portrait = "/images/jake.jpg"
