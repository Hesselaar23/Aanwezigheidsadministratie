'use strict';

/**
 * bezoeker service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bezoeker.bezoeker');
