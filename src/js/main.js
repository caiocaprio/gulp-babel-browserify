"use strict";
import { createClient } from 'contentful'
import * as config from './config'

require('babelify-es6-polyfill');

const client = createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: config.SPACE_ID,
    environment: config.ENVIRONMENT_ID,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: config.ACCESS_TOKEN_DELIVERY,
    // host: 'preview.contentful.com' 
})

client.getEntries({
        content_type: 'planos',
        select: 'sys.id,' +
            'fields.namePlan,' +
            'fields.descriptionPlan,' +
            'fields.franchisePlan,' +
            'fields.bonusPlan,' +
            'fields.priceOldPlan,' +
            'fields.photoPlan,' +
            'fields.BenefitsRelationship'
    })
    .then((response) => {
        console.log(response.items)
    })
    .catch((err) => console.log(err))