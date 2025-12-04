import { create } from 'zustand';
import { mockJobs, initialMPRs } from '../data/mockData';

export const useStore = create((set, get) => ({
  jobs: mockJobs,
  mprs: initialMPRs,

  createMPR: (jobId, requestedBy) => {
    const { jobs, mprs } = get();
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return null;

    const newMPR = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      dateOfRequest: new Date().toISOString().split('T')[0],
      requestedBy: requestedBy || 'Current User',
      candidates: [],
    };

    set({ mprs: [...mprs, newMPR] });
    return newMPR;
  },

  addCandidate: (mprId, candidateData) => {
    const { mprs } = get();
    const newCandidate = {
      id: Date.now(),
      ...candidateData,
    };

    set({
      mprs: mprs.map((mpr) =>
        mpr.id === mprId
          ? { ...mpr, candidates: [...mpr.candidates, newCandidate] }
          : mpr
      ),
    });
  },

  updateCandidate: (mprId, candidateId, candidateData) => {
    const { mprs } = get();
    set({
      mprs: mprs.map((mpr) =>
        mpr.id === mprId
          ? {
              ...mpr,
              candidates: mpr.candidates.map((candidate) =>
                candidate.id === candidateId
                  ? { ...candidate, ...candidateData }
                  : candidate
              ),
            }
          : mpr
      ),
    });
  },

  getMPRByJobId: (jobId) => {
    const { mprs } = get();
    return mprs.find((mpr) => mpr.jobId === jobId);
  },
}));
