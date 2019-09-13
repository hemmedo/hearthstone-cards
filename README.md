# heartstone-cards
Read card details and mechanics...do search for any card you want.

RN Version: 0.60.5
Redux
Redux-Saga
React-Navigation

You can see the algorithm which picks only the cards that contain "mechanics" property and all the unique mechanic names in App/Sagas/HearthstoneSagas.js file.

I used nativebase UI components since nothing was told to me about not using any third party libraries.

For card flip animation I used this package: https://www.npmjs.com/package/react-native-card-flip

Flatlist gets laggy after 100+ items. I'm gonna update this project and use this instead: https://github.com/lhandel/react-native-card-flip. It is much faster and smoother.

Many of the image url's that are fetched from the web api are dead. That is the reason of white spaces between card items.

This project functionally does everything which is described in the document that was provided to me.
