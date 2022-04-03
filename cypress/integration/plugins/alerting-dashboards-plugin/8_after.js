/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ALERTING_INDEX } from '../../../utils/plugins/alerting-dashboards-plugin/constants';

describe('Tearing down test environment', () => {
    before(() => {
        // Delete sample data
        cy.deleteIndexByName(`${ALERTING_INDEX.SAMPLE_DATA_ECOMMERCE}`);
        cy.deleteAllMonitors();
        cy.deleteAllDestinations();
    });

    it('teardown complete', () => {});
});