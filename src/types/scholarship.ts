export type VerificationStatus = 
  | 'Verified from official source'
  | 'Verification needed'
  | 'Sample demonstration data'
  | 'Expired or closed';

export type EducationLevel = 'High School' | 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Doctorate';

export type ScholarshipCategory = 'General' | 'Merit-Based' | 'Need-Based' | 'Minority / Community' | 'STEM' | 'Arts & Humanities';

export interface ScholarshipCriterion {
  id: string;
  description: string;
  requirementValue: string | number | boolean;
  operator: 'equals' | 'greater_than_or_equal' | 'less_than_or_equal' | 'includes' | 'one_of';
  sourceReference: string;
  isMandatory: boolean;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  description: string;
  educationLevels: EducationLevel[];
  applicableRegions: string[];
  category: ScholarshipCategory;
  awardAmountMin?: number;
  awardAmountMax?: number;
  awardCurrency: string;
  incomeLimit?: number;
  minimumAcademicScore?: number;
  criteria: ScholarshipCriterion[];
  requiredDocuments: string[];
  applicationStartDate?: string;
  applicationDeadline: string;
  officialInformationUrl: string;
  officialApplicationUrl: string;
  sourceName: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  dataOrigin: 'official' | 'demo';
  missingInformation: string[];
}

export type ApplicationStatus = 'Interested' | 'Preparing documents' | 'Ready to apply' | 'Applied' | 'Awaiting response' | 'Awarded' | 'Not selected';

export interface TrackerItem {
  scholarshipId: string;
  status: ApplicationStatus;
  notes: string;
  updatedAt: string;
}