// eslint-disable-next-line no-unused-vars
function getTestResults() {
  const version = document.getElementById('version').value;
  const testJobName = document.getElementById('testJobName').value;
  const buildNumber = document.getElementById('buildNumber').value;
  const platform = document.getElementById('platform').value;
  const arch = document.getElementById('arch').value;
  const type = document.getElementById('type').value;
  const securityEnabled = document.getElementById('security').checked;
  const testResultsUrl =
    'https://ci.opensearch.org/ci/dbc/' +
    `${testJobName}/` +
    `${version}/` +
    `${buildNumber}/` +
    `${platform}/` +
    `${arch}/` +
    `${type}/` +
    'test-results/1/integ-test/functionalTestDashboards/' +
    `${securityEnabled ? 'with-security' : 'without-security'}/` +
    'test-results/stdout.txt';

  document.getElementById('testResults').src =
    decodeURIComponent(testResultsUrl);
  // fetch(testResultsUrl, { mode: 'no-cors' }).then((response) => {
  //   response.text().then((data) => {
  //     document.getElementById('testResults').innerHTML = data;
  //   });
  // });
  // document.getElementById('absoluteUrl').innerHTML = testResultsUrl;
}

// https://ci.opensearch.org/ci/dbc/Playground/avillk-integ-test-opensearch-dashboards/2.0.0-rc1/322/linux/x64/tar/test-results/1/integ-test/functionalTestDashboards/with-security/test-results/stdout.txt
