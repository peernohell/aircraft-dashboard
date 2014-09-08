
Instruction
-----------

To use this application you need NodeJS. go to http://www.nodejs.org/
and install the latest stable version.

You may need some tool in global for this run the following command
```
npm install -g gulp karma wiredep
```

You may need root acces to execute this command. If you don't whant to execute this
script in root, you can define a prefix in your ~/.npmrc this will tell npm to install
all global dependancy in the ~/.node folder

```
echo "prefix = ~/.node" > ~/.npmrc"
```

To install dependancies
```
npm install
```

To run a local server
```
npm start
```

To execute test:
```
gulp test
```

To TDD and get karma continiously reload test when you are writing code
```
gulp tdd
```

