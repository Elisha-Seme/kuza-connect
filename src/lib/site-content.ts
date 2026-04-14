/**
 * Canonical knowledge base for KuzaConnect.
 * Each chunk is 300-500 words, self-contained, and covers one topic.
 * Run `node scripts/ingest.mjs` to embed and store these in Supabase.
 */

export type ContentChunk = {
  id: string
  title: string
  source: string
  content: string
}

export const SITE_CHUNKS: ContentChunk[] = [
  // ── ORGANISATION ────────────────────────────────────────────────────────────
  {
    id: 'overview',
    title: 'KuzaConnect - Who We Are',
    source: '/',
    content: `KuzaConnect is an education consulting organisation based in Nairobi, Kenya. The organisation helps locally-driven solutions expand by connecting international evidence, local knowledge, technology, and expert teams to build the capacity of governments and local organisations to deliver system-wide impact in education.

KuzaConnect was founded by Richard King and co-founded by Eric Nyamwaro. The core team also includes Vanessa Wambui (M&E Specialist) and Elisha Papa (IT Specialist), alongside a network of over 100 expert associates operating across more than 20 countries.

KuzaConnect's core mission is "A world where all children learn." The organisation focuses on the Global South, where learning poverty and equity issues are greatest. KuzaConnect believes passionately in local ownership and locally-driven solutions, acting as partners in the process rather than external imposers of solutions.

The organisation has delivered over 50 projects and has more than 15 years of experience in education consulting. They work with government ministries, international NGOs, development partners, and bilateral donors across Sub-Saharan Africa, South Asia, and beyond.

KuzaConnect operates with two core principles: evidence drives impact, and context beats content. They combine local knowledge with internationally benchmarked evidence for every assignment. Their teaming approach is flexible, connecting international and locally-based consultants to offer the right blended expertise for each context.`,
  },

  {
    id: 'mission-vision-values',
    title: 'Mission, Vision and Core Values',
    source: '/about',
    content: `KuzaConnect's mission is "A world where all children learn." The organisation strengthens the capacity of governments and local organisations to deliver quality education at scale, with a focus on equity, inclusion, and measurable outcomes for learners. Their work targets learning poverty reduction, systemic capacity building, and gender equity in education.

KuzaConnect's vision is "Systems that outlast us." They work themselves out of a job by building local teams and institutions that can sustain, adapt, and expand quality education without external dependency. This means every engagement is designed to transfer knowledge and build internal capacity, not create reliance on KuzaConnect.

Core Values:

Evidence-Driven: Every recommendation is grounded in internationally benchmarked evidence, carefully adapted to local context and realities. KuzaConnect does not copy-paste solutions; they rigorously test what works in similar contexts and adapt it.

Locally-Led: Sustainable change comes from building local ownership and capacity, not dependency on external expertise. Local partners are co-designers, not just implementers.

Context-First: Context beats content. What works elsewhere must be adapted thoughtfully to the specific cultural, political, and systemic realities of each country and community.`,
  },

  {
    id: 'history-milestones',
    title: 'KuzaConnect History and Milestones',
    source: '/about',
    content: `KuzaConnect's journey began in Nairobi, Kenya in 2009, when the organisation was founded with a clear mandate: help local education systems build the capacity to deliver quality learning at scale.

Key milestones in KuzaConnect's history:

2009: Founded in Nairobi, Kenya - Richard King established the organisation with a focus on education systems strengthening in East Africa.

2013: First government partnership - KuzaConnect secured their first formal partnership with a Ministry of Education, working with the Government of Uganda on early grade literacy and numeracy programmes.

2017: Expanded to Francophone Africa - The organisation grew its geographic footprint into French-speaking African countries, building a multilingual associate network.

2021: Launched AI-powered diagnostic tools - KuzaConnect became one of the first education consultancies to embed AI directly into their consulting process, launching tools for service matching, capacity assessment, and M&E analysis.

2024: 20 countries, 100+ expert associates - By 2024, KuzaConnect had delivered programmes across more than 20 countries and built a network of over 100 expert associates based across the Global South and internationally.`,
  },

  {
    id: 'team',
    title: 'KuzaConnect Core Team',
    source: '/associates',
    content: `KuzaConnect's core team combines education expertise, M&E rigour, and technology to deliver impact across the Global South.

Richard King - Founder: Richard founded KuzaConnect in 2009. His expertise spans strategy and organisational development. He brings decades of experience working with governments and development partners on education systems reform across East and Southern Africa.

Eric Nyamwaro - Co-Founder: Eric co-founded KuzaConnect and leads partnerships and programme design. He is based in East Africa and brings deep expertise in connecting global evidence with local education systems, particularly across Kenya and the broader East African region.

Vanessa Wambui - M&E Specialist: Vanessa leads monitoring, evaluation, and data analysis work at KuzaConnect. She designs M&E frameworks, builds data systems, and supports organisations to use evidence for learning and adaptive management.

Elisha Papa - IT Specialist: Elisha leads KuzaConnect's technology infrastructure, including the AI tools platform. He manages systems development, data pipelines, and the technical side of KuzaConnect's digital products.

Beyond the core team, KuzaConnect has a network of over 100 expert associates based across the Global South and internationally, who are deployed on assignments based on their specific expertise and regional knowledge.`,
  },

  // ── SERVICES: METHODOLOGY ───────────────────────────────────────────────────
  {
    id: 'services-overview',
    title: 'KuzaConnect Services Overview',
    source: '/services',
    content: `KuzaConnect offers fourteen service areas organised into two tracks: Methodology Services and Organisational Services. All services are co-designed with partners to meet real needs in real contexts.

KuzaConnect's approach to every assignment follows three steps:

1. Diagnose: They start by deeply understanding the problem - context, history, system dynamics, and existing capacity. No two education systems are the same, and diagnosis comes before prescription.

2. Design: They co-create solutions with local partners, adapting international evidence to fit the specific context. Designs are tested, iterated, and refined with end users before scale.

3. Deliver: They implement with quality, adapt in real-time, and build local capacity to sustain and scale outcomes. Every delivery is structured to leave something behind.

KuzaConnect also offers the AI-powered Impact Matcher tool for organisations unsure which service fits their needs. By answering four quick questions, organisations receive a personalised service recommendation.

The contact email for service enquiries is info@kuzaconnect.com and the phone number is +254 729 980718.`,
  },

  {
    id: 'service-foundation-learning',
    title: 'Foundation Learning Service',
    source: '/services',
    content: `Foundation Learning is one of KuzaConnect's core methodology services. It focuses on building literacy and numeracy at scale for early-grade learners across the Global South.

KuzaConnect designs and implements early-grade reading and maths programmes that are aligned to national standards and contextually adapted. Their approach draws on internationally benchmarked evidence from programmes like EGRA (Early Grade Reading Assessment) and EGMA (Early Grade Mathematics Assessment), adapted to local languages, curricula, and classroom realities.

Foundation Learning work includes: structured pedagogy design, levelled reading materials development, assessment frameworks, teacher coaching systems, and government capacity building to sustain programmes after external support ends.

KuzaConnect has delivered Foundation Learning programmes across multiple countries in East and West Africa, working alongside Ministries of Education, NGOs, and donor-funded programmes. Their work has reached hundreds of thousands of learners in early grades.

For governments and organisations looking to improve early grade learning outcomes, this service includes a full diagnostic phase, co-designed intervention, piloting, and scale-up support. They also integrate M&E systems to track learning gains at classroom and system level.`,
  },

  {
    id: 'service-teacher-development',
    title: 'Teacher Development Service',
    source: '/services',
    content: `Teacher Development is a core KuzaConnect methodology service that focuses on strengthening teaching capacity through evidence-based professional development.

KuzaConnect designs and delivers teacher development programmes from pre-service through to in-service, including coaching, mentoring, and structured professional development that builds lasting capability. Their approach is grounded in the evidence on what makes teacher training effective: it must be sustained over time, linked to classroom practice, and supported by school-level coaching rather than one-off workshops.

Teacher Development services include: teacher training programme design, instructional coaching systems, lesson observation and feedback frameworks, teacher learning communities, head teacher and school leadership development, and cascaded training models for national scale.

KuzaConnect has worked on teacher development programmes across Sub-Saharan Africa and South Asia, partnering with Ministries of Education, teacher training institutions, and development partners including USAID, UK FCDO, and the Global Partnership for Education.

Their Teacher Development work is closely integrated with their Foundation Learning and Curriculum Development services, ensuring that pedagogical improvements are coherent across the system.`,
  },

  {
    id: 'service-curriculum-me-accountability',
    title: 'Curriculum Development, M&E and Accountability Systems',
    source: '/services',
    content: `KuzaConnect offers three closely-related methodology services in Curriculum Development, M&E Systems, and Accountability Systems.

Curriculum Development: KuzaConnect co-designs contextually relevant, standards-aligned curricula with national teams, bringing international evidence to local realities. This includes syllabus design, textbook and materials development, scope-and-sequence mapping, and curriculum reform support for Ministries of Education. All curriculum work is piloted and iteratively refined with teachers and learners before national roll-out.

Accountability Systems: KuzaConnect builds robust assessment frameworks that enable governments to track learning outcomes at scale with actionable data. This includes national learning assessment design, school report cards, early warning systems, data dashboards, and accountability policy frameworks. The goal is systems where decision-makers at every level - classroom, school, district, national - have the data they need to act.

M&E (Monitoring and Evaluation): KuzaConnect designs M&E frameworks that measure what matters, generating actionable data for continuous learning. Services include theory of change development, indicator framework design, data collection tools, baseline and endline studies, programme evaluations, and learning systems. M&E is integrated into every KuzaConnect engagement as standard practice.`,
  },

  {
    id: 'service-employability-gender-edtech',
    title: 'Employability, Gender and Inclusion, EdTech Services',
    source: '/services',
    content: `KuzaConnect offers three additional methodology services: Employability, Gender and Inclusion, and EdTech.

Employability: KuzaConnect bridges education and work by designing skills programmes that connect youth to meaningful economic opportunities. This includes TVET (Technical and Vocational Education and Training) programme design, labour market analysis, employer engagement frameworks, and career guidance systems. They work with governments, private sector partners, and youth-serving organisations to design programmes that are grounded in real labour market demand.

Gender and Inclusion: KuzaConnect embeds equity at every level - from policy design to classroom practice - ensuring no learner is left behind. Their gender and inclusion work covers gender-responsive pedagogy, school-related gender-based violence prevention, disability-inclusive education, refugee and displaced children's education, and equity analysis in national education plans. They also support organisations to integrate gender across all programme components, not just as a standalone workstream.

EdTech: KuzaConnect deploys appropriate technology that fits context. They evaluate, adapt, and implement EdTech solutions for real classrooms, avoiding the trap of technology-first thinking. Their EdTech work includes EdTech landscape assessments, teacher technology integration support, digital content development, EdTech procurement advisory, and implementation support for national EdTech programmes.`,
  },

  {
    id: 'service-organisational',
    title: 'Organisational Services - Strategy, Policy, Fundraising, Solution Design',
    source: '/services',
    content: `KuzaConnect's Organisational Services track covers seven service areas that build the systems and capacity needed to make education change stick.

Strategy: KuzaConnect supports governments and organisations to develop clear, evidence-based education strategies with measurable goals. This includes strategic planning facilitation, theory of change development, strategic review, and stakeholder alignment processes. Strategy work is grounded in data and co-created with key stakeholders.

Policy Support: KuzaConnect translates political priorities into actionable policy, and policies into implementable, funded plans. Services include policy analysis, policy drafting, regulatory reform support, and policy-to-implementation design. They bridge the gap between what decision-makers want and what practitioners can deliver.

Business Growth and Fundraising: KuzaConnect helps local organisations build sustainable funding pipelines and expand their geographic reach. This includes proposal writing support, fundraising strategy, donor mapping, partnership brokering, and business development coaching. They support local organisations to become credible, competitive partners for international donors.

Solution Design: KuzaConnect co-designs fit-for-purpose interventions from problem diagnosis through to implementation planning. This is the most flexible service - applicable across any education challenge - and draws on KuzaConnect's full range of technical expertise.

Project Management, Budget Management: KuzaConnect offers end-to-end project management and financial management services ensuring quality delivery, stakeholder alignment, adaptive management, accountability, transparency, and efficient use of development resources.`,
  },

  // ── AI TOOLS ────────────────────────────────────────────────────────────────
  {
    id: 'ai-tools-overview',
    title: 'KuzaConnect AI Tools Overview',
    source: '/ai-solutions',
    content: `KuzaConnect embeds artificial intelligence directly into the consulting process. They offer three free, publicly available AI tools designed to give governments, NGOs, and development partners faster, sharper insights: Impact Matcher, Capacity Assessment, and M&E Report Analyzer.

KuzaConnect's approach to AI is grounded in four principles:

Evidence-informed, not evidence-replaced: AI tools surface patterns and structure insights, but every recommendation is grounded in the same internationally benchmarked evidence base their consultants use.

Context as the starting point: Each tool takes the user's country, organisation type, and specific challenge as inputs. Output is shaped by context, not generic best practice.

Built for non-technical users: No data science background needed. The tools are designed for programme managers, government officials, and NGO leaders who need fast, usable insights.

A bridge to deeper support: AI tools give a starting point. Where deeper diagnosis or implementation support is needed, KuzaConnect's team of associates steps in to build from the AI output.

All three tools are free to use and available at kuzaconnect.com. They run on the latest Claude AI models and have been designed by KuzaConnect's consulting and technology teams.`,
  },

  {
    id: 'tool-impact-matcher',
    title: 'Impact Matcher - AI Tool',
    source: '/impact-matcher',
    content: `The Impact Matcher is KuzaConnect's first AI tool. It is free and publicly available. The tool helps organisations find the right KuzaConnect service for their specific context by answering four quick questions.

How it works:
1. Select your organisation type (government, NGO, development partner, etc.)
2. Describe your primary education challenge
3. Indicate your scale of operation
4. Specify your country context

The Impact Matcher analyses your inputs against KuzaConnect's full service catalogue and returns a personalised service recommendation in seconds. The output includes a ranked service recommendation with reasoning, approach guidance, and suggested next steps.

The Impact Matcher is best used by: programme managers unsure which KuzaConnect service matches their challenge, government officials exploring education system support options, development partners scoping potential technical assistance, and NGO leaders wanting a quick diagnostic of their needs.

The tool is completely free, takes under 2 minutes to complete, and does not require registration. It can be accessed at /impact-matcher on the KuzaConnect website.`,
  },

  {
    id: 'tool-capacity-assessment',
    title: 'Capacity Assessment - AI Tool',
    source: '/capacity-assessment',
    content: `The Capacity Assessment is KuzaConnect's second AI tool. It is free and publicly available. The tool is a seven-question AI-guided diagnostic that scores an organisation's education capacity across six dimensions.

The six dimensions assessed are: strategic vision, technical expertise, data use, financial management, stakeholder engagement, and learning culture. The AI scores each dimension from 0 to 100, benchmarks scores against best practice, and identifies priority areas for capacity development.

How it works:
1. Answer 7 structured questions about your organisation
2. AI scores each of the 6 dimensions from 0 to 100
3. Benchmarks your scores against best practice
4. Identifies priority areas for capacity development

Output: A scored capacity profile across 6 dimensions, with specific findings and tailored recommendations for each gap identified.

The Capacity Assessment is most useful for: NGOs wanting to understand their organisational strengths and gaps, government departments seeking a structured self-assessment, development partners conducting due diligence on local partners, and organisations preparing a capacity development plan.

The tool is free, takes approximately 10-15 minutes to complete, and does not require registration. It can be accessed at /capacity-assessment on the KuzaConnect website.`,
  },

  {
    id: 'tool-mne-analyzer',
    title: 'M&E Report Analyzer - AI Tool',
    source: '/mne-analyzer',
    content: `The M&E Report Analyzer is KuzaConnect's third AI tool. It is free and publicly available. The tool extracts structured insights from any monitoring and evaluation document.

Users can upload any M&E document - a progress report, baseline study, endline evaluation, or programme review. The AI reads the full document and extracts key findings, achievements, risks, data gaps, and actionable recommendations.

Supported file formats include: PDF, DOCX, XLSX, PPTX, and more than 20 other formats.

How it works:
1. Upload your document (PDF, DOCX, XLSX, PPTX, and more)
2. Optionally add context about the programme
3. AI analyses the full document content
4. Results are structured into findings, risks, and recommendations

Output: A structured analysis with key findings, risk register, data gaps, prioritised recommendations, and suggested areas where KuzaConnect can add value to the programme.

The M&E Analyzer is most useful for: programme managers with large volumes of reports to review, M&E specialists wanting a second-read on a document, donors reviewing grantee reports, and organisations preparing for an evaluation.

The tool is free, supports 20+ file formats, and does not require registration. It can be accessed at /mne-analyzer on the KuzaConnect website.`,
  },

  // ── AI CONSULTING SERVICES ──────────────────────────────────────────────────
  {
    id: 'ai-consulting-services',
    title: 'AI Consulting Services',
    source: '/ai-solutions',
    content: `Beyond the three free public tools, KuzaConnect offers six paid AI consulting services, co-designed and delivered by their expert associates.

Data Strategy and Architecture: KuzaConnect helps governments and NGOs design data strategies that connect programme monitoring to national education management systems. This includes EMIS integration, real-time programme dashboards, and data governance frameworks.

AI-Assisted M&E Systems: KuzaConnect embeds AI into monitoring and evaluation workflows, enabling automated report synthesis, anomaly detection in learning outcomes, and AI-generated progress summaries at scale.

Evidence Synthesis and Literature Review: AI-assisted synthesis scanning hundreds of papers, evaluations, and grey literature to distil the most relevant findings for a specific context. Outputs include rapid evidence reviews, context-filtered literature mapping, and What Works summaries.

Theory of Change Development: AI-informed theories of change that connect activities to outcomes and map the assumptions underpinning programme logic. Outputs include logic models, assumption mapping, and indicator framework design.

Capacity Building in Data Use: Practical workshops building data literacy and AI tool competence for programme teams, government officials, and local organisations.

Custom AI Tool Development: Bespoke AI solutions tailored to specific programmes - from intake diagnostics to automated progress reporting. KuzaConnect scopes, builds, and deploys AI that fits the client's context.

Contact info@kuzaconnect.com to discuss AI consulting services.`,
  },

  // ── APPROACH & GEOGRAPHIC FOCUS ─────────────────────────────────────────────
  {
    id: 'approach-geographic-focus',
    title: 'KuzaConnect Approach and Geographic Focus',
    source: '/',
    content: `KuzaConnect operates across the Global South, with particular depth of experience in East Africa (Kenya, Uganda, Tanzania, Rwanda, Ethiopia), West Africa (Nigeria, Ghana, Senegal, Cote d'Ivoire), Southern Africa (Zambia, Zimbabwe, Malawi), and South Asia (Pakistan, Bangladesh, India).

The organisation's approach is built on two core principles: evidence drives impact, and context beats content. KuzaConnect combines local knowledge with internationally benchmarked evidence for every assignment. They are led by client needs, with a teaming approach that is flexible, connecting international and locally-based consultants to offer the right blended expertise.

Their capacity development model focuses on sustainable results - every engagement is designed to build internal capability so that the client can sustain and scale outcomes after KuzaConnect's involvement ends. Their quality assurance process is focused on impact, not just activity delivery.

KuzaConnect has worked with a wide range of partners including: USAID, UK FCDO (formerly DFID), the Global Partnership for Education, UNICEF, Save the Children, Aga Khan Foundation, World Bank, African Development Bank, and numerous national Ministries of Education.

KuzaConnect is not a large international firm. They deliberately stay agile and focused, using their associate network to scale expertise for any assignment without the overhead of a large bureaucracy.`,
  },

  // ── CONTACT ─────────────────────────────────────────────────────────────────
  {
    id: 'contact',
    title: 'Contact KuzaConnect',
    source: '/contact',
    content: `KuzaConnect can be contacted through the following channels:

Email: info@kuzaconnect.com
Phone: +254 729 980718
Location: Nairobi, Kenya
Office hours: Monday to Friday, 8am to 6pm East Africa Time (EAT)

The contact form on the website at /contact accepts enquiries about: partnership enquiries, service information, associate applications, media and press, and general questions.

For project discussions, it is best to email info@kuzaconnect.com directly with a brief description of your organisation, the challenge you are facing, and the country context. The team aims to respond within 2 business days.

For associate applications - professionals interested in joining KuzaConnect's network of expert associates - please use the contact form on the website and select "Associate application" as the subject. KuzaConnect is always looking for experienced education professionals based in the Global South.

KuzaConnect's website is kuzaconnect.com. The AI tools (Impact Matcher, Capacity Assessment, M&E Analyzer) are all free and accessible without registration.`,
  },

  // ── FAQS ────────────────────────────────────────────────────────────────────
  {
    id: 'faq-working-with-kuzaconnect',
    title: 'How to Work with KuzaConnect',
    source: '/contact',
    content: `Working with KuzaConnect typically begins in one of three ways: a direct enquiry via email or the contact form, a referral from an existing partner, or a competitive tender/proposal process.

For direct enquiries, the process is: contact KuzaConnect via info@kuzaconnect.com or the website contact form, describe your organisation and challenge, receive a response within 2 business days, and then schedule a call to discuss the assignment in more detail.

For competitive tenders, KuzaConnect responds to RFPs (Request for Proposals) from governments, donors, and international organisations. They can form consortia with other organisations if required.

KuzaConnect works on a range of contract types including: consultancy contracts (time-based or output-based), grant sub-awards, technical assistance contracts, and framework agreements. They work with both large international donors (USAID, FCDO, World Bank) and smaller foundations and NGOs.

Typical engagement sizes range from short-term technical assistance (a few weeks) to multi-year programme management contracts. KuzaConnect is flexible on scope and can mobilise quickly.

For organisations interested in KuzaConnect's AI tools as a starting point, the free Impact Matcher at /impact-matcher is a good first step to identify which service best fits your challenge.`,
  },

  {
    id: 'faq-ai-tools-pricing',
    title: 'Are KuzaConnect AI Tools Free?',
    source: '/ai-solutions',
    content: `Yes. All three of KuzaConnect's public AI tools are completely free to use and do not require registration or login.

The three free tools are:
- Impact Matcher (/impact-matcher): Free, no registration, takes under 2 minutes
- Capacity Assessment (/capacity-assessment): Free, no registration, takes 10-15 minutes
- M&E Report Analyzer (/mne-analyzer): Free, no registration, supports 20+ file formats

These tools are made freely available as part of KuzaConnect's mission to help organisations in the Global South access high-quality education support. The AI tools give organisations an immediate, structured starting point and surface insights that would otherwise require hours of consultant time.

For organisations that need deeper support beyond what the tools provide, KuzaConnect offers paid consulting services. The AI consulting services (Data Strategy, AI-Assisted M&E, Evidence Synthesis, Theory of Change, Capacity Building in Data Use, and Custom AI Tool Development) are paid engagements delivered by KuzaConnect's expert associates.

To enquire about paid AI consulting services, contact info@kuzaconnect.com.`,
  },
]
