import followUpsData from "@/services/mockData/followUps.json";

class FollowUpService {
  constructor() {
    this.followUps = [...followUpsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...this.followUps];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const followUp = this.followUps.find(f => f.Id === parseInt(id));
    if (!followUp) {
      throw new Error("Follow-up not found");
    }
    return { ...followUp };
  }

  async create(followUpData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    const maxId = Math.max(...this.followUps.map(f => f.Id), 0);
    const newFollowUp = {
      Id: maxId + 1,
      ...followUpData,
      completed: false
    };
    
    this.followUps.push(newFollowUp);
    return { ...newFollowUp };
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.followUps.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Follow-up not found");
    }
    
    this.followUps[index] = {
      ...this.followUps[index],
      ...updates
    };
    
    return { ...this.followUps[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.followUps.findIndex(f => f.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Follow-up not found");
    }
    
    const deletedFollowUp = this.followUps.splice(index, 1)[0];
    return { ...deletedFollowUp };
  }

  async getByLeadId(leadId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.followUps
      .filter(f => f.leadId === parseInt(leadId))
      .map(f => ({ ...f }));
  }

  async getPending() {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.followUps
      .filter(f => !f.completed)
      .map(f => ({ ...f }));
  }
}

export const followUpService = new FollowUpService();