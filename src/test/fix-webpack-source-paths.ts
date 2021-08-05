(function fixWebpackSourcePaths() {

  type IResult = {
    log: string[];
  };
  type IKarma = {
    result: (result: IResult) => void;
  };

  const originalResult = (window as Window &
    typeof globalThis & { __karma__: IKarma }).__karma__.result;

  const _window = (window as Window &
    typeof globalThis & { __karma__: IKarma });
  _window.__karma__.result = (result) => {
    result.log = result.log.map((log) =>
      log.replace(
        /http:\/\/localhost:*\d+\/_karma_webpack_\/webpack:/g,
        'webpack:///.'
      )
    );

    originalResult(result);
  };

})()
