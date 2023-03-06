
NODE ?= node

README: README.md
	cat README.md

#   code newtest -> node mytest -> save it or clean it 

newtest: 
	cp test/puzzle.js test/myTest.js | code test/myTest.js

mytest: test/myTest.js
	${NODE} test/myTest.js

addtest: 
	mv test/myTest.js test/test14.js 

#   make clean the new test

clean: 
	rm -rf test/myTest.js coverage 

#   make jest (no display)

jest: 
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

#    Displayng tests

test1: test/test1.js 
	${NODE} test/test1.js 

test2: test/test2.js 
	${NODE} test/test2.js 

test3: test/test3.js 
	${NODE} test/test3.js 

test4: test/test4.js 
	${NODE} test/test4.js 

test5: test/test5.js 
	${NODE} test/test5.js 

test6: test/test6.js 
	${NODE} test/test6.js

test7: test/test7.js 
	${NODE} test/test7.js 

test8: test/test8.js 
	${NODE} test/test8.js 

test9: test/test9.js 
	${NODE} test/test9.js 

test10: test/test10.js 
	${NODE} test/test10.js 

test11: test/test11.js 
	${NODE} test/test11.js 

test12: test/test12.js 
	${NODE} test/test12.js 

test13: test/test13.js 
	${NODE} test/test13.js 

test14: test/test14.js 
	${NODE} test/test14.js 

