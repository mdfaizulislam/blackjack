# blackjack

Blackjack

How to play locally?

Follow the below steps to run this game locally

1.  Goto project directory using terminal and execute the following command
    npm install
2.  now execute following command to compile source code
    npm run compile
3.  if you get 'tsc command not found' error while in compiling typescript, then install typescript globally using following command
    npm install -g typescript
4.  once compilation is done, execute the following command
    npm run start

        after executing above command, we will get logs like below

    <i> [webpack-dev-server] Project is running at:
    <i> [webpack-dev-server] Loopback: http://localhost:1234/
    <i> [webpack-dev-server] On Your Network (IPv4): http://192.168.31.225:1234/
    <i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:1234/

    open http://localhost:1234 link in the browser

To run test script, execute following command
npm run test
