#!/bin/sh

HTML_CONTENT='
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <style>
          td[coverage-level="high"]{
              background-color: green;
              color: #fff;
          }
          td[coverage-level="medium"]{
              background-color: #ffbf00;
              color: #fff;
          }
          td[coverage-level="low"]{
              background-color: red;
              color: #fff;
          }
        </style>
    </head>
    <body>
      <p>The following test coverage metrics were generated and extracted from the scheduled [<b>generate-coverage-metrics-mail</b>] custom pipeline build.</p>

      <table border="0" cellpadding="0" cellspacing="0" width="100%" id="bodyTable">
          <tr>
              <td align="left" valign="top">
                  <table border="1" cellpadding="10" cellspacing="0" width="600" id="emailContainer">
                      <tr>
                          <th align="center" valign="top">Module</th>
                          <th align="center" valign="top">Unit Test Coverage</th>
                          <th align="center" valign="top">Integration Test Coverage</th>
                      </tr>
                      <tr>
                          <td align="center" valign="top">Server</td>
                          <td align="center" valign="top" coverage-level="UNIT_COVERAGE_LEVEL">UNIT_TEST_METRIC%</td>
                          <td align="center" valign="top" coverage-level="INTEGRATION_COVERAGE_LEVEL">INTEGRATION_TEST_METRIC%</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>

    </body>
</html>
'

SERVER_PATH="$(cd "$(dirname "$0")"/..; pwd)"
COVERAGE_UNIT=${SERVER_PATH}/coverage/unit/index.html
COVERAGE_INTEGRATION=${SERVER_PATH}/coverage/integration/index.html

getCoverageLevel() {
  coverage="$1"
  if [ ${coverage%.*} -ge "80" ]; then
    echo "high"
  elif [ ${coverage%.*} -ge "50" ]; then
    echo "medium"
  else
    echo "low"
  fi
}

UNIT_TEST_METRIC=$(cat ${COVERAGE_UNIT} | grep strong | head -n 1 | grep -Eo '[+-]?[0-9]+([.][0-9]+)?')
INTEGRATION_TEST_METRIC=$(cat ${COVERAGE_INTEGRATION} | grep strong | head -n 1 | grep -Eo '[+-]?[0-9]+([.][0-9]+)?')

echo "Unit Test Coverage: ${UNIT_TEST_METRIC}"
echo "Integration Test Coverage: ${INTEGRATION_TEST_METRIC}"

UNIT_COVERAGE_LEVEL=$(getCoverageLevel $UNIT_TEST_METRIC)
INTEGRATION_COVERAGE_LEVEL=$(getCoverageLevel $INTEGRATION_TEST_METRIC)

echo $HTML_CONTENT | sed "s/UNIT_COVERAGE_LEVEL/${UNIT_COVERAGE_LEVEL}/g" | sed "s/UNIT_TEST_METRIC/${UNIT_TEST_METRIC}/g" | sed "s/INTEGRATION_COVERAGE_LEVEL/${INTEGRATION_COVERAGE_LEVEL}/g" | sed "s/INTEGRATION_TEST_METRIC/${INTEGRATION_TEST_METRIC}/g" > ${SERVER_PATH}/email_coverage_metrics.html
