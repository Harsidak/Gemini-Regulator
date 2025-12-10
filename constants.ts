

export const GEMINI_MODEL = 'gemini-2.5-flash';

export const SYSTEM_INSTRUCTION = `
You are GEMINI-REGULATOR, an autonomous multimodal compliance & risk intelligence agent.
Your mission: ingest messy business evidence (PDFs, images, spreadsheets, text) and generate a full Regulatory & Risk Intelligence Report with high-precision reasoning.

CORE CAPABILITIES:
1. Multimodal Document Understanding: Read PDFs, invoices, receipts, tables, images. Extract entities, money flows, dates, obligations.
2. Compliance & Risk Intelligence Engine: Detect tax compliance risks, labour law conflicts, contract violations, privacy mishandling, accounting inconsistencies, fraud signals.
3. Contract Sentiment Analysis: Analyze key contract clauses to gauge tone (Positive, Neutral, Negative, High Risk) and potential liabilities.
4. Privacy & PII Detection: Automatically identify, classify, and extract Personally Identifiable Information (PII). 
   - Classify each finding into one of these types: "Name", "Address", "Email", "Phone Number", "SSN", "Credit Card".
   - Assess the RISK LEVEL (High, Medium, Low) based on sensitivity:
     - HIGH: SSNs, National IDs, Passport Numbers, Credit Card / Financial Account Numbers, Medical Records.
     - MEDIUM: Home Addresses, Personal Phone Numbers, Personal Emails.
     - LOW: Names in isolation, Business Emails, Business Addresses, Publicly available info.
5. Entity Knowledge Graph: Identify key entities (People, Organizations, Documents, Money) and the specific relationships between them (e.g., "Vendor X issued Invoice Y", "Person A signed Contract B").

OUTPUT REQUIREMENTS:
Produce a strictly structured JSON response.
- Risk scores must be 0-100 integers.
- Red flags must be categorized by severity.
- The C-Suite summary must be concise (max 120 words).
- Be decisive. Infer plausible scenarios if data is missing but mark as (inferred).

CITATION RULES (CRITICAL):
For every 'evidence_backed_explanation', you MUST provide the specific source location:
- PDF Documents: Cite the exact Page Number and Section (e.g., "Contract.pdf, Page 3, Section 4.1").
- CSV/Excel Files: Cite the exact Row Number (e.g., "Transactions.csv, Row 142").
- Images: Cite the visual location (e.g., "Invoice_Scan.jpg, Bottom Left Signature Block" or "Top Right Header").
`;

export const SAMPLE_FILE_CONTENT = `
CONFIDENTIAL: AUDIT DATASET
Zephyr Supply Chain Solutions Ltd.
Compliance & Risk Analysis Unit
October 2025
Contents
1 Company Profile 2
2 Contract Document 3
3 Invoice (OCR Scan Representation) 5
4 Payment Log (Financial Logs) 5
5 Privacy Policy 6
6 Leaked Database (PII Violation) 6
7 Operational Logs 6
8 Image Descriptions 6
1
1 Company Profile
Zephyr Supply Chain Solutions Ltd.
Summary
Zephyr Supply Chain Solutions is a mid-sized third-party logistics (3PL) provider specializing in
“last-mile” delivery technology and warehousing for e-commerce retailers. Established in 2012,
the company has recently expanded aggressively into the North American market.
• Industry: Logistics & Supply Chain Software
• Headquarters: London, UK (Global Operations)
• Regional Hubs: New York (USA), Berlin (Germany), Singapore
• Founded: 2012
• Employees: ∼450 Full-time, ∼200 Contractors
• Revenue: $85 Million (FY 2024 Est.)
• CEO: Marcus Thorne
Major Vendors
• Cloud Services: AWS
• Packaging Supplies: Northstar Packaging Corp (Primary Vendor)
• Consulting: Apex Strategic Partners
• Fleet Maintenance: QuickFix Mechanics
Risk Factors & Observable Patterns
• Rapid Expansion: Opened 3 new distribution centers in Q1 2025.
• Cash Flow: Glassdoor reviews mention delayed expense reimbursements for drivers.
• Customer Sentiment: 3.2/5 stars on TrustPilot. Recent spike in “lost package” complaints
(Aug 2025).
• Leadership Changes: CFO resigned unexpectedly in July 2025; position currently filled by
interim consultant.
2
2 Contract Document
SERVICE AND SUPPLY AGREEMENT
AGREEMENT DATE: January 15, 2025
CONTRACT ID: CTR-2025-88-B
Parties
1. BUYER: Zephyr Supply Chain Solutions Ltd., 120 Fenchurch St, London.
2. SUPPLIER: Northstar Packaging Corp, 4400 Industrial Blvd, Delaware, USA.
1. Scope of Services
Supplier agrees to provide corrugated cardboard boxes, packing tape, and biodegradable void
fill (packing peanuts) to Buyer’s New York and London distribution centers upon request.
2. Pricing and Payment
2.1 Rates are fixed per the attached Schedule A (Rate Card) for 12 months.
2.2 Payment Terms: Net 15. (Buyer must pay within 15 days of invoice receipt).
2.3 Currency: All payments shall be settled in USD.
3. Delivery Obligations
3.1 Supplier must fulfill Purchase Orders (POs) within 5 business days.
3.2 Rush orders must be fulfilled within 48 hours.
4. [SECTION INTENTIONALLY LEFT BLANK]
(Note: Standard template usually contains Late Delivery Penalty clauses here. Currently empty).
5. Confidentiality
Both parties agree to keep pricing information private. This obligation survives termination for
1 year.
6. Termination
Either party may terminate this agreement with 30 days written notice.
7. Governing Law
This agreement is governed by the laws of the State of Delaware.
IN WITNESS WHEREOF, the parties have executed this Agreement.
3
SIGNED by BUYER:
Marcus Thorne
CEO, Zephyr Supply Chain Solutions
Date: Jan 15, 2025
SIGNED by SUPPLIER:
J. Doe
Director, Northstar Packaging Corp
Date: Jan 20, 2025
4
3 Invoice (OCR Scan Representation)
INVOICE #: INV-2025-009
DATE: September 02, 2025
VENDOR: Northstar Packaging Corp, 4400 Industrial Blvd, Delaware, USA
BILL TO: Zephyr Supply Chain Solutions, NY Hub - Accounts Payable
Description Qty Unit Price Amount
Corrugated Box (Size L) 5,000 $1.20 $6,000.00
Biodegradable Fill (Bags) 200 $45.00 $9,000.00
Packing Tape (Industrial) 500 $3.50 $1,750.00
Rush Delivery Surcharge 1 $500.00 $500.00
Subtotal $17,250.00
Tax (8.875%) $1,530.94
TOTAL DUE $19,280.94
OCR Note: Mathematical Mismatch. Calculated sum ($17,250 + $1,530.94) is $18,780.94, but invoice
states $19,280.94.
PAYMENT INSTRUCTIONS:
Bank: Delaware City Bank
Acct: **** **** 8842
Routing: 021000021
Stamped: “URGENT PAYMENT REQUESTED - MANAGER APPROVED”
4 Payment Log (Financial Logs)
Pay ID Invoice ID Vendor Amount Date Notes
PAY-9901 INV-2025-008 Northstar Pack aging
12,500.00 2025-08-
28
Standard
PAY-9902 INV-2025-009 Northstar Pack aging
19,280.94 2025-09-
04
Batch Process
A
PAY-9903 INV-2025-009 Northstar Pack aging
19,280.94 2025-09-
05
Manual Over ride
PAY-9904 CONS-221 Apex Strategic
Partners
4,500.00 2025-09-
06
Retainer
PAY-9905 CONS-222 Apex Strategic
Partners
4,999.00 2025-09-
06
Review Pt 1
PAY-9906 CONS-223 Apex Strategic
Partners
4,999.00 2025-09-
07
Review Pt 2
Flag: Northstar Packaging and Apex Strategic Partners share the same bank account ending in
8842.
5
5 Privacy Policy
DATA PRIVACY & PROTECTION POLICY (v2.1)
Last Updated: January 2024
1. INTRODUCTION
Zephyr Supply Chain Solutions is committed to protecting the privacy of our employees, drivers,
and customers.
2. DATA WE COLLECT
We collect names, GPS location data (for drivers during active shifts), and banking details (for
payroll and billing).
3. DATA WE DO NOT COLLECT
3.1 We do not collect medical records.
3.2 CRITICAL: We do not store government-issued identification numbers (e.g., Social Security
Numbers, National Insurance Numbers) on local servers or unencrypted databases.
4. DATA SECURITY
All personal data is encrypted at rest using AES-256 standards.
5. DATA RETENTION
Customer and former employee personal data is strictly retained for 24 months (2 years) after
the cessation of business relations, after which it is permanently purged from our systems.
6 Leaked Database (PII Violation)
Name Role Join Date Status National ID Home Address
Sarah Connor Customer 2021-03-12 Inactive 123-45-6789 1291 Highland Ave, LA
James Smith Driver 2022-01-15 Active JW728192A 44 Baker St, London
Elena Roslin Driver 2025-02-01 Active 987-65-4321 880 8th Ave, NY
Mike Ross Customer 2020-11-05 Inactive AB123456C 10 Downing St, London
Note: Violation of Policy 3.2 (National IDs stored) and Policy 5 (Retention > 2 years).
7 Operational Logs
[2025-09-08 14:15:01] [INFO] Order #9921 received.
[2025-09-08 14:20:22] [WARN] Inventory mismatch: 'Corrugated Box L' low.
[2025-09-08 14:45:00] [INFO] Driver #8822 GPS Ping: 51.5074 N, 0.1278 W
(Central London).
[2025-09-08 14:46:12] [INFO] Driver #8822 Action: 'Package Delivered'.
Location: 52.001 N (Milton Keynes - 50 miles away).
**[FLAG: LOCATION MISMATCH]**
[2025-09-09 03:45:12] [ALERT] User 'm.clarke' initiated 'FULL_DB_EXPORT'
on table 'employee_customer_data'.
[2025-09-09 03:45:15] [WARN] Export size: 450MB. Authorized IP? NO (VPN).
8 Image Descriptions
1. The “Coffee Stain” Invoice
Visual: A wrinkled, white A4 paper invoice lying on a wooden desk. A circular brown coffee stain
6
covers the “Tax” amount. A handwritten note in blue ballpoint pen says “Double check amount??
- Sarah”.
2. The Loading Dock Tablet
Visual: Close-up of a ruggedized tablet. Screen shows the Zephyr Driver App with a pop-up:
“GPS ERROR: You are 50 miles from the delivery zone. Override?”
3. The Sticky Note Password
Visual: A monitor with a yellow sticky note stuck to the bezel reading: “Admin Login: m.clarke /
Password: Password123!”.
7
`;