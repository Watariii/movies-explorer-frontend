const REGEX_EMAIL_PATTERN = "[\\dA-Za-z_.\\-]{3,}@[a-z]+[.]{1}[a-z]{2,4}";

const MAX_DURATION_SHORT_FILM = 40;

const SHOW_MOVIES_PC = 12;
const SHOW_MOVIES_TABLET = 8;
const SHOW_MOVIES_MOBILE = 5;

const ADD_SHOW_MOVIES_TABLET = 2;
const ADD_SHOW_MOVIES_MOBILE = 2;
const ADD_SHOW_MOVIES_PC = 3;

const SCREENWIDTH_FROM_830 = 830;
const SCREENWIDTH_FROM_530 = 530;

const SEARCH_MESSAGE_NOT_FOUND = "Ничего не найдено.";
const SEARCH_MESSAGE_EMPTY_INPUT =
  "Поисковой запрос пустой. Введите название фильма на русском или английском.";
const SEARCH_MESSAGE_ERROR_REQUEST =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.";
const POPUP_MESSAGE_ERROR = "Произошла ошибка";

export {
  REGEX_EMAIL_PATTERN,
  MAX_DURATION_SHORT_FILM,
  SHOW_MOVIES_PC,
  SHOW_MOVIES_TABLET,
  SHOW_MOVIES_MOBILE,
  ADD_SHOW_MOVIES_TABLET,
  ADD_SHOW_MOVIES_MOBILE,
  ADD_SHOW_MOVIES_PC,
  SCREENWIDTH_FROM_830,
  SCREENWIDTH_FROM_530,
  SEARCH_MESSAGE_NOT_FOUND,
  SEARCH_MESSAGE_EMPTY_INPUT,
  SEARCH_MESSAGE_ERROR_REQUEST,
  POPUP_MESSAGE_ERROR,
};
