# TOXIN

![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Folga-smart.github.io%2FFSD_2%2F)
![GitHub top language](https://img.shields.io/github/languages/top/Olga-smart/FSD_2)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/Olga-smart/FSD_2)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Olga-smart/FSD_2)
![GitHub issues](https://img.shields.io/github/issues/Olga-smart/FSD_2)
![GitHub last commit](https://img.shields.io/github/last-commit/Olga-smart/FSD_2)

[Demo](https://olga-smart.github.io/FSD_2/)

[Layout](https://www.figma.com/file/spaWyhHczRFRMJQonqhjOE/FSD-frontend-education-program.-The-2nd-task-(Copy)) (there may be slight discrepancies with the current official version of the layout, because at least the fonts changed in it)

## Pixel perfect comments:
1. Rem has been used almost everywhere in the code, so there may be minor discrepancies with the layout.
1. The layout uses the Quicksand font for some elements. It only supports Cyrillic, so where it is Cyrillic, Figma will automatically replace it with OpenSans. I used everywhere OpenSans instead of Quicksand. Therefore, in some places the text may not perfectly match the layout.
1. **Colors & Type:** Text *"This is the body text which is used for most of the design, like paragraphs, lists, etc."* diverges from the layout by 3px. I didn't add a 3px padding to this element. Grid-row-gap is the same everywhere, font sizes and line-height may differ by fractions of px from the layout, because they are set in rem.
1. **Form Elements:** There are different spacing between columns in the layout. I made them the same for simplicity.
1. **Card-room:** On the card layout, the right padding is 4px smaller. I made it the same everywhere.
1. **Card-room:** On the layout, the "Отзывов" text is 3px to the left of the "в сутки" text.
1. **Card-room:** It turned out that the elements in the card are slightly shifted relative to the layout, especially the stars. I decided not to achieve an exact match artificially in accordance with the [clause 1.11 of best-practices (CSS)](https://github.com/fullstack-development/front-end-best-practices/blob/master/CSS/README.md#1.11).
1. **Landing Page:** It is designed so that the image along with the header occupies the entire height of the screen, so there may be discrepancies with the layout.
1. **Landing Page:** On the layout, the text "Лучшие номера для вашей работы, отдыха и просто вдохновения" is not correctly indented on the right. I laid it out so that the right edge of this block is on a par with the rest of the content.
1. **Search room:** On the layout, the pagination is not quite centered, the difference between the right and left margins is 14px.
1. **Room details:** For better adaptability, I decided to set the grid in percents, so the layout of the elements along the horizontal axis does not converge a little with the layout.
1. **Room details:** On the UI-kit Form Elements page, the title of the Bullet list component is aligned with the dots of the items, and on the layout of the Room details page, it is aligned with the text of the items. I decided to do it like in UI-kit.
1. **Registration:** The form on the layout is shifted to the right by 4px.
1. **Registration & Sign in:** Depending on the height of the screen, the vertical position of the form may not match the layout, because it is vertically centered, and the height of the container with the background image depends on the height of the screen.
 
## Dependencies:
* "air-datepicker": "^2.2.3"
* "cleave.js": "^1.6.0"
* "ion-rangeslider": "^2.3.1"
* "jquery": "^3.6.0"
* "paginationjs": "^2.1.5"
* "slick-carousel": "^1.8.1"

## Dev Dependencies:

* "clean-webpack-plugin": "^3.0.0"
* "copy-webpack-plugin": "^7.0.0"
* "cross-env": "^7.0.3"
* "css-loader": "^5.2.7"
* "eslint": "^7.32.0"
* "eslint-config-airbnb-base": "^15.0.0"
* "eslint-plugin-fsd": "^1.0.1"
* "eslint-plugin-import": "^2.25.4"
* "eslint-webpack-plugin": "^3.1.1"
* "favicons": "^6.2.2"
* "favicons-webpack-plugin": "^5.0.2"
* "html-webpack-plugin": "^5.0.0"
* "mini-css-extract-plugin": "^1.6.2"
* "pug": "^3.0.2"
* "pug-loader": "^2.4.0"
* "resolve-url-loader": "^3.1.4"
* "sass": "^1.49.9"
* "sass-loader": "^11.1.1"
* "style-loader": "^2.0.0"
* "webpack": "^5.70.0"
* "webpack-cli": "^4.9.2"
* "webpack-dev-server": "^4.7.4"

## Installing Dependencies

To install dependencies, run the command:
``` bash
npm i
```

## Starting the Development Server

To start the development server, run the command:
``` bash
npm start
```

## Making the Build

To run a production build, run the command:
``` bash
npm run build
```

## Deploy

To update the [demo](https://olga-smart.github.io/FSD_2/), run the command:
``` bash
npm run deploy
```

> 📌 You need to have build folder with generated files to run this command. So if you don't have build folder [make a build](#making-the-build) before. 

## AutoImportPlugin

The project uses a self-written webpack plugin to automatically import js and scss component files. Please read its [documentation](https://github.com/Olga-smart/FSD_2/blob/master/AutoImportPlugin/readme.md) if you plan to modify this project.