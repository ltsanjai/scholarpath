import type { Scholarship } from '../types/scholarship';

export interface StudentProfile {
  educationLevel?: string;
  category?: string;
  stateRegion?: string;
  annualFamilyIncome?: number;
  academicScore?: number;
}

export type MatchCategory = 'Likely Match' | 'Known Criteria Conflict' | 'Needs Review';

export interface CriterionAssessment {
  criterionId: string;
  description: string;
  status: 'Match' | 'Conflict' | 'Unknown' | 'Not Applicable';
  explanation: string;
  sourceReference: string;
}

export interface AssessmentResult {
  scholarship: Scholarship;
  overallCategory: MatchCategory;
  criteriaAssessments: CriterionAssessment[];
  matchingCount: number;
  conflictCount: number;
  unknownCount: number;
  summaryExplanation: string;
}

export function evaluateEligibility(
  student: StudentProfile,
  scholarship: Scholarship
): AssessmentResult {
  const assessments: CriterionAssessment[] = [];
  let conflictCount = 0;
  let unknownCount = 0;
  let matchingCount = 0;

  // 1. Evaluate Education Level
  if (student.educationLevel) {
    const levelMatches = scholarship.educationLevels.includes(student.educationLevel as any);
    if (levelMatches) {
      matchingCount++;
      assessments.push({
        criterionId: 'edu-level',
        description: `Education Level: ${scholarship.educationLevels.join(', ')}`,
        status: 'Match',
        explanation: `Your current education level (${student.educationLevel}) matches the required levels.`,
        sourceReference: scholarship.sourceName,
      });
    } else {
      conflictCount++;
      assessments.push({
        criterionId: 'edu-level',
        description: `Education Level: ${scholarship.educationLevels.join(', ')}`,
        status: 'Conflict',
        explanation: `This scholarship requires ${scholarship.educationLevels.join(' or ')}, but you selected ${student.educationLevel}.`,
        sourceReference: scholarship.sourceName,
      });
    }
  } else {
    unknownCount++;
    assessments.push({
      criterionId: 'edu-level',
      description: 'Education Level',
      status: 'Unknown',
      explanation: 'Education level was not provided in your profile.',
      sourceReference: scholarship.sourceName,
    });
  }

  // 2. Evaluate Income Limit
  if (scholarship.incomeLimit !== undefined) {
    if (student.annualFamilyIncome !== undefined) {
      if (student.annualFamilyIncome <= scholarship.incomeLimit) {
        matchingCount++;
        assessments.push({
          criterionId: 'income-limit',
          description: `Annual Family Income ≤ ₹${scholarship.incomeLimit.toLocaleString()}`,
          status: 'Match',
          explanation: `Your reported income (₹${student.annualFamilyIncome.toLocaleString()}) is within the threshold of ₹${scholarship.incomeLimit.toLocaleString()}.`,
          sourceReference: scholarship.sourceName,
        });
      } else {
        conflictCount++;
        assessments.push({
          criterionId: 'income-limit',
          description: `Annual Family Income ≤ ₹${scholarship.incomeLimit.toLocaleString()}`,
          status: 'Conflict',
          explanation: `Your reported income (₹${student.annualFamilyIncome.toLocaleString()}) exceeds the limit of ₹${scholarship.incomeLimit.toLocaleString()}.`,
          sourceReference: scholarship.sourceName,
        });
      }
    } else {
      unknownCount++;
      assessments.push({
        criterionId: 'income-limit',
        description: `Annual Family Income Limit: ₹${scholarship.incomeLimit.toLocaleString()}`,
        status: 'Unknown',
        explanation: 'Income was not specified in your assessment profile.',
        sourceReference: scholarship.sourceName,
      });
    }
  }

  // 3. Evaluate Academic Score
  if (scholarship.minimumAcademicScore !== undefined) {
    if (student.academicScore !== undefined) {
      if (student.academicScore >= scholarship.minimumAcademicScore) {
        matchingCount++;
        assessments.push({
          criterionId: 'academic-score',
          description: `Minimum Academic Score: ${scholarship.minimumAcademicScore}%`,
          status: 'Match',
          explanation: `Your academic score (${student.academicScore}%) satisfies the minimum requirement of ${scholarship.minimumAcademicScore}%.`,
          sourceReference: scholarship.sourceName,
        });
      } else {
        conflictCount++;
        assessments.push({
          criterionId: 'academic-score',
          description: `Minimum Academic Score: ${scholarship.minimumAcademicScore}%`,
          status: 'Conflict',
          explanation: `Your score (${student.academicScore}%) is below the required ${scholarship.minimumAcademicScore}%.`,
          sourceReference: scholarship.sourceName,
        });
      }
    } else {
      unknownCount++;
      assessments.push({
        criterionId: 'academic-score',
        description: `Minimum Academic Score: ${scholarship.minimumAcademicScore}%`,
        status: 'Unknown',
        explanation: 'Academic percentage score was not provided.',
        sourceReference: scholarship.sourceName,
      });
    }
  }

  // 4. Custom Specific Criteria
  scholarship.criteria.forEach((crit) => {
    assessments.push({
      criterionId: crit.id,
      description: crit.description,
      status: 'Unknown',
      explanation: `Specific criterion requires manual verification: ${crit.description}`,
      sourceReference: crit.sourceReference,
    });
    unknownCount++;
  });

  // Determine Overall Outcome Category
  let overallCategory: MatchCategory;
  let summaryExplanation = '';

  if (conflictCount > 0) {
    overallCategory = 'Known Criteria Conflict';
    summaryExplanation = `At least ${conflictCount} mandatory eligibility criteria conflict with your supplied details.`;
  } else if (unknownCount > 0) {
    overallCategory = 'Needs Review';
    summaryExplanation = `Some criteria could not be automatically verified with certainty. Review the official provider guidelines.`;
  } else {
    overallCategory = 'Likely Match';
    summaryExplanation = `No known criteria conflicts detected based on your answers.`;
  }

  return {
    scholarship,
    overallCategory,
    criteriaAssessments: assessments,
    matchingCount,
    conflictCount,
    unknownCount,
    summaryExplanation,
  };
}