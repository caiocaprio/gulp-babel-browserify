// import {Modal} from './component/modal.js';

// class Main {
//     constructor(){
//         console.log('Hello Main.')
//         this.modal = new Modal();
//         this.metodo();
//     }
//     metodo(){        
//         this.modal.metodo();
//     }
// }

// var main = new Main();

"use strict";
// import {createClient} from '../../node_modules/contentful/dist/es-modules/contentful'
import {createClient} from 'contentful'

const SPACE_ID = '';
const ACCESS_TOKEN = '';
const ACCESS_TOKEN_PREVIEW = '';
const ENVIRONMENT_ID = 'master';


const client = createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: SPACE_ID,
    environment:ENVIRONMENT_ID,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: ACCESS_TOKEN,
    // host: 'preview.contentful.com'
  })
  
  client.getEntries({
    content_type: 'course',
    select: 'sys.id,'+ 
            'fields.title,'
  })
.then((response) => console.log(response.items))
.catch((err) => console.log(err))