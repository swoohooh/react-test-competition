import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  :focus {
    outline: none;
    border: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  html,
  body,
  div,
  span,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  abbr,
  address,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  samp,
  small,
  strong,
  sub,
  sup,
  var,
  b,
  i,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  summary,
  time,
  mark,
  audio,
  video,
  input,
  select,
  textarea,
  button,
  a,
  span {
    font-family: 'Roboto', 'NotoSansKR', sans-serif;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    word-wrap: break-word;
    word-break: unset;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    vertical-align: middle;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -moz-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
  }
  b,
  span,
  figure {
    vertical-align: top;
    font-size: inherit;
  }
  a {
    text-decoration: none;
    vertical-align: top;
    cursor: pointer;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font-size: inherit;
    font-weight: inherit;
  }
  a:hover,
  a:active,
  a:visited,
  a:link {
    text-decoration: none;
  }
  a:focus,
  button:focus {
    outline: 0;
    text-decoration: none;
  }
  ul,
  ol,
  li {
    list-style: none;
  }
  html {
    -webkit-text-size-adjust: 100%;
  }
  html,
  body {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
  ::-moz-selection {
    background: #b3d4fc;
    text-shadow: none;
  }
  ::selection {
    background: #b3d4fc;
    text-shadow: none;
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
  }
  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }
  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }
  textarea {
    resize: vertical;
  }
  table {
    width: 100%;
  }
  /*table{table-layout: fixed;width:100%;}*/
  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  input {
    -moz-appearance: none;
    -webkit-appearance: none;
    font-size: inherit;
    background: transparent;
  }
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :after,
  :before {
    box-sizing: border-box;
  }
  body.fix {
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: scroll;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #fff inset;
  }
  input {
    -webkit-tap-highlight-color: transparent;
  }
  html {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  html::-webkit-scrollbar {
    width: 0;
  }
`;
