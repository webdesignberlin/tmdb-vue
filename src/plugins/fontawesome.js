import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faFilm,
  faClipboardList,
  faPopcorn,
  faSearch,
  faTimes,
  faHeart as faHeartLight,
  faBookmark as faBookmarkLight,
  faAngleRight,
  faAngleLeft,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from '@fortawesome/pro-light-svg-icons';
import { faEye } from '@fortawesome/pro-regular-svg-icons';
import { faHeart, faBookmark } from '@fortawesome/pro-solid-svg-icons';

library.add(
  faFilm,
  faHeart,
  faEye,
  faClipboardList,
  faPopcorn,
  faSearch,
  faTimes,
  faHeartLight,
  faBookmark,
  faBookmarkLight,
  faAngleRight,
  faAngleLeft,
  faAngleDoubleLeft,
  faAngleDoubleRight
);

Vue.component('fa-icon', FontAwesomeIcon);
