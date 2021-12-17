# generate-react-live-url
Generate a url by a react component's public npm package name to live preview a custom react component in codesandbox
<br/>
<br/>
Example: react-component-es6-lib-example
https://www.npmjs.com/package/react-component-es6-lib-example
<br/>
<br/>
Demo:
https://namb9xax8a.execute-api.us-east-1.amazonaws.com/default/generate-react-live-url?packageName=react-component-es6-lib-example

Features:
1. React component's props embedded in url
example:  https://namb9xax8a.execute-api.us-east-1.amazonaws.com/default/generate-react-live-url?packageName=react-component-es6-lib-example&title=Test

2. Support for submodules
example:  https://namb9xax8a.execute-api.us-east-1.amazonaws.com/default/generate-react-live-url?packageName=react-social-icons&subModuleName=SocialIcon&url=https://twitter.com/jaketrent

TODOs:
1. Add support for nested structure
2. Add support for embedding css/ scss
3. Add support for github public repository 
4. Add a user interface to generate such url
