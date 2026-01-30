#!/bin/sh

{{ scrutiny_spoke_project_src }}/bin/scrutiny-collector-metrics-freebsd-amd64 run --config {{ scrutiny_spoke_project_src }}/config/collector.yaml --api-endpoint {{ scrutiny_spoke_collector_api_endpoint }}

{{ scrutiny_spoke_project_src }}/bin/scrutiny-collector-zfs-freebsd-amd64 run --config {{ scrutiny_spoke_project_src }}/config/collector.yaml --api-endpoint {{ scrutiny_spoke_collector_api_endpoint }}
