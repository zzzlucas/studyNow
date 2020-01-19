import { listBuilding, listFloor, listProject } from '../api'

export default {
  data() {
    return {
      // Types
      types: {
        project: [],
        building: [],
        floor: [],
      },
    }
  },
  methods: {
    async getProjects(parkId) {
      try {
        const resp = await listProject({ parkId })
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.types.project = resp.result
      } catch (e) {
        this.$message.error('无法获取厂房')
      }
    },
    async getBuildings(projectId) {
      try {
        const resp = await listBuilding({ buildingProjectId: projectId })
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.types.building = resp.result
      } catch (e) {
        this.$message.error('无法获取楼宇')
      }
    },
    async getFloors(buildingId) {
      try {
        const resp = await listFloor({ buildingId })
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.types.floor = resp.result
      } catch (e) {
        this.$message.error('无法获取楼层')
      }
    },
  }
}