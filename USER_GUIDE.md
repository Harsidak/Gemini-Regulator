# Gemini Regulator User Guide

## Overview
Gemini Regulator is an autonomous multimodal compliance & risk intelligence agent. It ingests messy business evidence—PDFs, images, spreadsheets, and text—to generate a full Regulatory & Risk Intelligence Report with high-precision reasoning.

## 1. Supported File Types
You can upload one or more of the following to form a complete analysis context:

*   **PDF Documents**: Contracts, Privacy Policies, Legal Briefs, Employee Handbooks.
*   **Images (PNG/JPG)**: Scanned Invoices, Receipts, Screenshots of dashboards, Pictures of physical logs.
*   **CSV Files**: Bank Statements, Transaction Ledgers, Payroll Logs.
*   **Text Files**: Meeting notes, Email dumps, Unstructured observations.

## 2. Analysis Process
1.  **Upload**: Drag and drop your files into the main dashboard area.
2.  **Fusion**: The system uses Google Gemini 2.5 to read all files simultaneously. It connects entities (e.g., "Vendor A") across different documents (e.g., an Invoice from Vendor A vs. a Bank Statement payment to Vendor A).
3.  **Reasoning**: It applies forensic logic to detect:
    *   Mismatched totals.
    *   Missing contract clauses.
    *   GDPR/Compliance violations.
    *   Potential fraud indicators (backdating, strange accounts).
4.  **Reporting**: A structured report is generated in seconds.

## 3. Interpreting the Report

### Executive Summary
A concise, C-Suite level paragraph summarizing the overall health of the documentation provided.

### Risk Radar
A visual breakdown of risk across four key vectors (Scored 0-100):
*   **Financial Risk**: Money leaks, tax issues, unverified payments.
*   **Operational Risk**: Process failures, missing documentation, delays.
*   **Legal Risk**: Contract breaches, regulatory non-compliance.
*   **Fraud Probability**: Likelihood of malicious activity or fabrication.

### Red Flags
A prioritized list of specific issues found.
*   **CRITICAL**: Needs immediate attention (e.g., illegal clauses, evidence of theft).
*   **HIGH/MEDIUM/LOW**: Varying degrees of urgency.
*   *Note*: Every red flag includes a citation to the specific file and text where the evidence was found.

### Executive Fix Plan
A step-by-step remediation strategy.
*   **Immediate**: Do this today to stop bleeding/risk.
*   **High Priority**: Do this week.
*   **Medium**: Process improvements.

## Tips for Best Results
*   **Upload related documents together**. For example, uploading an Invoice *and* the Purchase Order *and* the Contract allows the AI to verify the entire chain of custody.
*   **Ensure legibility**. While Gemini has strong vision capabilities, very blurry images may yield lower confidence results.
