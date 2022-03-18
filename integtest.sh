#!/bin/bash

set -e

CORE_COMPONENT="opensearch-dashboards"
COMPONENTS=(
   # "alerting-dashboards-plugin"
    # "anomaly-detection-dashboards-plugin"
    "gantt-chart-dashboards"
    # "index-management-dashboards-plugin"
    # "observability-dashboards"
    # "query-workbench-dashboards"
    # "reports-dashboards"
    # "security"
)

function usage() {
    echo ""
    echo "This script is used to run integration tests for plugin installed on a remote OpenSearch/Dashboards cluster."
    echo "--------------------------------------------------------------------------"
    echo "Usage: $0 [args]"
    echo ""
    echo "Required arguments:"
    echo "None"
    echo ""
    echo "Optional arguments:"
    echo -e "-b BIND_ADDRESS\t, defaults to localhost | 127.0.0.1, can be changed to any IP or domain name for the cluster location."
    echo -e "-p BIND_PORT\t, defaults to 9200 or 5601 depends on OpenSearch or Dashboards, can be changed to any port for the cluster location."
    echo -e "-s SECURITY_ENABLED\t(true | false), defaults to true. Specify the OpenSearch/Dashboards have security enabled or not."
    echo -e "-c CREDENTIAL\t(usename:password), no defaults, effective when SECURITY_ENABLED=true."
    echo -e "-v VERSION\t, no defaults, indicates the OpenSearch version to test."
    echo -e "-h\tPrint this message."
    echo "--------------------------------------------------------------------------"
}

while getopts ":h:b:p:s:c:v:" arg; do
    case $arg in
        h)
            usage
            exit 1
            ;;
        b)
            BIND_ADDRESS=$OPTARG
            ;;
        p)
            BIND_PORT=$OPTARG
            ;;
        s)
            SECURITY_ENABLED=$OPTARG
            ;;
        c)
            CREDENTIAL=$OPTARG
            ;;
        v)
            VERSION=$OPTARG
            ;;
        :)
            echo "-${OPTARG} requires an argument"
            usage
            exit 1
            ;;
        ?)
            echo "Invalid option: -${OPTARG}"
            exit 1
            ;;
    esac
done


if [ -z "$BIND_ADDRESS" ]
then
  BIND_ADDRESS="localhost"
fi

if [ -z "$BIND_PORT" ]
then
  BIND_PORT="5601"
fi

if [ -z "$SECURITY_ENABLED" ]
then
  SECURITY_ENABLED="true"
fi

if [ -z "$CREDENTIAL" ]
then
  CREDENTIAL="admin:admin"
  USERNAME=`echo $CREDENTIAL | awk -F ':' '{print $1}'`
  PASSWORD=`echo $CREDENTIAL | awk -F ':' '{print $2}'`
fi

for component in "${COMPONENTS[@]}"
do
    SPECS+="cypress/integration/plugins/${component}/*,"
done
SPECS+="cypress/integration/core-opensearch-dashboards/${CORE_COMPONENT}/*.js"

npm install

if [ $SECURITY_ENABLED = "true" ]
then
   echo "run security enabled tests"
   yarn cypress:run-with-security --spec "$SPECS"
else
   echo "run security disabled tests"
   yarn cypress:run-without-security --spec "$SPECS"

fi