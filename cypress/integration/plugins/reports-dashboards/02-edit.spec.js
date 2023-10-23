/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { BASE_PATH } from '../../../utils/constants';

describe('Cypress', () => {
    it('Visit edit page, update name and description', () => {
      cy.visit(`${BASE_PATH}/app/reports-dashboards#/`);
      cy.location('pathname', { timeout: 60000 }).should(
        'include',
        '/reports-dashboards'
      );
  
      cy.wait(12500);
  
      cy.get('#reportDefinitionDetailsLink').first().click();
  
      cy.get('#editReportDefinitionButton').should('exist');
  
      cy.get('#editReportDefinitionButton').click();
  
      cy.url().should('include', 'edit');
  
      cy.wait(1000);
  
      // update the report name
      cy.get('#reportSettingsName').type(' update name');
  
      // update report description
      cy.get('#reportSettingsDescription').type(' update description');
  
      cy.get('#editReportDefinitionButton').click({ force: true });
    });
  
    it('Visit edit page, change report source and trigger', () => {
      cy.visit(`${BASE_PATH}/app/reports-dashboards#/`);
      cy.location('pathname', { timeout: 60000 }).should(
        'include',
        '/reports-dashboards'
      );
  
      cy.wait(12500);
  
      cy.get('#reportDefinitionDetailsLink').first().click();
  
      cy.get('#editReportDefinitionButton').should('exist');
  
      cy.get('#editReportDefinitionButton').click();
  
      cy.url().should('include', 'edit');
  
      cy.wait(1000);
      cy.get('#visualizationReportSource').check({ force: true });
  
      cy.get('#Schedule').check({ force: true });
      cy.get('#editReportDefinitionButton').click({ force: true });
    });
  
    it('Visit edit page, change report source back', () => {
      cy.visit(`${BASE_PATH}/app/reports-dashboards#/`);
      cy.location('pathname', { timeout: 60000 }).should(
        'include',
        '/reports-dashboards'
      );
  
      cy.wait(12500);
  
      cy.get('#reportDefinitionDetailsLink').first().click();
  
      cy.get('#editReportDefinitionButton').should('exist');
  
      cy.get('#editReportDefinitionButton').click();
  
      cy.url().should('include', 'edit');
  
      cy.wait(1000);
  
      cy.get('#dashboardReportSource').check({ force: true });
  
      cy.get('#editReportDefinitionButton').click({ force: true });
    });
  });