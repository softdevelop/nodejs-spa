const sinon = require('sinon');
const chai = require('chai')
const expect = chai.expect
const analytics = require('../../../../app/controllers/admin/analytics')

const assert = chai.assert

describe("analytics admin controller", () => {
  describe("Testing viewAnalytics", () => {
    it('should call res.render once with viewAnalytics ejs template', function() {
      const req = {};
      const res = {
        render: sinon.spy()
      };
      analytics.viewAnalytics(req,res)
      expect(res.render.calledOnce).to.be.true
      expect(res.render.firstCall.args[0]).to.equal("admin/analytics/viewAnalytics")
      expect(res.render.firstCall.args[1]).to.be.empty
    });
  })
})