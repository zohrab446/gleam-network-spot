import { describe, expect, it } from 'vitest';
import { canAccessCompany, requirementCoverage, shareableFields } from './career';
describe('career evidence and permissions', () => {
  it('does not grant company access to student or unknown roles', () => {
    expect(canAccessCompany(['ogrenci'])).toBe(false);
    expect(canAccessCompany([])).toBe(false);
    expect(canAccessCompany(['sirket'])).toBe(true);
    expect(canAccessCompany(['admin'])).toBe(true);
  });
  it('distinguishes missing evidence and never invents a score for no requirements', () => {
    expect(requirementCoverage([])).toBe(null);
    expect(requirementCoverage([{technology: 'React', required: 3, proven: null, confidence: 'Düşük', source: 'Yok'}])).toBe(0);
  });
  it('counts requirement coverage only, capping excess skill evidence', () => {
    expect(requirementCoverage([{technology: 'React', required: 2, proven: 5, confidence: 'Yüksek', source: 'Sınav'}, {technology: 'SQL', required: 2, proven: null, confidence: 'Düşük', source: 'Yok'}])).toBe(50);
  });
  it('shares only explicitly permitted fields', () => {
    expect(shareableFields({name:true, exam:false}, {name:'Ada', exam:'82', email:'private'})).toEqual({name:'Ada'});
  });
});
