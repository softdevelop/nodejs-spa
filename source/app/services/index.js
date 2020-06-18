const userService = require("./users.service");
const spaIntroService = require("./spas_intros.service")
const spaServiceService = require("./spas_services.service")
const spaTeamService = require("./spas_teams.service")
const categoryService = require("./categories.service")
const projectService = require("./projects.service")
const reportService = require("./reports.service")
const requestService = require("./requests.service")
const serviceService = require("./services.service")

module.exports = {
  userService,
  spaIntroService,
  spaServiceService,
  spaTeamService,
  categoryService,
  projectService,
  reportService,
  requestService,
  serviceService
}
