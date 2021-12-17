const { getParameters } = require("codesandbox/lib/api/define");

function renderPropsToString(props) {
    let str = '';
    Object.keys(props).forEach(key => {
        str += `${key}={${JSON.stringify(props[key])}} `;
        str += " ";
    });

    return str;
}

function renderComponentString(subModuleName, props) {
    return `'<${subModuleName ? subModuleName : "MyReactComponent"} ${renderPropsToString(props)}/>'`;
}

function generateLink({ packageName, subModuleName, props }) {

    const packageVersion = "latest";

    const parameters = getParameters({
        files: {
            "index.js": {
                content: `
import React from "react";
import ReactDOM from "react-dom";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";

import ${subModuleName ? "{ " + subModuleName + " } " : "MyReactComponent"} from "${packageName}";
const code = ${renderComponentString(subModuleName, props)};
const componentClassName = code.split(' ')[0].replace('<', '');
const scope = { [componentClassName]: ${subModuleName ? subModuleName : "MyReactComponent"} };
function App() {
  return (
    <LiveProvider scope={scope} code={code}>
      <LiveEditor /> <LivePreview /> <LiveError />
    </LiveProvider>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);`
            },
            "package.json": {
                content: {
                    name: "react-component-es6-lib-example",
                    version: "1.0.0",
                    description:
                        "About\nAn example to create a react component written in ES6 to be used as a npm library package.",
                    keywords: [],
                    main: "src/index.js",
                    dependencies: {
                        "@babel/core": "7.4.0",
                        "@babel/plugin-proposal-class-properties": "7.4.0",
                        "@babel/plugin-syntax-jsx": "7.2.0",
                        react: "16.8.3",
                        [packageName]: packageVersion,
                        "react-dom": "16.8.3",
                        "react-element-to-jsx-string": "14.3.4",
                        "react-live": "2.2.0",
                        "react-scripts": "2.1.8"
                    },
                    devDependencies: {
                        typescript: "3.3.3"
                    },
                    scripts: {
                        start: "react-scripts start",
                        build: "react-scripts build",
                        test: "react-scripts test --env=jsdom",
                        eject: "react-scripts eject"
                    },
                    browserslist: [">0.2%", "not dead", "not ie <= 11", "not op_mini all"]
                }
            }
        }
    });

    return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
}

exports.handler = (event, context, callback) => {

    let props = {};

    Object.keys(event.queryStringParameters).filter(key => key !== "packageName" && key !== "subModuleName").forEach(key => {
        props[key] = event.queryStringParameters[key];
    });

    let url = generateLink({
        packageName: event.queryStringParameters.packageName,
        subModuleName: event.queryStringParameters.subModuleName, props
    });

    const response = {
        statusCode: 301,
        headers: {
            Location: url,
        }
    };

    return callback(null, response);
}
