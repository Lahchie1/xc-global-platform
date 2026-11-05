export interface MarketingGrowthService {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  shortDescription: string;
  deliverables: {
    title: string;
    description: string;
  }[];
  processSteps?: {
    step: string;
    title: string;
    description: string;
  }[];
  metrics?: {
    name: string;
    description: string;
  }[];
  offerings?: {
    title: string;
    description: string;
    bestFor: string;
  }[];
}

export const marketingGrowthServices: MarketingGrowthService[] = [
  {
    slug: "go-to-market-strategy",
    title: "Go-to-Market (GTM) Strategy",
    tagline: "Build a clear path from market entry to sustainable growth.",
    summary:
      "We help businesses turn product ideas, new offerings, and expansion opportunities into actionable go-to-market strategies. By understanding your target market, competitive landscape, customer needs, and business objectives, we develop a structured plan for reaching the right audience and generating demand. From market positioning to launch execution and customer acquisition, we align your marketing activities with the opportunities that matter most.",
    shortDescription:
      "Market positioning, launch strategy, customer acquisition planning, and growth roadmaps.",
    deliverables: [
      {
        title: "Market Research & Opportunity Analysis",
        description:
          "Assess market demand, customer needs, industry trends, and competitive positioning to identify growth opportunities.",
      },
      {
        title: "Customer Segmentation & Targeting",
        description:
          "Define ideal customer profiles and audience segments to focus your marketing efforts on the people most likely to convert.",
      },
      {
        title: "Positioning & Messaging",
        description:
          "Clarify your value proposition and develop messaging that differentiates your business from competitors.",
      },
      {
        title: "Launch & Market Entry Strategy",
        description:
          "Plan product launches, new market entry, channel selection, and campaign execution.",
      },
      {
        title: "Customer Acquisition Planning",
        description:
          "Identify the channels, tactics, and resources needed to attract and convert customers.",
      },
      {
        title: "Growth Roadmaps",
        description:
          "Establish priorities, timelines, and measurable objectives to guide execution and track progress.",
      },
    ],
  },
  {
    slug: "paid-media-campaign-strategy",
    title: "Paid Media & Campaign Strategy",
    tagline: "Turn advertising spend into measurable business growth.",
    summary:
      "We help businesses plan, launch, and optimise paid advertising campaigns that reach the right audiences and support meaningful business outcomes. Our approach combines audience research, campaign strategy, creative direction, budget planning, and continuous performance analysis to improve acquisition efficiency. Whether you're launching your first campaign or scaling an established advertising programme, we focus on identifying what works, reducing wasted spend, and building a stronger foundation for sustainable growth.",
    shortDescription:
      "Google, Meta, TikTok, LinkedIn, X, and other paid acquisition channels.",
    deliverables: [
      {
        title: "Campaign Strategy & Planning",
        description:
          "Develop campaign structures aligned with your business goals, target audiences, offers, and customer acquisition objectives.",
      },
      {
        title: "Audience Research & Targeting",
        description:
          "Identify relevant audience segments and build targeting strategies around customer behaviour, interests, and intent.",
      },
      {
        title: "Paid Channel Management",
        description:
          "Plan and manage campaigns across Google Ads, Meta, TikTok, LinkedIn, X, and other relevant advertising platforms.",
      },
      {
        title: "Creative & Ad Copy Strategy",
        description:
          "Develop messaging angles, creative concepts, and ad variations designed to capture attention and encourage action.",
      },
      {
        title: "Budget & Bid Optimisation",
        description:
          "Allocate advertising budgets strategically and optimise campaigns based on performance and acquisition costs.",
      },
      {
        title: "Performance Analysis & Scaling",
        description:
          "Monitor campaign metrics, identify opportunities for improvement, and scale effective campaigns based on measurable results.",
      },
    ],
  },
  {
    slug: "conversion-rate-optimisation",
    title: "Conversion Rate Optimisation (CRO)",
    tagline: "Turn more website visitors into paying customers.",
    summary:
      "We help businesses understand why visitors leave without converting and identify opportunities to improve website and funnel performance. Through structured audits, user behaviour analysis, experimentation, and implementation, we uncover friction points that prevent customers from taking action. Rather than relying on assumptions or cosmetic design changes, we use data and customer insights to guide improvements across landing pages, product pages, and checkout experiences. The goal is to help your business generate more value from existing traffic while creating a smoother customer journey.",
    shortDescription:
      "Website and funnel audits, conversion analysis, experimentation, and implementation.",
    deliverables: [
      {
        title: "Website & Funnel Audits",
        description:
          "Assess website usability, landing pages, conversion paths, and checkout flows to identify friction points and missed opportunities.",
      },
      {
        title: "Conversion Analysis & Research",
        description:
          "Analyse traffic sources, user journeys, conversion rates, and drop-off points to understand where performance is falling short.",
      },
      {
        title: "User Behaviour Research",
        description:
          "Use heatmaps, session recordings, customer reviews, surveys, and other research methods to understand how visitors interact with your website.",
      },
      {
        title: "UX/UI Optimisation",
        description:
          "Improve page layouts, navigation, messaging, information hierarchy, and user flows to make decision-making easier.",
      },
      {
        title: "A/B Testing & Experimentation",
        description:
          "Test evidence-based changes to pages, offers, and user experiences to determine which variations perform better.",
      },
      {
        title: "CRO Implementation",
        description:
          "Turn research findings into practical website improvements, from landing page enhancements to simplified checkout experiences.",
      },
      {
        title: "Performance Measurement",
        description:
          "Track conversion rate, revenue per visitor, average order value, and funnel completion to guide ongoing optimisation.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Audit",
        description:
          "Review your analytics, website experience, conversion funnel, and customer feedback to identify where opportunities exist.",
      },
      {
        step: "02",
        title: "Analyse",
        description:
          "Understand the reasons behind user behaviour, conversion barriers, and points of friction across the customer journey.",
      },
      {
        step: "03",
        title: "Prioritise",
        description:
          "Develop a roadmap of potential improvements and rank opportunities by evidence, expected impact, and implementation effort.",
      },
      {
        step: "04",
        title: "Experiment & Implement",
        description:
          "Design, develop, and test prioritised improvements to determine which changes deliver better results.",
      },
      {
        step: "05",
        title: "Measure & Improve",
        description:
          "Evaluate the results, document learnings, and use the findings to inform the next round of improvements.",
      },
    ],
    metrics: [
      {
        name: "Conversion Rate (CVR)",
        description: "Increase the proportion of visitors who complete a desired action.",
      },
      {
        name: "Revenue Per Visitor (RPV)",
        description: "Generate more revenue from the traffic you already attract.",
      },
      {
        name: "Average Order Value (AOV)",
        description: "Increase the value of each order through better offers, bundles, and upsells.",
      },
      {
        name: "Funnel Completion",
        description: "Reduce unnecessary friction and drop-offs throughout the customer journey.",
      },
      {
        name: "Return on Ad Spend (ROAS)",
        description: "Help paid campaigns generate more revenue from existing advertising spend.",
      },
    ],
    offerings: [
      {
        title: "CRO Audit & Strategy",
        description:
          "Understand what's holding your website back with a comprehensive audit and a prioritised roadmap of improvements.",
        bestFor:
          "Businesses that have traffic but aren't converting as expected, or want to understand their website's performance before investing further.",
      },
      {
        title: "Ongoing Experimentation",
        description:
          "Build a continuous optimisation programme around research, hypothesis development, testing, implementation, and reporting.",
        bestFor:
          "Businesses looking to improve conversion performance through ongoing experimentation and learning.",
      },
      {
        title: "Design & Development Support",
        description:
          "Get conversion-focused landing pages, website improvements, and implementation support built around your business goals.",
        bestFor:
          "Businesses launching new pages, improving existing websites, or needing specialist CRO design and development capacity.",
      },
    ],
  },
  {
    slug: "seo-consulting-implementation",
    title: "SEO Consulting & Implementation",
    tagline: "Improve search visibility and attract customers actively looking for your solutions.",
    summary:
      "We help businesses strengthen their organic search presence by making their websites easier for search engines and users to understand. Our approach combines technical analysis, keyword research, content optimisation, and on-page improvements to address search visibility gaps and attract more relevant traffic. Whether your website needs a technical overhaul or a more focused content strategy, we identify opportunities to improve discoverability and align your content with what your target audience is searching for.",
    shortDescription:
      "Technical SEO, on-page optimisation, keyword strategy, content optimisation, and search visibility.",
    deliverables: [
      {
        title: "Technical SEO Audits",
        description:
          "Identify issues affecting crawling, indexing, site structure, page performance, and search engine accessibility.",
      },
      {
        title: "Keyword Research & Strategy",
        description:
          "Discover relevant search terms and prioritise opportunities based on customer intent, business relevance, and ranking potential.",
      },
      {
        title: "On-Page SEO",
        description:
          "Optimise page titles, meta descriptions, headings, internal links, and other on-page elements to improve relevance and discoverability.",
      },
      {
        title: "Content Optimisation",
        description:
          "Improve existing website content and develop recommendations for content that addresses customer questions and search intent.",
      },
      {
        title: "Website Structure & Internal Linking",
        description:
          "Organise website content to improve navigation, connect related pages, and support search engine discovery.",
      },
      {
        title: "Competitor & Search Opportunity Analysis",
        description:
          "Evaluate competing websites and identify gaps that could create opportunities for stronger visibility.",
      },
      {
        title: "SEO Performance Monitoring",
        description:
          "Track organic traffic, keyword performance, and relevant engagement and conversion metrics to inform ongoing improvements.",
      },
    ],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    tagline: "Build a stronger brand presence and turn audience attention into meaningful engagement.",
    summary:
      "We help businesses develop and manage social media programmes that connect their brand with the right audience. From strategy and content planning to publishing, community engagement, and performance analysis, we bring structure and consistency to your social media activities. Our approach aligns content with your brand positioning, audience interests, and business objectives, helping you build awareness, strengthen relationships, and create more opportunities to turn engagement into business growth.",
    shortDescription:
      "Content strategy, content planning, publishing, community management, and performance optimisation.",
    deliverables: [
      {
        title: "Social Media Strategy",
        description:
          "Define channel priorities, audience segments, content objectives, and platform-specific approaches aligned with your business goals.",
      },
      {
        title: "Content Planning & Calendars",
        description:
          "Develop structured content calendars that maintain consistency and balance educational, promotional, and engagement-focused content.",
      },
      {
        title: "Content Creation & Publishing",
        description:
          "Coordinate the development and publishing of relevant posts, campaign assets, captions, and platform-specific content.",
      },
      {
        title: "Brand Voice & Messaging",
        description:
          "Maintain consistent communication across channels while adapting content to the expectations of each platform.",
      },
      {
        title: "Community Management",
        description:
          "Support audience engagement by monitoring comments, responding to messages, and helping build stronger relationships with followers.",
      },
      {
        title: "Campaign & Promotion Management",
        description:
          "Plan social content around product launches, marketing campaigns, announcements, and business initiatives.",
      },
      {
        title: "Performance Analysis & Optimisation",
        description:
          "Review reach, engagement, audience growth, and relevant traffic or conversion metrics to improve future content performance.",
      },
    ],
  },
  {
    slug: "shopify-development-management",
    title: "Shopify Development & Management",
    tagline: "Build a better online store designed to support sales and long-term growth.",
    summary:
      "We help businesses build, improve, and manage Shopify stores that deliver seamless shopping experiences and support their commercial goals. From initial store development to ongoing optimisation, we focus on creating a store experience that makes it easy for customers to discover products, understand their value, and complete purchases. We also help businesses improve existing stores, address usability issues, and implement changes that support operational efficiency and e-commerce performance.",
    shortDescription:
      "Shopify store development, optimisation, ongoing management, and e-commerce growth.",
    deliverables: [
      {
        title: "Shopify Store Development",
        description:
          "Set up and configure Shopify stores around your brand, product catalogue, business requirements, and customer experience goals.",
      },
      {
        title: "Theme Customisation & Design",
        description:
          "Customise store layouts, page templates, and visual elements to reflect your brand and improve usability.",
      },
      {
        title: "Product & Collection Optimisation",
        description:
          "Organise product catalogues, collections, descriptions, and imagery to make products easier to discover and evaluate.",
      },
      {
        title: "App & Tool Integrations",
        description:
          "Configure relevant Shopify apps and integrations to support payments, marketing, fulfilment, customer service, and store operations.",
      },
      {
        title: "Store UX & Conversion Improvements",
        description:
          "Improve navigation, product pages, mobile usability, and checkout experiences to reduce friction during purchase.",
      },
      {
        title: "Ongoing Store Management",
        description:
          "Support routine updates, store maintenance, content changes, troubleshooting, and operational improvements.",
      },
      {
        title: "Performance & Growth Optimisation",
        description:
          "Identify opportunities to improve store performance, customer experience, and the effectiveness of your e-commerce activities.",
      },
    ],
  },
  {
    slug: "e-commerce-growth",
    title: "E-commerce Growth",
    tagline: "Build a stronger growth engine for customer acquisition, conversions, and revenue.",
    summary:
      "We help e-commerce businesses improve performance across the entire customer lifecycle, from attracting first-time visitors to converting purchases and encouraging repeat orders. By connecting marketing, website experience, merchandising, and retention, we identify opportunities to improve how your store acquires customers and generates revenue. Our approach focuses on the factors that influence commercial performance, helping you make better use of your marketing budget, product catalogue, and existing customer base.",
    shortDescription:
      "Customer acquisition, conversion optimisation, retention, merchandising, and revenue growth strategies.",
    deliverables: [
      {
        title: "Customer Acquisition Strategy",
        description:
          "Identify the channels, audiences, and campaigns best suited to attracting relevant shoppers and generating new sales.",
      },
      {
        title: "Conversion Optimisation",
        description:
          "Improve landing pages, product pages, navigation, and checkout flows to help more visitors complete purchases.",
      },
      {
        title: "Merchandising & Product Positioning",
        description:
          "Improve product discovery, collection structures, bundles, cross-sells, and upsells to support purchasing decisions.",
      },
      {
        title: "Customer Retention",
        description:
          "Develop strategies that encourage repeat purchases through lifecycle marketing, customer engagement, and relevant post-purchase experiences.",
      },
      {
        title: "Cart & Checkout Optimisation",
        description:
          "Identify abandonment issues and simplify the purchase process to reduce unnecessary friction.",
      },
      {
        title: "Revenue & Performance Analysis",
        description:
          "Monitor sales, average order value, customer acquisition costs, and repeat purchase performance to identify growth opportunities.",
      },
      {
        title: "Growth Planning & Execution",
        description:
          "Translate performance insights into prioritised initiatives that support sustainable e-commerce growth.",
      },
    ],
  },
  {
    slug: "growth-team-management",
    title: "Growth Team Management",
    tagline: "Build and coordinate the marketing team your business needs to scale.",
    summary:
      "We help businesses establish and manage marketing teams that are aligned with their growth objectives. Whether you need to structure an existing team, bring in specialist talent, or coordinate multiple marketing functions, we create a clearer framework for responsibilities, priorities, and execution. By connecting people, processes, and performance measurement, we help reduce fragmented efforts and improve coordination across your marketing activities, keeping the team focused on the initiatives most likely to move the business forward.",
    shortDescription:
      "Building, managing, and coordinating marketing teams around measurable growth objectives.",
    deliverables: [
      {
        title: "Team Structure & Planning",
        description:
          "Identify the roles, skills, and capabilities required to support your marketing strategy and growth objectives.",
      },
      {
        title: "Talent Sourcing & Team Building",
        description:
          "Help identify and organise the marketing specialists needed across acquisition, content, creative, analytics, and optimisation.",
      },
      {
        title: "Role Definition & Accountability",
        description:
          "Establish clear responsibilities, ownership, and expectations to improve coordination and execution.",
      },
      {
        title: "Marketing Workflow Management",
        description:
          "Develop processes for campaign planning, task management, collaboration, approvals, and delivery.",
      },
      {
        title: "Cross-Functional Coordination",
        description:
          "Align marketing, sales, product, creative, and other relevant teams around shared business priorities.",
      },
      {
        title: "Performance Management",
        description:
          "Establish goals, KPIs, reporting routines, and review processes that connect team activities to business outcomes.",
      },
      {
        title: "Growth Roadmaps & Execution",
        description:
          "Coordinate priorities and initiatives to ensure the team works toward measurable objectives and adapts as business needs evolve.",
      },
    ],
  },
  {
    slug: "marketing-analytics-performance-optimisation",
    title: "Marketing Analytics & Performance Optimisation",
    tagline: "Turn marketing data into actionable insights and better business decisions.",
    summary:
      "We help businesses understand how their marketing activities contribute to customer acquisition, conversions, and revenue. By improving tracking, reporting, attribution, and performance analysis, we create a clearer picture of what is working, where resources are being wasted, and which opportunities deserve attention. We connect data across relevant marketing channels and customer journeys to support more informed decisions about campaign performance, budget allocation, and future growth initiatives.",
    shortDescription:
      "Tracking, attribution, reporting, performance analysis, and data-driven optimisation.",
    deliverables: [
      {
        title: "Tracking & Measurement Setup",
        description:
          "Establish or improve analytics tracking to measure important website actions, campaign interactions, and conversion events.",
      },
      {
        title: "Marketing Analytics Audits",
        description:
          "Review existing tracking and reporting setups to identify data gaps, inconsistencies, and measurement issues.",
      },
      {
        title: "Attribution Analysis",
        description:
          "Assess how different channels and touchpoints contribute to conversions and customer acquisition, accounting for the limitations of available attribution data.",
      },
      {
        title: "Reporting & Dashboards",
        description:
          "Develop clear performance reports and dashboards that make key marketing metrics easier to monitor and interpret.",
      },
      {
        title: "Campaign Performance Analysis",
        description:
          "Evaluate campaign performance across channels to identify strengths, weaknesses, and opportunities for improvement.",
      },
      {
        title: "Customer Journey & Funnel Analysis",
        description:
          "Examine how users move from initial engagement to conversion and identify where measurement or performance gaps occur.",
      },
      {
        title: "Data-Driven Optimisation",
        description:
          "Translate findings into practical recommendations for budget allocation, campaign improvements, and more effective marketing execution.",
      },
    ],
  },
];

