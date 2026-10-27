export type SubmissionCategory = 'ISA' | 'ESE' | 'Extras'

export type SubmissionAttachment = {
  label: string
  url: string
  fileType: string
  fileSize?: string
  external?: boolean
}

export type Submission = {
  id: string
  title: string
  category: SubmissionCategory
  description: string
  tags: string[]
  attachments: SubmissionAttachment[]
}

// Fourteen assignment entries, with files grouped by their actual activity.
// Fifteen uploaded files are included: the campaign poster and comic share one entry.
// The Karnataka tracker also links to the interactive dashboard supplied with the assignment.
export const submissions: Submission[] = [
  {
    id: 'ISA-01',
    title: 'Toxic Trail — In-Class E-Waste Write-up',
    category: 'ISA',
    description: 'Scanned class notes from the Toxic Trail by Human Simulation activity, covering heavy-metal contaminants and possible soil, river-sediment and health impacts.',
    tags: ['Toxic Trail', 'Class write-up', 'Heavy metals', 'In-class activity'],
    attachments: [
      { label: 'Open class write-up', url: '/submissions/isa-01-toxic-trail/class-writeup.pdf', fileType: 'PDF', fileSize: '1.6 MB' },
    ],
  },
  {
    id: 'ISA-02',
    title: 'Karnataka E-Waste Management State Tracker',
    category: 'ISA',
    description: 'A scorecard workbook covering generation, collection, recycling infrastructure, EPR compliance, informal-sector hotspots, environmental and health monitoring, and awareness. The workbook identifies several fields as illustrative pending verified KSPCB/CPCB records; treat the score as a demonstration rather than a definitive state assessment.',
    tags: ['State Tracker', 'Karnataka', 'Data analysis', 'Dashboard', 'EPR'],
    attachments: [
      { label: 'Open tracker workbook', url: '/submissions/isa-02-karnataka-state-tracker/tracker.xlsx', fileType: 'XLSX', fileSize: '61 KB' },
      { label: 'Open interactive dashboard', url: 'https://karnatakae-e-waste-dashboard.lovable.app/?classId=5e850cb6-c326-432c-9ad5-aea6420f4ec7&assignmentId=ad40ff9f-8530-4da8-848a-1430e74bd40d&submissionId=5b02f1de-c3f4-7f7d-aaa0-902d26e67dbd', fileType: 'LIVE DASHBOARD', external: true },
    ],
  },
  {
    id: 'ISA-03',
    title: 'India vs World — E-Waste Scenario Comparison',
    category: 'ISA',
    description: 'A handwritten comparison of e-waste generation figures across selected countries, followed by recommendations on formal collection, extended producer responsibility, public awareness, repair and reuse, and integration of informal workers.',
    tags: ['India vs World', 'Comparison', 'E-waste generation', 'Recommendations'],
    attachments: [
      { label: 'Open scenario comparison', url: '/submissions/isa-03-india-vs-world/scenario-comparison.pdf', fileType: 'PDF', fileSize: '1.2 MB' },
    ],
  },
  {
    id: 'ISA-04',
    title: 'E-Waste Rules Comparison — Five Asian Countries',
    category: 'ISA',
    description: 'A four-page comparison of e-waste governance in India, Japan, South Korea, China and Singapore, focusing on legislation, producer responsibility, collection, recycling obligations, compliance and major differences.',
    tags: ['Rules comparison', 'India', 'Japan', 'South Korea', 'China', 'Singapore', 'EPR'],
    attachments: [
      { label: 'Open rules comparison', url: '/submissions/isa-04-five-asian-countries-rules/comparison.pdf', fileType: 'PDF', fileSize: '84 KB' },
    ],
  },
  {
    id: 'ISA-05',
    title: 'EWEM Assignment 0 — Course Insights',
    category: 'ISA',
    description: 'Course-orientation write-up covering the curriculum bucket, credits, course outcomes, real-world applications, reference resources, evaluation structure and academic schedule.',
    tags: ['Course insights', 'Assignment 0', 'Course outcomes', 'EWEM'],
    attachments: [
      { label: 'Open course insights', url: '/submissions/isa-05-course-insights/assignment-0.docx', fileType: 'DOCX', fileSize: '76 KB' },
    ],
  },
  {
    id: 'ESE-01',
    title: 'Carbon Footprint Calculator — Results',
    category: 'ESE',
    description: 'A saved carbon-footprint calculator results page showing a reported total of 3.14 tonnes of CO₂e across the selected house, flights, car, motorbike, bus and rail, and secondary categories.',
    tags: ['Carbon footprint', 'CO₂e', 'Calculator', 'Sustainability'],
    attachments: [
      { label: 'View calculator results', url: '/submissions/ese-01-carbon-footprint/calculator-results.pdf', fileType: 'PDF', fileSize: '60 KB' },
    ],
  },
  {
    id: 'ESE-02',
    title: 'ReCircuit Campus — Circular Electronics Pitch Deck',
    category: 'ESE',
    description: 'A five-slide innovation pitch for a digital platform that connects students, colleges and recovery partners to collect, reward, trace, reuse and responsibly recycle campus e-waste. Includes the opportunity, solution, stakeholder model and proposed business model.',
    tags: ['Pitch deck', 'Circular economy', 'Campus e-waste', 'Innovation'],
    attachments: [
      { label: 'Open pitch deck', url: '/submissions/ese-02-re-circuit-campus/pitch-deck.pptx', fileType: 'PPTX', fileSize: '50 KB' },
    ],
  },
  {
    id: 'ESE-03',
    title: 'E-Waste Management Analysis of Five Electronics Manufacturers in India',
    category: 'ESE',
    description: 'A CPCB-FAQ-based review of Dixon Technologies, Kaynes Technology, Foxconn India, Syrma SGS Technology and Tata Electronics, summarizing general EPR and RoHS applicability. The report explicitly notes that it does not establish each company’s individual registration status or exact EEE categories.',
    tags: ['EPR compliance', 'CPCB', 'Manufacturer analysis', 'RoHS', 'Rules'],
    attachments: [
      { label: 'Open manufacturer analysis', url: '/submissions/ese-03-epr-compliance/manufacturer-analysis.pdf', fileType: 'PDF', fileSize: '32 KB' },
    ],
  },
  {
    id: 'ESE-04',
    title: 'Pyrometallurgy — Step-by-Step Process',
    category: 'ESE',
    description: 'A process infographic showing crushing and grinding, concentration, roasting, calcination, smelting, refining and extracted metal, with example reactions and an iron-extraction pathway.',
    tags: ['Recovery process', 'Pyrometallurgy', 'Metallurgy', 'Infographic'],
    attachments: [
      { label: 'View process infographic', url: '/submissions/ese-04-pyrometallurgy/process-infographic.png', fileType: 'PNG', fileSize: '2.5 MB' },
    ],
  },
  {
    id: 'ESE-05',
    title: 'LEED Buildings — Weightage and Scoring Workbook',
    category: 'ESE',
    description: 'A workbook containing LEED v4 BD+C category point weightages, a list of buildings and reported ratings, a building-score template, and methodology. Earned category points are not populated; the workbook warns against inferring scores from a rating label alone.',
    tags: ['LEED buildings', 'Weightage', 'Scoring', 'Green buildings', 'Workbook'],
    attachments: [
      { label: 'Open scoring workbook', url: '/submissions/ese-05-leed-buildings/weightage-and-scoring.xlsx', fileType: 'XLSX', fileSize: '18 KB' },
    ],
  },
  {
    id: 'ESE-06',
    title: 'Campus E-Waste Awareness Campaign — Poster & Comic',
    category: 'ESE',
    description: 'Two related campaign artefacts grouped as one activity: a “Small Devices. Big Impact.” awareness poster and a seven-panel comic/storyboard following students from discovering forgotten electronics to learning about e-waste and participating in a campus collection drive.',
    tags: ['Awareness campaign', 'Poster', 'Comic', 'Collection drive', 'Campus'],
    attachments: [
      { label: 'View awareness poster', url: '/submissions/ese-06-campus-awareness-campaign/poster.jpg', fileType: 'JPG', fileSize: '159 KB' },
      { label: 'View comic storyboard', url: '/submissions/ese-06-campus-awareness-campaign/comic-storyboard.jpg', fileType: 'JPG', fileSize: '714 KB' },
    ],
  },
  {
    id: 'ESE-07',
    title: 'Campus E-Waste Collection Awareness Video',
    category: 'ESE',
    description: 'A short 10-second campus video showing students near an e-waste collection box and bringing electronics to the collection point.',
    tags: ['Video task', 'Sustainability reel', 'Awareness', 'Collection box'],
    attachments: [
      { label: 'Play awareness video', url: '/submissions/ese-07-campus-collection-video/awareness-video.mp4', fileType: 'MP4', fileSize: '1.9 MB' },
    ],
  },
  {
    id: 'EXT-01',
    title: 'Waste Management, E-Waste and Circular Economy — 10 Case Studies',
    category: 'Extras',
    description: 'A case-study report comparing ten systems and industry examples, including Taiwan’s pay-as-you-throw approach, South Korea’s RFID food-waste system, Germany’s packaging EPR, circular procurement, modular electronics, repair and resale models.',
    tags: ['Case studies', 'Circular economy', 'International comparison', 'Waste management'],
    attachments: [
      { label: 'Open case-study report', url: '/submissions/extras-01-ten-case-studies/case-study-report.docx', fileType: 'DOCX', fileSize: '673 KB' },
    ],
  },
  {
    id: 'EXT-02',
    title: 'Beyond Encryption — Cryptographic Agility Research Paper',
    category: 'Extras',
    description: 'An additional research paper on authentication, protocol security, cryptographic agility, lightweight cryptography and post-quantum migration. It is a cross-disciplinary computer-security paper rather than an e-waste report, so it is kept under Extras.',
    tags: ['Research paper', 'Cryptography', 'Authentication', 'Post-quantum security'],
    attachments: [
      { label: 'Open research paper', url: '/submissions/extras-02-cryptography-research-paper/beyond-encryption.pdf', fileType: 'PDF', fileSize: '98 KB' },
    ],
  },
]
