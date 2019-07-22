import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faFilm, faClipboardList, faPopcorn, faSearch, faTimes } from '@fortawesome/pro-light-svg-icons';
import { faEye } from '@fortawesome/pro-regular-svg-icons';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';

library.add(faFilm, faHeart, faEye, faClipboardList, faPopcorn, faSearch, faTimes);

Vue.component('fa-icon', FontAwesomeIcon);
