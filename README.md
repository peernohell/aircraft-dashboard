
# Instruction

## Dependency

You have to install [nodejs](http://www.nodejs.org/) and install the latest stable version.

Then you will be able to install some tools 
```
npm install -g gulp karma wiredep
```

You may need root acces to execute this command. If you donnot whant to execute this
script in root, you can define a prefix in your ~/.npmrc this will tell npm to install
all global dependancy in the ~/.node folder

```
echo "prefix = ~/.node" > ~/.npmrc
```

## Project

Clone the project
```
git clone git@github.com:peernohell/aircraft-dashboard.git
```

Then install sub packages
```
npm install
```

## Usage

To run a local nodejs server just type
```
gulp
```

To execute test:
```
gulp test
```

To TDD and get karma continiously reload test when you are writing code
```
gulp tdd
```

