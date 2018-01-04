#!/usr/bin/env bash


if hash testrpc 2>/dev/null; then
    testrpc -m "one two three four five" & truffle deploy --network local
else
    echo "error, no testrpc"
    exit 1
fi
