
export enum RiskSeverity {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export interface RedFlag {
  severity: RiskSeverity;
  issue: string;
  description: string;
  source_document?: string;
}

export interface RiskScores {
  financial_risk: number;
  operational_risk: number;
  legal_risk: number;
  fraud_probability: number;
}

export interface FixPlanStep {
  step: string;
  rationale: string;
  priority: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
  source: string;
}

export interface Entity {
  name: string;
  type: 'Person' | 'Organization' | 'Money' | 'Location';
  details: string;
}

export interface ComplianceCheck {
  regulation: string;
  status: 'Pass' | 'Fail' | 'Warning';
  notes: string;
}

export interface RegulatorReport {
  extracted_evidence: string[];
  red_flags: RedFlag[];
  risk_scores: RiskScores;
  evidence_backed_explanations: { explanation: string; source: string }[];
  executive_fix_plan: FixPlanStep[];
  c_suite_summary: string;
  timeline: TimelineEvent[];
  entities: Entity[];
  compliance_matrix: ComplianceCheck[];
}

export interface ProcessedFile {
  name: string;
  type: string;
  data: string; // Base64 encoded content
  mimeType: string;
}

export enum AppStatus {
  LANDING = 'LANDING',
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

// News & Search Types
export interface NewsSource {
  title: string;
  uri: string;
}

export interface RegulatoryNewsData {
  summary: string;
  sources: NewsSource[];
}
