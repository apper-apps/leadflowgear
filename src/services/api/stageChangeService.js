import stageChangesData from "@/services/mockData/stageChanges.json";

class StageChangeService {
  constructor() {
    this.stageChanges = [...stageChangesData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.stageChanges];
  }

  async create(stageChangeData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newStageChange = {
      ...stageChangeData,
      timestamp: Date.now()
    };
    
    this.stageChanges.push(newStageChange);
    return { ...newStageChange };
  }

  async getByLeadId(leadId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.stageChanges
      .filter(change => change.leadId === parseInt(leadId))
      .map(change => ({ ...change }));
  }
}

export const stageChangeService = new StageChangeService();